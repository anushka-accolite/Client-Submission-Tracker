package com.accolite.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.accolite.entities.Users;
import com.accolite.service.UserService;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllUsers_Success() {
        List<Users> mockUsers = new ArrayList<>(); // Create mock data
        mockUsers.add(new Users());
        mockUsers.add(new Users());

        // Mock the service method
        when(userService.getAllUsers()).thenReturn(mockUsers);

        // Call the controller method
        ResponseEntity<List<Users>> response = userController.getAllUsers();

        // Verify the service method was called
        verify(userService, times(1)).getAllUsers();

        // Check the response status code
        assertEquals(HttpStatus.OK, response.getStatusCode());
        // Check the response body
        assertEquals(mockUsers, response.getBody());
    }

    @Test
    public void testCreateUser_Success() {
        Users mockUser = new Users(); // Create mock data

        // Mock the service method
        when(userService.createUser(mockUser)).thenReturn(mockUser);

        // Call the controller method
        ResponseEntity<Users> response = userController.createUser(mockUser);

        // Verify the service method was called
        verify(userService, times(1)).createUser(mockUser);

        // Check the response status code
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        // Check the response body
        assertEquals(mockUser, response.getBody());
    }

}
