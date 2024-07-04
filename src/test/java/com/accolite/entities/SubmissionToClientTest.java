package com.accolite.entities;//package com.accolite.entities;
//
//import org.junit.jupiter.api.Test;
//
//import java.util.Date;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//public class SubmissionToClientTest {
//
//    @Test
//    public void testGetterAndSetter() {
//        SubmissionToClient submission = new SubmissionToClient();
//
//        // Set values
//        submission.setSubmissionId(1);
//        submission.setRemark("Excellent candidate");
//        submission.setStatus(Status.Selected);
//        submission.setSubmissionDate(new Date());
//        submission.setIsDeleted(false);
//
//        // Check values
//        assertEquals(1, submission.getSubmissionId());
//        assertEquals("Excellent candidate", submission.getRemark());
//        assertEquals(Status.Selected, submission.getStatus());
//        assertNotNull(submission.getSubmissionDate());
//        assertFalse(submission.getIsDeleted());
//
//        // Update values
//        submission.setRemark("Good candidate");
//        submission.setStatus(Status.Pending);
//        submission.setIsDeleted(true);
//
//        // Check updated values
//        assertEquals("Good candidate", submission.getRemark());
//        assertEquals(Status.Pending, submission.getStatus());
//        assertTrue(submission.getIsDeleted());
//    }
//}

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Date;

public class SubmissionToClientTest {

    @Test
    public void testConstructorAndGetters() {
        // Create a sample Date for submissionDate
        Date submissionDate = new Date();

        // Mock objects for relationships
        Users mockUser = Mockito.mock(Users.class);
        Client mockClient = Mockito.mock(Client.class);
        Candidate mockCandidate = Mockito.mock(Candidate.class);

        // Create an instance of SubmissionToClient
        SubmissionToClient submission = new SubmissionToClient(1, "Good", Status.Selected, submissionDate,
                mockUser, mockClient, mockCandidate, false);

        // Test getters
        Assertions.assertEquals(1, submission.getSubmissionId());
        Assertions.assertEquals("Good", submission.getRemark());
        Assertions.assertEquals(Status.Selected, submission.getStatus());
        Assertions.assertEquals(submissionDate, submission.getSubmissionDate());
        Assertions.assertEquals(mockUser, submission.getUsers());
        Assertions.assertEquals(mockClient, submission.getClient());
        Assertions.assertEquals(mockCandidate, submission.getCandidate());
        Assertions.assertFalse(submission.getIsDeleted()); // Assuming false by default for isDeleted
    }


    @Test
    public void testSetters() {
        SubmissionToClient submission = new SubmissionToClient();

        // Mock objects for relationships
        Users mockUser = Mockito.mock(Users.class);
        Client mockClient = Mockito.mock(Client.class);
        Candidate mockCandidate = Mockito.mock(Candidate.class);

        // Test setters
        submission.setSubmissionId(1);
        submission.setRemark("Good");
        submission.setStatus(Status.Selected);
        submission.setSubmissionDate(new Date());
        submission.setUsers(mockUser);
        submission.setClient(mockClient);
        submission.setCandidate(mockCandidate);
        submission.setIsDeleted(false);

        // Validate using getters
        Assertions.assertEquals(1, submission.getSubmissionId());
        Assertions.assertEquals("Good", submission.getRemark());
        Assertions.assertEquals(Status.Selected, submission.getStatus());
        Assertions.assertNotNull(submission.getSubmissionDate());
        Assertions.assertEquals(mockUser, submission.getUsers());
        Assertions.assertEquals(mockClient, submission.getClient());
        Assertions.assertEquals(mockCandidate, submission.getCandidate());
        Assertions.assertFalse(submission.getIsDeleted()); // Assuming false by default for isDeleted
    }
}

