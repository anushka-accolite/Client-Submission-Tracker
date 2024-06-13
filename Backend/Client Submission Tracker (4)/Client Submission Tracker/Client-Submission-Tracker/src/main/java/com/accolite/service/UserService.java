package com.accolite.service;

import java.util.List;

import com.accolite.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.accolite.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	
	public List<Users> getAllUsers()
	{
		System.out.println("in service class");
		return (List<Users>) userRepository.findAll();
	}
//	public User findByUsername(String username) {
//		return userRepository.findByUsername(username);
//	}
	
	public Users createUser(Users users) {
        return userRepository.save(users);
    }
	
	 public Users getUserById(Integer userId) {
	        return userRepository.findById(userId).orElse(null);
	    }
	 
	 public Users updateUser(Integer userId, Users updatedUsers) {
	        Users existingUsers = userRepository.findById(userId).orElse(null);
	        if (existingUsers != null) {
	            existingUsers.setUserName(updatedUsers.getUserName());
	            existingUsers.setEmail(updatedUsers.getEmail());
	            existingUsers.setUserRole(updatedUsers.getUserRole());
	            existingUsers.setLoginUserPassword(updatedUsers.getLoginUserPassword());
	            existingUsers.setIsDeleted(updatedUsers.getIsDeleted());
	            existingUsers.setUserId(updatedUsers.getUserId());
				existingUsers.setClients(updatedUsers.getClients());
	            return userRepository.save(existingUsers);
	        }
	        return null;
	    }
	public void saveUser(Users user) {
		userRepository.save(user);
	}
	 public void deleteUser(Integer userId)
	 {
		 userRepository.deleteById(userId);
	 }


}
