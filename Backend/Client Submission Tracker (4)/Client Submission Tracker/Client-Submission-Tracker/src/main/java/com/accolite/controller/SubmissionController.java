package com.accolite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.accolite.entities.Client;
import com.accolite.entities.SubmissionToClient;
import com.accolite.service.SubmissionService;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "http://localhost:3000")
public class SubmissionController {
	
	@Autowired
	private SubmissionService submissionService;
	
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



}
