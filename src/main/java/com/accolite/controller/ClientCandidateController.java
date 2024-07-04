package com.accolite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.accolite.entities.Candidate;
import com.accolite.entities.Client;
import com.accolite.service.ClientCandidateService;

@RestController
@RequestMapping("/api/candidate-client")
public class ClientCandidateController {
	
	@Autowired
	private ClientCandidateService clientCandidateService;
	
	@PostMapping("/link")
    public ResponseEntity<String> linkCandidateToClient(@RequestParam Integer candidateId, @RequestParam Integer clientId) {
        clientCandidateService.linkCandidateToClient(candidateId, clientId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Candidate linked to client successfully");
    }
	
	@GetMapping("/client/{clientId}")
    public ResponseEntity<List<Candidate>> getCandidatesByClient(@PathVariable Integer clientId) {
        List<Candidate> candidates = clientCandidateService.getCandidatesByClientId(clientId);
        return ResponseEntity.ok(candidates);
    }
	
//	@GetMapping("/candidate/{candidateId}")
//    public ResponseEntity<List<Client>> getClientByCandidate(@PathVariable Integer candidateId) {
//        List<Client> clients = clientCandidateService.getClientByCandidateId(candidateId);
//        if (clients != null) {
//            return ResponseEntity.ok(clients);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }






}
