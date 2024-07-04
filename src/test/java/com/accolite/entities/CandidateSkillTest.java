package com.accolite.entities;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class CandidateSkillTest {

    private CandidateSkill candidateSkill;

    @Mock
    private List<Candidate> mockCandidates;

    @BeforeEach
    public void setUp() {
        candidateSkill = new CandidateSkill();
        candidateSkill.setSkill_id(1);
        candidateSkill.setSkill("Java");
        candidateSkill.setIsDeleted(false);
        candidateSkill.setCandidates(mockCandidates);
    }

    @Test
    public void testGettersAndSetters() {
        Assertions.assertEquals(1, candidateSkill.getSkill_id());
        Assertions.assertEquals("Java", candidateSkill.getSkill());
        Assertions.assertFalse(candidateSkill.getIsDeleted());
        Assertions.assertEquals(mockCandidates, candidateSkill.getCandidates());
    }


}