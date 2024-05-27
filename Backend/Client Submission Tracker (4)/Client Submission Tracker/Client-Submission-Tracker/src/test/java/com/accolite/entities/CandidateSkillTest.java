package com.accolite.entities;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class CandidateSkillTest {

    @Test
    public void testGetterAndSetter() {
        CandidateSkill candidateSkill = new CandidateSkill();

        // Set values
        candidateSkill.setSkill_id(1);
        candidateSkill.setSkill("Java");
        candidateSkill.setIsDeleted(false);

        // Check values
        assertEquals(1, candidateSkill.getSkill_id());
        assertEquals("Java", candidateSkill.getSkill());
        assertFalse(candidateSkill.getIsDeleted());

        // Update values
        candidateSkill.setSkill("Springboot");
        candidateSkill.setIsDeleted(true);

        // Check updated values
        assertEquals("Springboot", candidateSkill.getSkill());
        assertTrue(candidateSkill.getIsDeleted());
    }
}
