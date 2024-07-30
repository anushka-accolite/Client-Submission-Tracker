package com.accolite.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.accolite.entities.Candidate;
import com.accolite.service.ClientCandidateService;

public class ClientCandidateControllerTest {

    @Mock
    private ClientCandidateService clientCandidateService;

    @InjectMocks
    private ClientCandidateController clientCandidateController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testLinkCandidateToClient_Success() {
        Integer candidateId = 1;
        Integer clientId = 2;

        // Mock the service method
        doNothing().when(clientCandidateService).linkCandidateToClient(candidateId, clientId);

        // Call the controller method
        ResponseEntity<String> response = clientCandidateController.linkCandidateToClient(candidateId, clientId);

        // Verify the service method was called
        verify(clientCandidateService, times(1)).linkCandidateToClient(candidateId, clientId);

        // Check the response status code
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        // Check the response body
        assertEquals("Candidate linked to client successfully", response.getBody());
    }

    @Test
    public void testGetCandidatesByClient_Success() {
        Integer clientId = 1;
        List<Candidate> mockCandidates = new ArrayList<>(); // Create mock data
        mockCandidates.add(new Candidate());
        mockCandidates.add(new Candidate());

        // Mock the service method
        when(clientCandidateService.getCandidatesByClientId(clientId)).thenReturn(mockCandidates);

        // Call the controller method
        ResponseEntity<List<Candidate>> response = clientCandidateController.getCandidatesByClient(clientId);

        // Verify the service method was called
        verify(clientCandidateService, times(1)).getCandidatesByClientId(clientId);

        // Check the response status code
        assertEquals(HttpStatus.OK, response.getStatusCode());
        // Check the response body
        assertEquals(mockCandidates, response.getBody());
    }
}