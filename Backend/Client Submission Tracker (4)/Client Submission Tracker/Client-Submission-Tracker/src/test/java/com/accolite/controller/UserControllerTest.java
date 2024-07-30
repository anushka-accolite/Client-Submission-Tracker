package com.accolite.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.accolite.entities.Users;
import com.accolite.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Test
    public void testGetAllUsers() {
        List<Users> usersList = new ArrayList<>();
        // Add some dummy users to the list
        usersList.add(new Users());
        when(userService.getAllUsers()).thenReturn(usersList);
        ResponseEntity<List<Users>> responseEntity = userController.getAllUsers();
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(usersList, responseEntity.getBody());
    }



    @Test
    public void testGetUserById() {
        Users user = new Users();
        user.setUserId(1);
        user.setUserName("TestUser");
        when(userService.getUserById(1)).thenReturn(user);
        ResponseEntity<Users> responseEntity = userController.getUserById(1);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(user, responseEntity.getBody());
    }

    @Test
    public void testUpdateUser() {
        Users user = new Users();
        user.setUserId(1);
        user.setUserName("TestUser");
        when(userService.updateUser(1, user)).thenReturn(user);
        ResponseEntity<Users> responseEntity = userController.updateUser(1, user);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(user, responseEntity.getBody());
    }

    @Test
    public void testDeleteUser() {
        doNothing().when(userService).deleteUser(1);
        userController.deleteUser(1);
        verify(userService, times(1)).deleteUser(1);
    }

    // Similarly, you can write tests for other methods like createUser, getUserById, updateUser, and deleteUser
}