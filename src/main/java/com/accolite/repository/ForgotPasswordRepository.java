package com.accolite.repository;


import com.accolite.entities.ForgotPassword;
import com.accolite.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword,Integer> {

    @Query("select fp from ForgotPassword fp where fp.otp =?1 and fp.user =?2")
    ForgotPassword findByOtpandUser(String otp, Users user);

    ForgotPassword findByUser(Users user);
}
