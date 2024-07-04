package com.accolite.entities;

import com.accolite.repository.CandidateRepository;
import com.accolite.repository.SubmissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

public class CandidateTest {

    private Candidate candidate;
    private CandidateRepository candidateRepository;
    private SubmissionRepository submissionToClientRepository;

    @Autowired
    public void CandidateTests(CandidateRepository candidateRepository, SubmissionRepository submissionToClientRepository) {
        this.candidateRepository = candidateRepository;
        this.submissionToClientRepository = submissionToClientRepository;
    }



    @BeforeEach
    public void setUp() {
        candidate = new Candidate();
    }

    @Test
    public void testCandidateIdAccessors() {
        candidate.setCandidateId(1);
        assertEquals(1, candidate.getCandidateId());
    }

    @Test
    public void testCandidateNameAccessors() {
        candidate.setCandidateName("John Doe");
        assertEquals("John Doe", candidate.getCandidateName());
    }

    @Test
    public void testCandidateEmailAccessors() {
        candidate.setCandidateEmail("john.doe@example.com");
        assertEquals("john.doe@example.com", candidate.getCandidateEmail());
    }

    @Test
    public void testCandidateStatusAccessors() {
        candidate.setCandidateStatus("Active");
        assertEquals("Active", candidate.getCandidateStatus());
    }

    @Test
    public void testLastWorkingDayAccessors() {
        Date lastWorkingDay = new Date();
        candidate.setLast_working_day(lastWorkingDay);
        assertEquals(lastWorkingDay, candidate.getLast_working_day());
    }

    @Test
    public void testIsAccoliteEmployeeAccessors() {
        candidate.setIsAccoliteEmployee("Yes");
        assertEquals("Yes", candidate.getIsAccoliteEmployee());
    }

    @Test
    public void testExperienceAccessors() {
        candidate.setExperience(3);
        assertEquals(3, candidate.getExperience());
    }

    @Test
    public void testIsDeletedAccessors() {
        candidate.setIsDeleted(false);
        assertFalse(candidate.getIsDeleted());
    }

    @Test
    public void testClientsRelationship() {
        Client client1 = new Client();
        Client client2 = new Client();

        List<Client> clients = new ArrayList<>();
        clients.add(client1);
        clients.add(client2);

        candidate.setClients(clients);

        assertEquals(2, candidate.getClients().size());
        assertTrue(candidate.getClients().contains(client1));
        assertTrue(candidate.getClients().contains(client2));
    }

    @Test
    public void testSkillsRelationship() {
        CandidateSkill skill1 = new CandidateSkill();
        CandidateSkill skill2 = new CandidateSkill();

        List<CandidateSkill> skills = new ArrayList<>();
        skills.add(skill1);
        skills.add(skill2);

        candidate.setSkills(skills);

        assertEquals(2, candidate.getSkills().size());
        assertTrue(candidate.getSkills().contains(skill1));
        assertTrue(candidate.getSkills().contains(skill2));
    }


}
