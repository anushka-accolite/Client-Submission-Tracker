package com.accolite.service;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accolite.entities.SubmissionToClient;
import com.accolite.repository.SubmissionRepository;

@Service
public class SubmissionService {

	@Autowired
	private SubmissionRepository submissionRepository;

	public List<SubmissionToClient> getAllSubmissions(){
		return (List<SubmissionToClient>) submissionRepository.findAll();
	}

	public SubmissionToClient submitCandidateToClient(SubmissionToClient submission) {
		return submissionRepository.save(submission);
	}

	public SubmissionToClient getSubmissionById(Integer submissionId) {
		return submissionRepository.findById(submissionId).orElse(null);
	}

	public SubmissionToClient updateSubmissionStatus(Integer submissionId, SubmissionToClient submission) {
		submission.setSubmissionId(submissionId);
		return submissionRepository.save(submission);
	}

	public void deleteSubmission(Integer submissionId)
	{
		submissionRepository.deleteById(submissionId);
	}

	public List<SubmissionToClient> getSubmissionsByUser(Integer userId)
	{
		return submissionRepository.findByUsers_UserId(userId);
	}
	public List<Object[]> getSubmissionAuditHistory(int submissionId) {
		SessionFactory sessionFactory;
		try {
			// Load Hibernate configuration from hibernate.cfg.xml
			sessionFactory = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
		} catch (Throwable ex) {
			// Handle exception
			throw new ExceptionInInitializerError("Failed to create sessionFactory." + ex);
		}
		Session session = sessionFactory.openSession(); // Create a new session
		try {
			// Retrieve the SubmissionToClient entity by its ID
			Transaction transaction=session.beginTransaction();
			SubmissionToClient submission = session.get(SubmissionToClient.class, submissionId);
			String sqlQuery = "SELECT al.*, ri.revtstmp, c.* " +
					"FROM audit_log al " +
					"INNER JOIN revinfo ri ON al.rev = ri.rev " +
					"INNER JOIN submission_to_client s ON al.submission_id = s.submission_id " +
					"LEFT JOIN candidate c ON s.candidate_id = c.candidate_id " +
					"WHERE al.submission_id = :submissionId";
			// Create a Hibernate native query
			NativeQuery<Object[]> query = session.createNativeQuery(sqlQuery);
			query.setParameter("submissionId", submissionId);
			// Execute the query and return the result list
			return query.getResultList();
		} finally {
			session.close();
		}
	}


	public List<Integer> isCandidateAssociatedWithSubmission(Integer candidateId) {
		//return submissionRepository.existsByCandidate_CandidateId(candidateId);
		return submissionRepository.findSubmissionIdsByCandidateId(candidateId);
	}

	public List<Integer> getSubmissionIdsByCandidateId(int candidateId) {
		return submissionRepository.findSubmissionIdsByCandidateId(candidateId);
	}
}