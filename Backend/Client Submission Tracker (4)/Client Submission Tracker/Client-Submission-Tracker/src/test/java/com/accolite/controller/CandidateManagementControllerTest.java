package com.accolite.controller;

import com.accolite.entities.Candidate;
import com.accolite.service.CandidateService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CandidateManagementControllerTest {

    @Mock
    private CandidateService candidateService;

    @InjectMocks
    private CandidateManagementController candidateManagementController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this); // Initialize mocks
    }


    @Test
    void testCreateCandidate() {
        Candidate candidate = new Candidate(); // Create a candidate object
        when(candidateService.createCandidate(any())).thenReturn(candidate); // Mock the service method
        ResponseEntity<Candidate> response = candidateManagementController.createCandidate(candidate); // Call the API
        assertEquals(HttpStatus.CREATED, response.getStatusCode()); // Check if response status is CREATED
        assertEquals(candidate, response.getBody()); // Check if returned candidate is same as created one
        verify(candidateService, times(1)).createCandidate(any()); // Verify if service method is called
    }

    @Test
    void testGetAllCandidates() {
        List<Candidate> candidates = new ArrayList<>(); // Create a list of candidates
        when(candidateService.getAllCandidates()).thenReturn(candidates); // Mock the service method
        ResponseEntity<List<Candidate>> response = candidateManagementController.getAllCandidates(); // Call the API
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Check if response status is OK
        assertEquals(candidates, response.getBody()); // Check if returned candidates are same as mocked ones
        verify(candidateService, times(1)).getAllCandidates(); // Verify if service method is called
    }

}