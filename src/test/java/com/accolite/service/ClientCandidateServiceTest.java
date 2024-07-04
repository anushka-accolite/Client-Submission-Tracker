package com.accolite.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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

import com.accolite.entities.Candidate;
import com.accolite.entities.Client;
import com.accolite.repository.CandidateRepository;
import com.accolite.repository.ClientRepository;

@ExtendWith(MockitoExtension.class)
public class ClientCandidateServiceTest {

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private CandidateRepository candidateRepository;

    @InjectMocks
    private ClientCandidateService clientCandidateService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testLinkCandidateToClient() {
        Client client = new Client();
        client.setClientId(1);
        List<Candidate> candidates = new ArrayList<>();
        client.setCandidates(candidates);

        Candidate candidate = new Candidate();
        candidate.setCandidateId(1);

        when(clientRepository.findById(1)).thenReturn(Optional.of(client));
        when(candidateRepository.findById(1)).thenReturn(Optional.of(candidate));

        clientCandidateService.linkCandidateToClient(1, 1);

        assertEquals(1, client.getCandidates().size());
        verify(clientRepository, times(1)).findById(1);
        verify(candidateRepository, times(1)).findById(1);
        verify(candidateRepository, times(1)).save(any());
    }

    @Test
    public void testGetCandidatesByClientId() {
        Client client = new Client();
        client.setClientId(1);
        List<Candidate> candidates = new ArrayList<>();
        Candidate candidate = new Candidate();
        candidate.setCandidateId(1);
        candidates.add(candidate);
        client.setCandidates(candidates);

        when(clientRepository.findById(1)).thenReturn(Optional.of(client));

        List<Candidate> result = clientCandidateService.getCandidatesByClientId(1);

        assertEquals(1, result.size());
        assertEquals(candidate, result.get(0));
        verify(clientRepository, times(1)).findById(1);
    }
    @Test
    void testGetCandidatesByClientId_ClientNotFound() {
        // Mock data
        Integer clientId = 1;

        // Mock repository behavior
        when(clientRepository.findById(clientId)).thenReturn(Optional.empty());

        // Perform service method call
        List<Candidate> retrievedCandidates = clientCandidateService.getCandidatesByClientId(clientId);

        // Assertions
        assertNull(retrievedCandidates);
    }
}
