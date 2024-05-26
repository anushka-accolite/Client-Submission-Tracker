package com.accolite.controller;

import com.accolite.entities.Client;
import com.accolite.entities.Users;
import com.accolite.service.ClientService;
import com.accolite.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AdminControllerTest {

    @Mock
    private ClientService clientService;

    @Mock
    private UserService userService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLinkUserToClient_Success() {
        Integer clientId = 1;
        Integer userId = 1;

        Map<String, Integer> requestBody = new HashMap<>();
        requestBody.put("userId", userId);

        Client client = new Client();
        Users user = mock(Users.class); // Mocking Users class
        when(clientService.getClientById(clientId)).thenReturn(client);
        when(userService.getUserById(userId)).thenReturn(user);

        ResponseEntity<String> response = adminController.linkUserToClient(clientId, requestBody);

        verify(user).setClient(client); // Verifying the interaction with the mocked object
        verify(userService).saveUser(user);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User linked to client successfully", response.getBody());
    }


    @Test
    void testLinkUserToClient_InvalidUserId() {
        Integer clientId = 1;

        Map<String, Integer> requestBody = new HashMap<>();
        requestBody.put("userId", null);

        ResponseEntity<String> response = adminController.linkUserToClient(clientId, requestBody);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("User ID is required", response.getBody());
        verifyNoInteractions(clientService, userService);
    }

    @Test
    void testLinkUserToClient_ClientNotFound() {
        Integer clientId = 1;
        Integer userId = 1;

        Map<String, Integer> requestBody = new HashMap<>();
        requestBody.put("userId", userId);

        when(clientService.getClientById(clientId)).thenReturn(null);

        ResponseEntity<String> response = adminController.linkUserToClient(clientId, requestBody);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(userService, never()).getUserById(userId);
        verifyNoMoreInteractions(userService);
    }

    @Test
    void testLinkUserToClient_UserNotFound() {
        Integer clientId = 1;
        Integer userId = 1;

        Map<String, Integer> requestBody = new HashMap<>();
        requestBody.put("userId", userId);

        Client client = new Client();
        when(clientService.getClientById(clientId)).thenReturn(client);
        when(userService.getUserById(userId)).thenReturn(null);

        ResponseEntity<String> response = adminController.linkUserToClient(clientId, requestBody);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(userService).getUserById(userId);
        verifyNoMoreInteractions(userService);
    }
}
