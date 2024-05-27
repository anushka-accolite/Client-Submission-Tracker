package com.accolite.controller;

import com.accolite.controller.CandidateSkillController;
import com.accolite.entities.CandidateSkill;
import com.accolite.service.CandidateSkillService;
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

class CandidateSkillControllerTest {

    @Mock
    private CandidateSkillService candidateSkillService;

    @InjectMocks
    private CandidateSkillController candidateSkillController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this); // Initialize mocks
    }

    @Test
    void testAddSkillToCandidate() {
        Integer candidateId = 1;
        String skill = "Java";
        CandidateSkill addedSkill = new CandidateSkill(candidateId, skill);
        when(candidateSkillService.addSkillToCandidate(candidateId, skill)).thenReturn(addedSkill);

        ResponseEntity<CandidateSkill> responseEntity = candidateSkillController.addSkillToCandidate(candidateId, skill);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(addedSkill, responseEntity.getBody());
    }

    @Test
    void testGetAllSkillsForCandidate() {
        Integer candidateId = 1;
        List<String> skills = new ArrayList<>();
        skills.add("Java");
        skills.add("Springboot");
        when(candidateSkillService.getAllSkillsForCandidate(candidateId)).thenReturn(skills);

        ResponseEntity<List<String>> responseEntity = candidateSkillController.getAllSkillsForCandidate(candidateId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(skills, responseEntity.getBody());
    }

    @Test
    void testRemoveSkillFromCandidate() {
        Integer candidateId = 1;
        String skill = "Java";

        ResponseEntity<Void> responseEntity = candidateSkillController.removeSkillFromCandidate(candidateId, skill);

        verify(candidateSkillService, times(1)).removeSkillFromCandidate(candidateId, skill);
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
    }
}
