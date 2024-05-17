package com.accolite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accolite.entities.CandidateSkill;
import com.accolite.service.CandidateSkillService;

@RestController
@RequestMapping("/api/candidates/{candidateId}/skills")
public class CandidateSkillController {
	
	@Autowired
	private CandidateSkillService candidateSkillService;
	
	 @PostMapping
	    public ResponseEntity<CandidateSkill> addSkillToCandidate(@PathVariable Integer candidateId, @RequestBody String candidateSkill) {
	        CandidateSkill addedSkill = candidateSkillService.addSkillToCandidate(candidateId, candidateSkill);
	        return new ResponseEntity<>(addedSkill, HttpStatus.CREATED);
	    }
	 
	 @GetMapping
	    public ResponseEntity<List<String>> getAllSkillsForCandidate(@PathVariable Integer candidateId) {
	        List<String> skills = candidateSkillService.getAllSkillsForCandidate(candidateId);
	        return new ResponseEntity<>(skills, HttpStatus.OK);
	    }
	 @DeleteMapping("/{skill}")
	    public ResponseEntity<Void> removeSkillFromCandidate(@PathVariable Integer candidateId, @PathVariable String skill) {
	        candidateSkillService.removeSkillFromCandidate(candidateId, skill);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
	 

}
