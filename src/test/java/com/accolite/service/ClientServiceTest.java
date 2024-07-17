package com.accolite.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.accolite.entities.Client;
import com.accolite.repository.ClientRepository;

@ExtendWith(MockitoExtension.class)
public class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientService clientService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreateClient() {
        Client client = new Client();
        client.setClientId(1);
        client.setClientName("Test Client");

        when(clientRepository.save(client)).thenReturn(client);

        Client createdClient = clientService.createClient(client);

        assertEquals(client, createdClient);
        verify(clientRepository, times(1)).save(client);
    }

    @Test
    public void testGetAllClients() {
        List<Client> clients = new ArrayList<>();
        clients.add(new Client());
        clients.add(new Client());

        when(clientRepository.findAll()).thenReturn(clients);

        List<Client> result = clientService.getAllClients();

        assertEquals(clients.size(), result.size());
        verify(clientRepository, times(1)).findAll();
    }

    @Test
    public void testGetClientById() {
        Client client = new Client();
        client.setClientId(1);
        client.setClientName("Test Client");

        when(clientRepository.findById(1)).thenReturn(Optional.of(client));

        Client result = clientService.getClientById(1);

        assertEquals(client, result);
        verify(clientRepository, times(1)).findById(1);
    }

    @Test
    public void testUpdateClient() {
        Client existingClient = new Client();
        existingClient.setClientId(1);
        existingClient.setClientName("Test Client");

        Client updatedClient = new Client();
        updatedClient.setClientId(1);
        updatedClient.setClientName("Updated Test Client");

        when(clientRepository.findById(1)).thenReturn(Optional.of(existingClient));
        when(clientRepository.save(existingClient)).thenReturn(updatedClient);

        Client result = clientService.updateClient(1, updatedClient);

        assertEquals(updatedClient, result);
        verify(clientRepository, times(1)).findById(1);
        verify(clientRepository, times(1)).save(existingClient);
    }

    @Test
    public void testDeleteClient() {
        clientService.deleteClient(1);
        verify(clientRepository, times(1)).deleteById(1);
    }
}
