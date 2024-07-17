package com.accolite.service;

import java.util.List;

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




}
