package com.accolite.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.accolite.entities.Candidate;
import com.accolite.repository.CandidateRepository;

@SpringBootTest
public class CandidateServiceTest {

    @Mock
    private CandidateRepository candidateRepository;

    @InjectMocks
    private CandidateService candidateService;

    @Test
    void testCreateCandidate() {
        Candidate candidate = new Candidate(); // Create a sample candidate
        when(candidateRepository.save(candidate)).thenReturn(candidate); // Mock save operation
        Candidate savedCandidate = candidateService.createCandidate(candidate);
        assertEquals(candidate, savedCandidate); // Assert that the saved candidate is returned
    }

    @Test
    void testGetAllCandidates() {
        List<Candidate> candidates = new ArrayList<>(); // Create a list of sample candidates
        when(candidateRepository.findAll()).thenReturn(candidates); // Mock findAll operation
        List<Candidate> retrievedCandidates = candidateService.getAllCandidates();
        assertEquals(candidates, retrievedCandidates); // Assert that the retrieved candidates match
    }

    @Test
    void testGetCandidateById() {
        Candidate candidate = new Candidate(); // Create a sample candidate
        when(candidateRepository.findById(1)).thenReturn(Optional.of(candidate)); // Mock findById operation
        Candidate retrievedCandidate = candidateService.getCandidateById(1);
        assertEquals(candidate, retrievedCandidate); // Assert that the retrieved candidate matches
    }

    @Test
    void testUpdateCandidate() {
        Candidate existingCandidate = new Candidate(); // Create a sample existing candidate
        Candidate updatedCandidate = new Candidate(); // Create a sample updated candidate
        when(candidateRepository.findById(1)).thenReturn(Optional.of(existingCandidate)); // Mock findById operation
        when(candidateRepository.save(existingCandidate)).thenReturn(updatedCandidate); // Mock save operation
        Candidate updated = candidateService.updateCandidate(1, updatedCandidate);
        assertEquals(updatedCandidate, updated); // Assert that the updated candidate is returned
    }

    @Test
    void testDeleteCandidate() {
        doNothing().when(candidateRepository).deleteById(1); // Mock deleteById operation
        candidateService.deleteCandidate(1);
        verify(candidateRepository, times(1)).deleteById(1); // Verify that deleteById is called once
    }
}
