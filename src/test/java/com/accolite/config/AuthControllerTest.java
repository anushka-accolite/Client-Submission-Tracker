package com.accolite.config;

import com.accolite.config.AuthController;
import com.accolite.security.JwtHelper;
import com.accolite.service.JwtRequest;
import com.accolite.service.JwtResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtHelper jwtHelper;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @InjectMocks
    private AuthController authController;

    @Test
    public void testLogin_Success() {
        // Mocking request
        JwtRequest request = new JwtRequest();
        request.setUsername("testuser");
        request.setPassword("password");

        // Mocking user details with roles
        UserDetails userDetails = new User(
                "testuser", // username
                "hashedPassword", // password
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")) // authorities
        );
        when(userDetailsService.loadUserByUsername("testuser")).thenReturn(userDetails);

        // Mocking password encoder
        when(bCryptPasswordEncoder.matches("password", "hashedPassword")).thenReturn(true);

        // Mocking JWT token generation
        when(jwtHelper.generateToken(userDetails)).thenReturn("mockedJWTToken");

        // Performing the test
        ResponseEntity<JwtResponse> responseEntity = authController.login(request);

        // Assertions
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals("mockedJWTToken", responseEntity.getBody().getJwtToken());
        assertEquals("testuser", responseEntity.getBody().getUsername());
    }
}
