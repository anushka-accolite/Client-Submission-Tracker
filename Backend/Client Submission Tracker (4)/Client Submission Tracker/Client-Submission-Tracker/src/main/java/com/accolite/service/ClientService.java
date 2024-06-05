package com.accolite.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.accolite.entities.Users;
import com.accolite.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accolite.entities.Client;
import com.accolite.repository.ClientRepository;

@Service
public class ClientService {
	
	@Autowired
	private ClientRepository clientRepository;
	@Autowired
	private UserRepository userRepository;


	public List<Users> getUsersByClientId(Integer clientId) {
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
			Users user = userOptional.get();
			client.getUsers().add((Users) user);
			clientRepository.save(client);
		} else {
			// Handle case when client or user not found
		}
	}

	public Client createClient(Client client) {
		// TODO Auto-generated method stub
		return clientRepository.save(client);
	}

	public List<Client> getAllClients() {
        return (List<Client>) clientRepository.findAll();
    }
	
	public Client getClientById(Integer clientId) {
        return  clientRepository.findById(clientId).orElse(null);
    }
	
	  public Client updateClient(Integer clientId, Client updatedClient) {
	        Client existingClient = clientRepository.findById(clientId).orElse(null);
	        if (existingClient != null) {
	            existingClient.setClientName(updatedClient.getClientName());
	            existingClient.setClientResponseTimeinDays(updatedClient.getClientResponseTimeinDays());
	            existingClient.setClientRequirement(updatedClient.getClientRequirement());
	            existingClient.setSkills(updatedClient.getSkills());
	            existingClient.setIsDeleted(updatedClient.getIsDeleted());
	            return clientRepository.save(existingClient);
	        }
	        return null;
	    }
	  public void deleteClient(Integer clientId) {
		  clientRepository.deleteById(clientId);
	  }


}
