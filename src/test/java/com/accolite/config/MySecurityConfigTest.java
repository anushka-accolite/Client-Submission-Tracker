package com.accolite.config;

import com.accolite.entities.Users;
import com.accolite.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MySecurityConfigTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MySecurityConfig securityConfig;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testUserDetailsService() {
        // Mock UserRepository response
        List<Users> usersList = new ArrayList<>();
        Users user1 = new Users();
        user1.setUserName("user1");
        // Simulate password hashing with BCrypt for the test
        user1.setLoginUserPassword(new BCryptPasswordEncoder().encode("password1"));
        usersList.add(user1);

        when(userRepository.findAll()).thenReturn(usersList);

        // Call userDetailsService bean method
        UserDetailsService userDetailsService = securityConfig.userDetailsService();

        // Verify that the userDetailsService bean is not null
        assertNotNull(userDetailsService);

        // Verify that the userDetailsService returns the expected user details
        UserDetails userDetails = userDetailsService.loadUserByUsername("user1");
        assertNotNull(userDetails);
        assertEquals("user1", userDetails.getUsername());
        // Verify password using BCryptPasswordEncoder
        assertTrue(new BCryptPasswordEncoder().matches("password1", userDetails.getPassword()));
    }
    @Test
    public void testPasswordEncoder() {
        // Call passwordEncoder bean method
        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();

        // Verify that the passwordEncoder bean is not null
        assertNotNull(passwordEncoder);

        // Verify that the password encoder encodes the password correctly
        String encodedPassword = passwordEncoder.encode("password123");
        assertTrue(new BCryptPasswordEncoder().matches("password123", encodedPassword));
    }

}
