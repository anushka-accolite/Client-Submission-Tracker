package com.accolite.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;

import com.accolite.entities.Candidate;
import com.accolite.entities.CandidateSkill;
import com.accolite.entities.Client;
import com.accolite.entities.SubmissionToClient;

public class CandidateTest {

    @Test
    public void testGetterAndSetter() {
        Candidate candidate = new Candidate();

        // Set values
        candidate.setCandidateId(1);
        candidate.setCandidateName("Anushka");
        candidate.setCandidateEmail("anushka@gmail.com");
        candidate.setCandidateStatus("Active");
        candidate.setLast_working_day(new Date());
        candidate.setIsAccoliteEmployee("Yes");
        candidate.setExperience(5);
        candidate.setIsDeleted(false);

        // Check values
        assertEquals(1, candidate.getCandidateId());
        assertEquals("Anushka", candidate.getCandidateName());
        assertEquals("anushka@gmail.com", candidate.getCandidateEmail());
        assertEquals("Active", candidate.getCandidateStatus());
        assertTrue(candidate.getLast_working_day() instanceof Date);
        assertEquals("Yes", candidate.getIsAccoliteEmployee());
        assertEquals(5, candidate.getExperience());
        assertEquals(false, candidate.getIsDeleted());
    }

    @Test
    public void testSkills() {
        Candidate candidate = new Candidate();
        CandidateSkill skill1 = new CandidateSkill();
        skill1.setSkill("Java");
        CandidateSkill skill2 = new CandidateSkill();
        skill2.setSkill("Springboot");

        List<CandidateSkill> skills = new ArrayList<>();
        skills.add(skill1);
        skills.add(skill2);

        candidate.setSkills(skills);

        assertEquals(2, candidate.getSkills().size());
        assertEquals("Java", candidate.getSkills().get(0).getSkill());
        assertEquals("Springboot", candidate.getSkills().get(1).getSkill());
    }

    @Test
    public void testClients() {
        Candidate candidate = new Candidate();
        Client client1 = new Client();
        client1.setClientName("Client A");
        Client client2 = new Client();
        client2.setClientName("Client B");

        List<Client> clients = new ArrayList<>();
        clients.add(client1);
        clients.add(client2);

        candidate.setClients(clients);

        assertEquals(2, candidate.getClients().size());
        assertEquals("Client A", candidate.getClients().get(0).getClientName());
        assertEquals("Client B", candidate.getClients().get(1).getClientName());
    }

    @Test
    public void testSubmissions() {
        Candidate candidate = new Candidate();
        SubmissionToClient submission1 = new SubmissionToClient();
        submission1.setSubmissionId(1);
        SubmissionToClient submission2 = new SubmissionToClient();
        submission2.setSubmissionId(2);

        List<SubmissionToClient> submissions = new ArrayList<>();
        submissions.add(submission1);
        submissions.add(submission2);

        candidate.setSubmissions(submissions);

        assertEquals(2, candidate.getSubmissions().size());
        assertEquals(1, candidate.getSubmissions().get(0).getSubmissionId());
        assertEquals(2, candidate.getSubmissions().get(1).getSubmissionId());
    }
}