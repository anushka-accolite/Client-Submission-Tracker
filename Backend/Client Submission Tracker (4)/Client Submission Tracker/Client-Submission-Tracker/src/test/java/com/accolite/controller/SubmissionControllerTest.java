package com.accolite.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import com.accolite.controller.SubmissionController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.accolite.entities.SubmissionToClient;
import com.accolite.service.SubmissionService;

public class SubmissionControllerTest {

    @Mock
    private SubmissionService submissionService;

    @InjectMocks
    private SubmissionController submissionController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllSubmissions_Success() {
        List<SubmissionToClient> mockSubmissions = new ArrayList<>(); // Create mock data
        mockSubmissions.add(new SubmissionToClient());
        mockSubmissions.add(new SubmissionToClient());

        // Mock the service method
        when(submissionService.getAllSubmissions()).thenReturn(mockSubmissions);

        // Call the controller method
        ResponseEntity<List<SubmissionToClient>> response = submissionController.getAllSubmissions();

        // Verify the service method was called
        verify(submissionService, times(1)).getAllSubmissions();

        // Check the response status code
        assertEquals(HttpStatus.OK, response.getStatusCode());
        // Check the response body
        assertEquals(mockSubmissions, response.getBody());
    }

    @Test
    public void testSubmitCandidateToClient_Success() {
        SubmissionToClient mockSubmission = new SubmissionToClient(); // Create mock data

        // Mock the service method
        when(submissionService.submitCandidateToClient(mockSubmission)).thenReturn(mockSubmission);

        // Call the controller method
        ResponseEntity<SubmissionToClient> response = submissionController.submitCandidateToClient(mockSubmission);

        // Verify the service method was called
        verify(submissionService, times(1)).submitCandidateToClient(mockSubmission);

        // Check the response status code
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        // Check the response body
        assertEquals(mockSubmission, response.getBody());
    }

}