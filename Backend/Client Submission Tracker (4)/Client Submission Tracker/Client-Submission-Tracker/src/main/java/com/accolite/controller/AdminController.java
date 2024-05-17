package com.accolite.controller;


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
import com.accolite.service.ClientService;
import com.accolite.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	    
	    @Autowired
	    private ClientService clientService;
	
	    private UserService userService;
        @PostMapping
	    public ResponseEntity<Client> createClient(@RequestBody Client client) {
	        Client createdClient = clientService.createClient(client);
	        return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
	    }

	    @GetMapping("/clients")
	    public ResponseEntity<List<Client>> getAllClients() {
	        List<Client> clients = clientService.getAllClients();
	        return new ResponseEntity<>(clients, HttpStatus.OK);
	    }
	    
	    @GetMapping("/{clientId}")
	    public ResponseEntity<Client> getClientById(@PathVariable Integer clientId) {
	        Client client = clientService.getClientById(clientId);
	        if (client != null) {
	            return new ResponseEntity<>(client, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	    
	    @PutMapping("/{clientId}")
	    public ResponseEntity<Client> updateClient(@PathVariable Integer clientId, @RequestBody Client updatedClient) {
	        Client client = clientService.updateClient(clientId, updatedClient);
	        if (client != null) {
	            return new ResponseEntity<>(client, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	    
	    @DeleteMapping("/{clientId}")
	    public void deleteClient(@PathVariable Integer clientId) {
	    	clientService.deleteClient(clientId);
	    }



}
