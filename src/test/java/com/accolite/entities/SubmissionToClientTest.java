package com.accolite.entities;

import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class SubmissionToClientTest {

    @Test
    public void testGetterAndSetter() {
        SubmissionToClient submission = new SubmissionToClient();

        // Set values
        submission.setSubmissionId(1);
        submission.setRemark("Excellent candidate");
        submission.setStatus(Status.Selected);
        submission.setSubmissionDate(new Date());
        submission.setIsDeleted(false);

        // Check values
        assertEquals(1, submission.getSubmissionId());
        assertEquals("Excellent candidate", submission.getRemark());
        assertEquals(Status.Selected, submission.getStatus());
        assertNotNull(submission.getSubmissionDate());
        assertFalse(submission.getIsDeleted());

        // Update values
        submission.setRemark("Good candidate");
        submission.setStatus(Status.Pending);
        submission.setIsDeleted(true);

        // Check updated values
        assertEquals("Good candidate", submission.getRemark());
        assertEquals(Status.Pending, submission.getStatus());
        assertTrue(submission.getIsDeleted());
    }
}
