package com.accolite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accolite.entities.Candidate;
import com.accolite.service.CandidateService;

@RestController
@RequestMapping("/api/candidates")
public class CandidateManagementController {

	@Autowired
	private CandidateService candidateService;

	@PostMapping
	public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate) {
		Candidate createdCandidate = candidateService.createCandidate(candidate);
		return new ResponseEntity<>(createdCandidate, HttpStatus.CREATED);
	}


	@GetMapping("/getAll")
	public ResponseEntity<List<Candidate>> getAllCandidates() {
		List<Candidate> candidates = candidateService.getAllCandidates();
		return new ResponseEntity<>(candidates, HttpStatus.OK);
	}

	@GetMapping("/{candidateId}")
	public ResponseEntity<Candidate> getCandidateById(@PathVariable Integer candidateId) {
		Candidate candidate = candidateService.getCandidateById(candidateId);
		if (candidate != null) {
			return new ResponseEntity<>(candidate, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/{candidateId}")
	public ResponseEntity<Candidate> updateCandidate(@PathVariable Integer candidateId, @RequestBody Candidate updatedCandidate) {
		Candidate candidate = candidateService.updateCandidate(candidateId, updatedCandidate);
		if (candidate != null) {
			return new ResponseEntity<>(candidate, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{candidateId}")
	public void deleteCandidate(@PathVariable Integer  candidateId)
	{
		candidateService.deleteCandidate(candidateId);
	}







}