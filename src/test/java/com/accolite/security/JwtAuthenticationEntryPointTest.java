package com.accolite.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import java.io.IOException;
import java.io.PrintWriter;
import static org.junit.jupiter.api.Assertions.assertEquals;

class JwtAuthenticationEntryPointTest {

    private JwtAuthenticationEntryPoint entryPoint;
    private MockHttpServletRequest request;
    private MockHttpServletResponse response;
    private AuthenticationException authException;

    @BeforeEach
    void setUp() {
        entryPoint = new JwtAuthenticationEntryPoint();
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
        authException = new AuthenticationException("Unauthorized") {}; // Mock AuthenticationException
    }

    @Test
    void testCommence() throws IOException, ServletException {
        // Invoke the commence method
        entryPoint.commence(request, response, authException);

        // Verify the response status code
        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus());

        // Verify the response content
        String expectedMessage = "Access Denied !! Unauthorized";
        String actualMessage = response.getContentAsString().trim(); // Trim any leading/trailing whitespace
        assertEquals(expectedMessage, actualMessage);
    }
}
