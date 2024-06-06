package com.accolite.service;

import java.util.List;

import com.accolite.entities.Client;
import com.accolite.entities.Users;
import com.accolite.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.accolite.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ClientRepository clientRepository;

//	public String authenticateUser(Users user) throws UsernameNotFoundException{
//		Optional <Users> opUser=userRepository.findById(user.getUserName());
//		if(opUser.isPresent()){
//			Users dbUsr = opUser.get();
//			if(user.getLoginUserPassword().equals(dbUsr.getLoginUserPassword()))
//				return "authenticated user";
//			else
//				return "incorrect password";
//		}
//		throw new UsernameNotFoundException("no user is not found for this uername!!")
//	}

//	public Client getClientsByUserId(Integer userId) {
//		Optional<Users> userOptional = userRepository.findById(userId);
//		if (userOptional.isPresent()) {
//			Users user = userOptional.get();
//			return user.getClient(); // Assuming you have a proper association between User and Client
//		} else {
//			return Collections.emptyList();
//		}
//	}


//	public void addUserToClient(Integer userId, Integer clientId) {
//		Optional<Users> userOptional = userRepository.findById(userId);
//		Optional<Client> clientOptional = clientRepository.findById(clientId);
//
//		if (userOptional.isPresent() && clientOptional.isPresent()) {
//			Users user = userOptional.get();
//			Client client = clientOptional.get();
//			user.getClients().add(client); // Assuming there's a method to get the list of clients associated with the user
//			userRepository.save(user);
//		} else {
//			// Handle case when user or client not found
//		}
//	}


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
				existingUsers.setClients(updatedUsers.getClient());
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
