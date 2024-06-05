package com.accolite.service;

import java.io.IOException;
import java.util.List;

import com.accolite.helper.Helper;
import com.accolite.repository.CandidateSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.accolite.entities.Candidate;
import com.accolite.repository.CandidateRepository;
import com.accolite.repository.ClientRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CandidateService {
	
	@Autowired
	private CandidateRepository candidateRepository;

	@Autowired
	private CandidateSkillRepository candidateSkillRepository;

	
	 public Candidate createCandidate(Candidate candidate) {
	        return candidateRepository.save(candidate);
	 }

	 //excel file upload
	public void save(MultipartFile file){
		try {
			List<Candidate> products= Helper.convertExcelToListOfProduct(file.getInputStream(),candidateSkillRepository);
			this.candidateRepository.saveAll(products);
		}
		catch (IOException e){
			e.printStackTrace();
		}

	}

	 public List<Candidate> getAllCandidates() {
	        return (List<Candidate>) candidateRepository.findAll();
	 }
	 
	 public Candidate getCandidateById(Integer candidateId) {
	        return candidateRepository.findById(candidateId).orElse(null);
	 }
	 
	 public Candidate updateCandidate(Integer candidateId, Candidate updatedCandidate) {
	        Candidate existingCandidate = candidateRepository.findById(candidateId).orElse(null);
	        if (existingCandidate != null) {
	            existingCandidate.setCandidateName(updatedCandidate.getCandidateName());
	            existingCandidate.setCandidateEmail(updatedCandidate.getCandidateEmail());
	            existingCandidate.setIsAccoliteEmployee(updatedCandidate.getIsAccoliteEmployee());
	            existingCandidate.setCandidateStatus(updatedCandidate.getCandidateStatus());
	            existingCandidate.setLast_working_day(updatedCandidate.getLast_working_day());
	            existingCandidate.setExperience(updatedCandidate.getExperience());
				existingCandidate.setIsDeleted(updatedCandidate.getIsDeleted());
	            return candidateRepository.save(existingCandidate);
	        }
	        return null;
	    }
	 
	 public void deleteCandidate(Integer candidateId)
	 {
		 candidateRepository.deleteById(candidateId);
	 }



}
