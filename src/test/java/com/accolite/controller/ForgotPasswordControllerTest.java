package com.accolite.controller;

import com.accolite.entities.ChangePassword;
import com.accolite.entities.ForgotPassword;
import com.accolite.entities.MailBody;
import com.accolite.entities.Users;
import com.accolite.repository.ForgotPasswordRepository;
import com.accolite.repository.UserRepository;
import com.accolite.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Date;
import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ForgotPasswordControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private ForgotPasswordRepository forgotPasswordRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @InjectMocks
    private ForgotPasswordController forgotPasswordController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testVerifyEmail_ValidEmail() {
        String email = "test@example.com";
        Users user = new Users();
        user.setEmail(email);
        when(userRepository.findByEmail(email)).thenReturn(user);

        ResponseEntity<?> response = forgotPasswordController.verifyEmail(email);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(emailService, times(1)).sendSimpleMessage(any(MailBody.class));
        verify(forgotPasswordRepository, times(1)).save(any(ForgotPassword.class));
    }

    @Test
    public void testVerifyEmail_InvalidEmail() {
        String email = "invalid@example.com";
        when(userRepository.findByEmail(email)).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> {
            forgotPasswordController.verifyEmail(email);
        });
    }



    @Test
    public void testVerifyOtp_InvalidOtp() {
        String email = "test@example.com";
        String otp = "654321";
        Users user = new Users();
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(user);
        when(forgotPasswordRepository.findByOtpandUser(otp, user)).thenReturn(null);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            forgotPasswordController.verifyOtp(otp, email);
        });

        assertEquals("Invalid OTP for email : " + email, exception.getMessage());
    }


}
