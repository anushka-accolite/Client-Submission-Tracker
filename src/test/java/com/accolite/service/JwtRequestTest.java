package com.accolite.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class JwtRequestTest {

    @Test
    public void testJwtRequestConstructorAndGettersSetters() {
        // Given
        String username = "testuser";
        String password = "testpassword";

        // When
        JwtRequest jwtRequest = new JwtRequest(username, password);

        // Then
        assertEquals(username, jwtRequest.getUsername());
        assertEquals(password, jwtRequest.getPassword());

        // Modify values using setters and assert again
        String newUsername = "newuser";
        String newPassword = "newpassword";

        jwtRequest.setUsername(newUsername);
        jwtRequest.setPassword(newPassword);

        assertEquals(newUsername, jwtRequest.getUsername());
        assertEquals(newPassword, jwtRequest.getPassword());
    }

    @Test
    public void testJwtRequestBuilder() {
        // Given
        String username = "testuser";
        String password = "testpassword";

        // When
        JwtRequest jwtRequest = JwtRequest.builder()
                .username(username)
                .password(password)
                .build();

        // Then
        assertEquals(username, jwtRequest.getUsername());
        assertEquals(password, jwtRequest.getPassword());
    }

    @Test
    public void testJwtRequestToString() {
        // Given
        String username = "testuser";
        String password = "testpassword";

        // When
        JwtRequest jwtRequest = new JwtRequest(username, password);

        // Then
        assertEquals("JwtRequest(username=testuser, password=testpassword)", jwtRequest.toString());
    }
}
