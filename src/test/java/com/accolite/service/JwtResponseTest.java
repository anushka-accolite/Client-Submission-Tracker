package com.accolite.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class JwtResponseTest {

    @Test
    public void testJwtResponseConstructorAndGettersSetters() {
        // Given
        String jwtToken = "testJwtToken";
        String username = "testUsername";

        // When
        JwtResponse jwtResponse = new JwtResponse(jwtToken, username);

        // Then
        assertEquals(jwtToken, jwtResponse.getJwtToken());
        assertEquals(username, jwtResponse.getUsername());

        // Modify values using setters and assert again
        String newJwtToken = "newJwtToken";
        String newUsername = "newUsername";

        jwtResponse.setJwtToken(newJwtToken);
        jwtResponse.setUsername(newUsername);

        assertEquals(newJwtToken, jwtResponse.getJwtToken());
        assertEquals(newUsername, jwtResponse.getUsername());
    }

    @Test
    public void testJwtResponseBuilder() {
        // Given
        String jwtToken = "testJwtToken";
        String username = "testUsername";

        // When
        JwtResponse jwtResponse = JwtResponse.builder()
                .jwtToken(jwtToken)
                .username(username)
                .build();

        // Then
        assertEquals(jwtToken, jwtResponse.getJwtToken());
        assertEquals(username, jwtResponse.getUsername());
    }

    @Test
    public void testJwtResponseToString() {
        // Given
        String jwtToken = "testJwtToken";
        String username = "testUsername";

        // When
        JwtResponse jwtResponse = new JwtResponse(jwtToken, username);

        // Then
        assertEquals("JwtResponse(jwtToken=testJwtToken, username=testUsername)", jwtResponse.toString());
    }
}
