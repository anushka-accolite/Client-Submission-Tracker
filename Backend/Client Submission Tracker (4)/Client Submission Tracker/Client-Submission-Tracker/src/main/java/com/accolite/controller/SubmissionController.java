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

import com.accolite.entities.Client;
import com.accolite.entities.SubmissionToClient;
import com.accolite.service.SubmissionService;

@RestController
@RequestMapping("/api/submissions")
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




}
