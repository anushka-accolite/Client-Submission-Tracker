package com.accolite.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.ArrayList;

import static org.mockito.Mockito.*;

class JwtAuthenticationFilterTest {

    @Mock
    private JwtHelper jwtHelper;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @InjectMocks
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testDoFilterInternal_ValidToken() throws ServletException, IOException, java.io.IOException {
        String validToken = "valid-token";

        when(request.getHeader("Authorization")).thenReturn("Bearer " + validToken);
        when(jwtHelper.getUsernameFromToken(validToken)).thenReturn("testUser");
        when(jwtHelper.validateToken(validToken, null)).thenReturn(true);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(userDetailsService, times(1)).loadUserByUsername("testUser");
    }

    @Test
    void testDoFilterInternal_InvalidToken() throws ServletException, IOException, java.io.IOException {
        String invalidToken = "invalid-token";

        when(request.getHeader("Authorization")).thenReturn("Bearer " + invalidToken);
        when(jwtHelper.getUsernameFromToken(invalidToken)).thenThrow(MalformedJwtException.class);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(userDetailsService, never()).loadUserByUsername(anyString());
    }
}
