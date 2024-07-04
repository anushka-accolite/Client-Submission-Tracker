package com.accolite.controller;

import com.accolite.entities.Client;
import com.accolite.entities.Users;
import com.accolite.repository.ClientRepository;
import com.accolite.service.ClientService;
import com.accolite.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


class AdminControllerTest {

    @Mock
    private ClientService clientService;

    @Mock
    private UserService userService;


    private ClientRepository clientRepository;

    @InjectMocks
    private AdminController adminController;

    private Client testClient;

    @BeforeEach
    void setUp() {
        testClient = new Client();
        testClient.setClientId(1);
        testClient.setClientName("Test Client");
        adminController = new AdminController();

        MockitoAnnotations.openMocks(this);
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
