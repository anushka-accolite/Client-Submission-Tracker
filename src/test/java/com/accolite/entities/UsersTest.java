package com.accolite.entities;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

public class UsersTest {

    @Test
    public void testConstructorAndGetters() {
        // Create a sample user
        Users user = new Users(1, "john.doe", UserRole.TalentAcquistion, "john.doe@example.com", "password", false);

        // Test getters
        Assertions.assertEquals(1, user.getUserId());
        Assertions.assertEquals("john.doe", user.getUserName());
        Assertions.assertEquals(UserRole.TalentAcquistion, user.getUserRole());
        Assertions.assertEquals("john.doe@example.com", user.getEmail());
        Assertions.assertEquals("password", user.getLoginUserPassword());
        Assertions.assertFalse(user.getIsDeleted()); // Assuming false by default for isDeleted
    }



    @Test
    public void testSetters() {
        Users user = new Users();

        // Test setters
        user.setUserId(1);
        user.setUserName("john.doe");
        user.setUserRole(UserRole.TalentAcquistion);
        user.setEmail("john.doe@example.com");
        user.setLoginUserPassword("password");
        user.setIsDeleted(false);

        // Validate using getters
        Assertions.assertEquals(1, user.getUserId());
        Assertions.assertEquals("john.doe", user.getUserName());
        Assertions.assertEquals(UserRole.TalentAcquistion, user.getUserRole());
        Assertions.assertEquals("john.doe@example.com", user.getEmail());
        Assertions.assertEquals("password", user.getLoginUserPassword());
        Assertions.assertFalse(user.getIsDeleted()); // Assuming false by default for isDeleted
    }

    @Test
    public void testOneToManyRelationshipWithSubmissions() {
        // Create a mock SubmissionToClient object
        SubmissionToClient submission = Mockito.mock(SubmissionToClient.class);

        // Create a Users instance
        Users user = new Users();
        List<SubmissionToClient> submissions = new ArrayList<>();
        submissions.add(submission);
        user.setSubmissions(submissions);

        // Validate the relationship
        Assertions.assertEquals(1, user.getSubmissions().size());
        Assertions.assertTrue(user.getSubmissions().contains(submission));
    }

    @Test
    public void testOneToManyRelationshipWithForgotPassword() {
        // Create a mock ForgotPassword object
        ForgotPassword forgotPassword = Mockito.mock(ForgotPassword.class);

        // Create a Users instance
        Users user = new Users();
        List<ForgotPassword> forgotPasswords = new ArrayList<>();
        forgotPasswords.add(forgotPassword);
        user.setForgotPassword(forgotPasswords);

        // Validate the relationship
        Assertions.assertEquals(1, user.getForgotPassword().size());
        Assertions.assertTrue(user.getForgotPassword().contains(forgotPassword));
    }

    @Test
    public void testManyToManyRelationshipWithClients() {
        // Create a mock Client object
        Client client = Mockito.mock(Client.class);

        // Create a Users instance
        Users user = new Users();
        List<Client> clients = new ArrayList<>();
        clients.add(client);
        user.setClients(clients);

        // Validate the relationship
        Assertions.assertEquals(1, user.getClients().size());
        Assertions.assertTrue(user.getClients().contains(client));
    }
}
