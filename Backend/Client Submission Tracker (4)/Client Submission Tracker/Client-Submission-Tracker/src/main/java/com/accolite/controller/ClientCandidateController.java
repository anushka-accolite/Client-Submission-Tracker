package com.accolite.controller;

import java.util.List;

import com.accolite.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/clients")
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientCandidateService.getAllClients();
        if (clients.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(clients);
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        Client createdClient = clientCandidateService.createClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    }

    @GetMapping("/{clientId}/users")
    public ResponseEntity<List<Users>> getUsersByClient(@PathVariable Integer clientId) {
        List<Users> users = clientCandidateService.getUsersByClientId(clientId);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/{clientId}/users/{userId}")
    public ResponseEntity<Void> addClientToUser(@PathVariable("clientId") Integer clientId, @PathVariable("userId") Integer userId) {
        clientCandidateService.addClientToUser(clientId, userId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }




}
