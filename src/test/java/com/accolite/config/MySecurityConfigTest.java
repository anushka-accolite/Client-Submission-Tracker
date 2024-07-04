//package com.accolite.config;
//
//import com.accolite.entities.Users;
//import com.accolite.repository.UserRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.when;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest
//public class MySecurityConfigTest {
//
//    @Mock
//    private UserRepository userRepository;
//
//    @InjectMocks
//    private MySecurityConfig securityConfig;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.initMocks(this);
//    }
//
//    @Test
//    public void testUserDetailsService() {
//        // Mock UserRepository response
//        List<Users> usersList = new ArrayList<>();
//        Users user1 = new Users();
//        user1.setUserName("user1");
//        user1.setLoginUserPassword("password1");
//        usersList.add(user1);
//
//        when(userRepository.findAll()).thenReturn(usersList);
//
//        // Call userDetailsService bean method
//        UserDetailsService userDetailsService = securityConfig.userDetailsService();
//
//        // Verify that the userDetailsService bean is not null
//        assertNotNull(userDetailsService);
//
//        // Verify that the userDetailsService returns the expected user details
//        UserDetails userDetails = userDetailsService.loadUserByUsername("user1");
//        assertNotNull(userDetails);
//        assertEquals("user1", userDetails.getUsername());
//        assertTrue(new BCryptPasswordEncoder().matches("password1", userDetails.getPassword()));
//    }
//
//    @Test
//    public void testPasswordEncoder() {
//        // Call passwordEncoder bean method
//        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();
//
//        // Verify that the passwordEncoder bean is not null
//        assertNotNull(passwordEncoder);
//
//        // Verify that the password encoder encodes the password correctly
//        String encodedPassword = passwordEncoder.encode("password123");
//        assertTrue(new BCryptPasswordEncoder().matches("password123", encodedPassword));
//    }
//
//}

package com.accolite.config;

import com.accolite.entities.Users;
import com.accolite.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class MySecurityConfigTest {

    @Mock
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private MySecurityConfig securityConfig;

    @Test
    public void testUserDetailsService() {
        // Mock data
        when(userRepository.findAll()).thenReturn(Arrays.asList(
                createUser("user1", "password1"),
                createUser("user2", "password2")
        ));

        // Call userDetailsService method
        UserDetailsService userDetailsService = securityConfig.userDetailsService();

        // Verify UserDetails returned by userDetailsService
        UserDetails userDetails1 = userDetailsService.loadUserByUsername("user1");
        UserDetails userDetails2 = userDetailsService.loadUserByUsername("user2");

        assertEquals("user1", userDetails1.getUsername());
        assertEquals("user2", userDetails2.getUsername());

        // Verify password encoding
        assertTrue(passwordEncoder.matches("password1", userDetails1.getPassword()));
        assertTrue(passwordEncoder.matches("password2", userDetails2.getPassword()));
    }

    private Users createUser(String username, String password) {
        Users user = new Users();
        user.setUserName(username);
        user.setLoginUserPassword(passwordEncoder.encode(password));
        return user;
    }

    @Test
    public void testPasswordEncoder() {
        String rawPassword = "testPassword";
        String encodedPassword = passwordEncoder.encode(rawPassword);

        assertTrue(passwordEncoder.matches(rawPassword, encodedPassword));
    }
}

