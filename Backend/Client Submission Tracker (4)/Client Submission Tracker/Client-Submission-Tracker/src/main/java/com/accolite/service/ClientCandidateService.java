package com.accolite.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.accolite.entities.Users;
import com.accolite.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accolite.entities.Candidate;
import com.accolite.entities.Client;
import com.accolite.repository.CandidateRepository;
import com.accolite.repository.ClientRepository;

@Service
public class ClientCandidateService {
	
	@Autowired
	private ClientRepository clientRepository;
	
	@Autowired
	private CandidateRepository candidateRepository;
	@Autowired
	private UserRepository userRepository;
	
	 public void linkCandidateToClient(Integer candidateId, Integer clientId) {
	        Candidate candidate = candidateRepository.findById(candidateId).orElse(null);
	        Client client = clientRepository.findById(clientId).orElse(null);
	        if (candidate != null && client != null) {
	            client.getCandidates().add(candidate);
	            candidateRepository.save(candidate);
	        }
	    }
	 
	 public List<Candidate> getCandidatesByClientId(Integer clientId) {
	        Client client= clientRepository.findById(clientId).orElse(null);
	        if(client!=null)
	        {
	        	return client.getCandidates();
	        }
	        return null;
	    }
//	 public List<Client> getClientByCandidateId(Integer candidateId) {
//	        Candidate candidate = candidateRepository.findById(candidateId).orElse(null);
//	        if (candidate != null) {
//	            return candidate.getClients();
//	        }
//	        return null;
//	    }
public Client createClient(Client client) {
	return clientRepository.save(client);
}

	public List<User> getUsersByClientId(Integer clientId) {
		Optional<Client> clientOptional = clientRepository.findById(clientId);
		if (clientOptional.isPresent()) {
			Client client = clientOptional.get();
			return client.getUsers();
		} else {
			return Collections.emptyList();
		}
	}

	public void addClientToUser(Integer clientId, Integer userId) {
		Optional<Client> clientOptional = clientRepository.findById(clientId);
		Optional<Users> userOptional = userRepository.findById(userId);
		if (clientOptional.isPresent() && userOptional.isPresent()) {
			Client client = clientOptional.get();
			User user = (User) userOptional.get();
			client.getUsers().add(user);
			clientRepository.save(client);
		} else {
			// Handle case when client or user not found
		}
	}

	public List<Client> getAllClients() {
		return (List<Client>) clientRepository.findAll();
	}



}
