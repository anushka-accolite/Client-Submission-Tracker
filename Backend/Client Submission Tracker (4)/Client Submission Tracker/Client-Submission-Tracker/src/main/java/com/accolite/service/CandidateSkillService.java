package com.accolite.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accolite.entities.Candidate;
import com.accolite.entities.CandidateSkill;
import com.accolite.repository.CandidateRepository;
import com.accolite.repository.CandidateSkillRepository;

@Service
public class CandidateSkillService {
	
	@Autowired
	private CandidateSkillRepository candidateSkillRepository;
	
	@Autowired
	private CandidateRepository candidateRepository;
	
	public CandidateSkill addSkillToCandidate(Integer candidateId, String skillName) {
		Candidate candidate = candidateRepository.findById(candidateId).orElse(null);
	    if (candidate != null) {
	        CandidateSkill skill = candidateSkillRepository.findBySkill(skillName);
	        if (skill == null) {
	            skill = new CandidateSkill();
	            skill.setSkill(skillName);
				skill.setIsDeleted(false);
	            skill = candidateSkillRepository.save(skill);
	        }
	        if (!candidate.getSkills().contains(skill)) {
	            candidate.getSkills().add(skill);
	            candidateRepository.save(candidate);
	        }
	        return skill;
	    }
	    return null;
    }
	
	public List<String> getAllSkillsForCandidate(Integer candidateId) {
		Candidate optionalCandidate = candidateRepository.findById(candidateId).orElse(null);
	        return optionalCandidate.getSkills().stream()
	                .map(CandidateSkill::getSkill)
	                .collect(Collectors.toList());
    }
	
	public void removeSkillFromCandidate(Integer candidateId, String skillName) {
		Candidate candidate = candidateRepository.findById(candidateId).orElse(null);
	    if (candidate != null) {
	        candidate.getSkills().removeIf(skill -> skill.getSkill().equals(skillName));
	        candidateRepository.save(candidate);
	    }
    }
	


	

}
