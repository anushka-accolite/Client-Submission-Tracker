package com.accolite.controller;

import java.util.Date;
import java.util.List;

import com.accolite.entities.*;
import com.accolite.service.CandidateService;
import com.accolite.service.ClientService;
import com.accolite.service.UserService;
import jdk.jshell.Snippet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.accolite.service.SubmissionService;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "http://localhost:3000")
public class SubmissionController {
	
	@Autowired
	private SubmissionService submissionService;

	@Autowired
	private ClientService clientService;

	@Autowired
	private CandidateService candidateService;

	@Autowired
	private UserService userService;
	
	@GetMapping("/getAll")
    public ResponseEntity<List<SubmissionToClient>> getAllSubmissions() {
        List<SubmissionToClient> submissions = submissionService.getAllSubmissions();
        return new ResponseEntity<>(submissions, HttpStatus.OK);
    }
	
	@PostMapping
    public ResponseEntity<SubmissionToClient> submitCandidateToClient(@RequestBody SubmissionToClient submission) {
        SubmissionToClient newSubmission = submissionService.submitCandidateToClient(submission);
        return new ResponseEntity<>(newSubmission, HttpStatus.CREATED);
    }
	
	@GetMapping("/{submissionId}")
    public ResponseEntity<SubmissionToClient> getSubmissionById(@PathVariable Integer submissionId) {
        SubmissionToClient submission = submissionService.getSubmissionById(submissionId);
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }
	
	@PutMapping("/{submissionId}")
    public ResponseEntity<SubmissionToClient> updateSubmissionStatus(@PathVariable Integer submissionId, @RequestBody SubmissionToClient submission) {
        SubmissionToClient updatedSubmission = submissionService.updateSubmissionStatus(submissionId, submission);
        return new ResponseEntity<>(updatedSubmission, HttpStatus.OK);
    }
	
	@DeleteMapping("/{submissionId}")
	public void deleteSubmission(@PathVariable Integer submissionId)
	{
		submissionService.deleteSubmission(submissionId);
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<SubmissionToClient>> getSubmissionsByUser(@PathVariable Integer userId)
	{
		List<SubmissionToClient> submissions = submissionService.getSubmissionsByUser(userId);
	    if (submissions != null && !submissions.isEmpty()) {
	        return new ResponseEntity<>(submissions, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

	@GetMapping("/{submissionId}/history")
	public ResponseEntity<List<Object[]>> getSubmissionAuditHistory(
			@PathVariable int submissionId) {
		List<Object[]> auditHistory = submissionService.getSubmissionAuditHistory(submissionId);
		if (auditHistory.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(auditHistory, HttpStatus.OK);
	}

	@GetMapping("/candidate/{candidateId}")
	public ResponseEntity<List<Integer>> checkCandidateAssociation(@PathVariable int candidateId) {
		List<Integer> submissionIds = submissionService.getSubmissionIdsByCandidateId(candidateId);
		if (submissionIds.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(submissionIds, HttpStatus.OK);
	}
	@PostMapping("/clients/{clientId}/candidates/{candidateId}/submit/{userId}")
	public ResponseEntity<String> submitCandidateProfile(@PathVariable Integer clientId, @PathVariable Integer candidateId, @PathVariable Integer userId) {
		// Check if the user exists
		Users user = userService.getUserById(userId);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
		}

		// Check if the client exists
		Client client = clientService.getClientById(clientId);
		if (client == null) {
			return ResponseEntity.notFound().build();
		}

		// Check if the user is associated with the client
		if (!client.getUsers().contains(user)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not authorized to submit candidates to this client");
		}

		// Check if the candidate exists
		Candidate candidate = candidateService.getCandidateById(candidateId);
		if (candidate == null) {
			return ResponseEntity.notFound().build();
		}

		// Perform submission logic here
		// For example, you might want to update the candidate's status to "submitted"
		SubmissionToClient submission=new SubmissionToClient();
		submission.setCandidate(candidate);
		submission.setClient(client);
		submission.setUsers(user);
		submission.setIsDeleted(false);
		submission.setSubmissionDate(new Date());
		submission.setRemark("");
		submission.setStatus(Status.Selected);
		submissionService.submitCandidateToClient(submission);
		return ResponseEntity.ok("Candidate profile submitted successfully");
	}











}
