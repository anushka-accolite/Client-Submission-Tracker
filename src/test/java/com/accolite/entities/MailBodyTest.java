package com.accolite.entities;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class MailBodyTest {

    @Test
    public void testBuilder() {
        // Create a MailBody instance using the Builder
        MailBody mailBody = MailBody.builder()
                .to("recipient@example.com")
                .subject("Test Subject")
                .text("Hello, this is a test email.")
                .build();

        // Validate fields using assertions
        Assertions.assertEquals("recipient@example.com", mailBody.to());
        Assertions.assertEquals("Test Subject", mailBody.subject());
        Assertions.assertEquals("Hello, this is a test email.", mailBody.text());
    }

    @Test
    public void testRecordFields() {
        // Create a MailBody instance using constructor
        MailBody mailBody = new MailBody("recipient@example.com", "Test Subject", "Hello, this is a test email.");

        // Validate fields using assertions
        Assertions.assertEquals("recipient@example.com", mailBody.to());
        Assertions.assertEquals("Test Subject", mailBody.subject());
        Assertions.assertEquals("Hello, this is a test email.", mailBody.text());
    }

    @Test
    public void testToString() {
        // Create a MailBody instance
        MailBody mailBody = new MailBody("recipient@example.com", "Test Subject", "Hello, this is a test email.");

        // Validate toString() method
        String expectedToString = "MailBody[to=recipient@example.com, subject=Test Subject, text=Hello, this is a test email.]";
        Assertions.assertEquals(expectedToString, mailBody.toString());
    }
}
