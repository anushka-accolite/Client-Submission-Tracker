package com.accolite.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accolite.entities.Client;
import com.accolite.repository.ClientRepository;

@Service
public class ClientService {

	@Autowired
	private ClientRepository clientRepository;

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