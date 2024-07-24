package com.accolite.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.accolite.entities.Users;
import com.accolite.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllUsers() {
        List<Users> usersList = new ArrayList<>();
        usersList.add(new Users());
        usersList.add(new Users());

        when(userRepository.findAll()).thenReturn(usersList);

        List<Users> result = userService.getAllUsers();

        assertEquals(usersList.size(), result.size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    public void testCreateUser() {
        Users user = new Users();
        user.setUserId(1);

        when(userRepository.save(user)).thenReturn(user);

        Users result = userService.createUser(user);

        assertEquals(user, result);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testGetUserById() {
        Users user = new Users();
        user.setUserId(1);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Users result = userService.getUserById(1);

        assertEquals(user, result);
        verify(userRepository, times(1)).findById(1);
    }

    @Test
    public void testUpdateUser() {
        Users existingUser = new Users();
        existingUser.setUserId(1);
        existingUser.setUserName("Anushka");

        Users updatedUser = new Users();
        updatedUser.setUserId(1);
        updatedUser.setUserName("Mounika");

        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(existingUser)).thenReturn(updatedUser);

        Users result = userService.updateUser(1, updatedUser);

        assertEquals(updatedUser, result);
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(existingUser);
    }

    @Test
    public void testSaveUser() {
        Users user = new Users();
        user.setUserId(1);

        userService.saveUser(user);

        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testDeleteUser() {
        Integer userId = 1;

        userService.deleteUser(userId);

        verify(userRepository, times(1)).deleteById(userId);
    }

}