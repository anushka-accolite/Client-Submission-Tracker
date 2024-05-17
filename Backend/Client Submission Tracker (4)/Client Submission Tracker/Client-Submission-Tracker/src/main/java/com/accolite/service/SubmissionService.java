package com.accolite.service;

import java.util.List;

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
	 


}
