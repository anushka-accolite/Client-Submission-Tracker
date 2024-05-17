package com.accolite.controller;

import java.util.List;

import com.accolite.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accolite.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userService.getAllUsers();
        System.out.println(users.size());
        if (users.isEmpty()) {
            System.out.println("in if condition");

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        System.out.println("Before return");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
	
	@PostMapping
    public ResponseEntity<Users> createUser(@RequestBody Users users) {
        Users createdUsers = userService.createUser(users);
        return new ResponseEntity<>(createdUsers, HttpStatus.CREATED);
    }
	
	@GetMapping("/{userId}")
    public ResponseEntity<Users> getUserById(@PathVariable Integer userId) {
        Users users = userService.getUserById(userId);
        if (users != null) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	@PutMapping("/{userId}")
    public ResponseEntity<Users> updateUser(@PathVariable Integer userId, @RequestBody Users updatedUsers) {
        Users users = userService.updateUser(userId, updatedUsers);
        if (users != null) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable Integer userId)
	{
		userService.deleteUser(userId);
	}


	


}
