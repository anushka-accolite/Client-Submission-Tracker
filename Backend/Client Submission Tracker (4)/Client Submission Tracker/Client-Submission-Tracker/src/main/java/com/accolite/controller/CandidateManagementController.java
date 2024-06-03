package com.accolite.controller;

import java.util.List;
import java.util.Map;

import com.accolite.helper.Helper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.accolite.entities.Candidate;
import com.accolite.service.CandidateService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/candidates")
public class CandidateManagementController {
	
	@Autowired
	private CandidateService candidateService;
	//excel file upload
	@PostMapping("/product/upload")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file){
		if(Helper.checkExcelFormat(file)){
			this.candidateService.save(file);

			return ResponseEntity.ok(Map.of("message", "file is uploaded and data is saved to db "));


		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please upload excel file");

	}
	@GetMapping("/product")
	public List<Candidate> getAllProduct(){
		return this.candidateService.getAllCandidates();
	}
	
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
