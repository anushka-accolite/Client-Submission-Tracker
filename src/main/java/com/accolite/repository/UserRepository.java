package com.accolite.repository;

import com.accolite.entities.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<Users,Integer> {
    Users findByEmail(String email);
//    User findByUsername(String username);
@Transactional
@Modifying
@Query("update Users u set u.loginUserPassword =?2 where u.email =?1")
void updateUser(String email,String password);

}
