package com.accolite.entities;//package com.accolite.entities;
//
//import org.junit.jupiter.api.Test;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertFalse;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//
//public class ClientTest {
//
//    @Test
//    public void testGetterAndSetter() {
//        Client client = new Client();
//
//        // Set values
//        client.setClientId(1);
//        client.setClientName("Fedex");
//        client.setClientResponseTimeinDays(7);
//        client.setClientRequirement("Java Developer");
//        client.setSkills("Java, Springboot, Hibernate");
//        client.setIsDeleted(false);
//
//        // Check values
//        assertEquals(1, client.getClientId());
//        assertEquals("Fedex", client.getClientName());
//        assertEquals(7, client.getClientResponseTimeinDays());
//        assertEquals("Java Developer", client.getClientRequirement());
//        assertEquals("Java, Springboot, Hibernate", client.getSkills());
//        assertFalse(client.getIsDeleted());
//
//        // Update values
//        client.setClientName("GS");
//        client.setClientResponseTimeinDays(5);
//        client.setClientRequirement("Full Stack Developer");
//        client.setSkills("React, Node.js");
//        client.setIsDeleted(true);
//
//        // Check updated values
//        assertEquals("GS", client.getClientName());
//        assertEquals(5, client.getClientResponseTimeinDays());
//        assertEquals("Full Stack Developer", client.getClientRequirement());
//        assertEquals("React, Node.js", client.getSkills());
//        assertTrue(client.getIsDeleted());
//    }
//}
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class ClientTest {

    private Client client;
    private List<Candidate> candidates;
    private List<SubmissionToClient> submissions;
    private List<Users> users;

    @BeforeEach
    public void setUp() {
        // Initialize lists
        candidates = new ArrayList<>();
        submissions = new ArrayList<>();
        users = new ArrayList<>();

        // Create a new Client object for each test case
        client = new Client();
        client.setClientId(1);
        client.setClientName("Acme Corp");
        client.setClientResponseTimeinDays(3);
        client.setClientRequirement("Software Development");
        client.setSkills("Java, Spring Boot");
        client.setIsDeleted(false);

        // Create sample Candidates
        Candidate candidate1 = new Candidate();
        candidate1.setCandidateId(1);
        candidate1.setCandidateName("John Doe");

        Candidate candidate2 = new Candidate();
        candidate2.setCandidateId(2);
        candidate2.setCandidateName("Jane Smith");

        candidates.add(candidate1);
        candidates.add(candidate2);

        client.setCandidates(candidates);

        // Create sample SubmissionToClient
        SubmissionToClient submission1 = new SubmissionToClient();
        submission1.setSubmissionId(1);

        submissions.add(submission1);

        client.setSubmissions(submissions);

        // Create sample Users
        Users user1 = new Users();
        user1.setUserId(1);
        user1.setUserName("user1");

        Users user2 = new Users();
        user2.setUserId(2);
        user2.setUserName("user2");

        users.add(user1);
        users.add(user2);

        client.setUsers(users);
    }

    @Test
    public void testConstructorWithParameters() {
        Client newClient = new Client(1, "Acme Corp", 3, "Software Development", "Java, Spring Boot", false, candidates, submissions, users);

        Assertions.assertEquals(client.getClientId(), newClient.getClientId());
        Assertions.assertEquals(client.getClientName(), newClient.getClientName());
        Assertions.assertEquals(client.getClientResponseTimeinDays(), newClient.getClientResponseTimeinDays());
        Assertions.assertEquals(client.getClientRequirement(), newClient.getClientRequirement());
        Assertions.assertEquals(client.getSkills(), newClient.getSkills());
        Assertions.assertEquals(client.getIsDeleted(), newClient.getIsDeleted());
        Assertions.assertEquals(client.getCandidates(), newClient.getCandidates());
        Assertions.assertEquals(client.getSubmissions(), newClient.getSubmissions());
        Assertions.assertEquals(client.getUsers(), newClient.getUsers());
    }




}

