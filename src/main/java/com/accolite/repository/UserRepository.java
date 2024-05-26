package com.accolite.repository;

import com.accolite.entities.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<Users,Integer> {
//    User findByUsername(String username);

}