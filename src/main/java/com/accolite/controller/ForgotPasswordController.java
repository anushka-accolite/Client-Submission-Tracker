package com.accolite.controller;


import com.accolite.entities.ChangePassword;
import com.accolite.entities.ForgotPassword;
import com.accolite.entities.MailBody;
import com.accolite.entities.Users;
import com.accolite.repository.ForgotPasswordRepository;
import com.accolite.repository.UserRepository;
import com.accolite.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.Instant;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/verifyEmail/{email}")
    public ResponseEntity<?> verifyEmail(@PathVariable String email)
    {
        Users user=userRepository.findByEmail(email);
        int otp=otpGenerator();
        if(user==null)
        {
            throw new UsernameNotFoundException("Please provide a valid email!!");
        }
        else {
            MailBody mailBody = MailBody.builder()
                    .to(email)
                    .text("This is the otp for your forgot password request : " + otp)
                    .subject("OTP for Forgot Password Request")
                    .build();
            ForgotPassword fp = ForgotPassword.builder()
                    .otp(otp)
                    .expirationTime(new Date(System.currentTimeMillis() + 5 *70 * 1000))
                    .user(user)
                    .build();
            emailService.sendSimpleMessage(mailBody);
            forgotPasswordRepository.save(fp);
            return ResponseEntity.ok(otp);
        }

    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    ResponseEntity<String> verifyOtp(@PathVariable String otp, @PathVariable String email)
    {
        Users user=userRepository.findByEmail(email);
        if(user==null)
        {
            throw new UsernameNotFoundException("Please provide a valid email!!");
        }
        else
        {
            ForgotPassword fp=forgotPasswordRepository.findByOtpandUser(otp,user);
            if(fp==null)
            {
                throw new RuntimeException("Invalid OTP for email : "+email);
            }
            else if(!fp.getExpirationTime().before(Date.from(Instant.now())))
            {
                forgotPasswordRepository.deleteById(fp.getFpid());
                return new ResponseEntity<>("OTP has expired!", HttpStatus.EXPECTATION_FAILED);
            }
            return ResponseEntity.ok("OTP Verified");
        }
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ChangePassword changePassword,@PathVariable String email)
    {
        Users user=userRepository.findByEmail(email);
        if(user==null)
        {
            throw new UsernameNotFoundException("No user found with given email!!");
        }
        else {
            if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
                return new ResponseEntity<>("Re-entered password is not same as entered password", HttpStatus.EXPECTATION_FAILED);
            }
            System.out.println(changePassword.password());
            String encodedPassword = bCryptPasswordEncoder.encode(changePassword.password());
            System.out.println(encodedPassword);
            user.setLoginUserPassword(encodedPassword);
            System.out.println(user.getLoginUserPassword());
            userRepository.save(user);
//            ForgotPassword password=forgotPasswordRepository.findByUser(user);
//            forgotPasswordRepository.deleteById(password.getFpid());
            return ResponseEntity.ok("Password has been reset successfully!!");
        }
    }
    private Integer otpGenerator()
    {
        Random random=new Random();
        return random.nextInt(100_000,999_999);
    }
}
