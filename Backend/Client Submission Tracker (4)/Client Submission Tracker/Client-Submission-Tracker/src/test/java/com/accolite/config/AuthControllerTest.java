package com.accolite.config;

import com.accolite.helper.Helper;
import com.accolite.service.JwtRequest;
import com.accolite.service.JwtResponse;
import com.accolite.security.JwtHelper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private AuthenticationManager manager;

    @Mock
    private JwtHelper helper;

    @InjectMocks
    private AuthController authController;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder; // Mock this dependency

    @Test
    void testLogin_Successful() {
        // Given
        String username = "testUser";
        String password = "testPassword";
        JwtRequest request = new JwtRequest(username, password);
        Collection<? extends GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
        UserDetails userDetails = new User(username, password, authorities);
        String token = "testToken";

        // Mock behavior
        when(userDetailsService.loadUserByUsername(username)).thenReturn(userDetails);
        when(helper.generateToken(userDetails)).thenReturn(token);
        when(bCryptPasswordEncoder.matches(password, userDetails.getPassword())).thenReturn(true); // Mock password match

        // When
        ResponseEntity<JwtResponse> responseEntity = authController.login(request);

        // Then
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(token, responseEntity.getBody().getJwtToken());
        assertEquals(username, responseEntity.getBody().getUsername());
    }



    @Test
    void testExceptionHandler() {
        // When
        String result = authController.exceptionHandler();

        // Then
        assertEquals("Credentials Invalid !!", result);
    }
}