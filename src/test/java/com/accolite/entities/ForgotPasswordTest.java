package com.accolite.entities;//package com.accolite.entities;
//
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//
//import java.sql.Date;
//
//public class ForgotPasswordTest {
//
//    @Test
//    public void testConstructorAndGetters() {
//        // Create a sample Date for expirationTime
//        Date expirationTime = Date.valueOf("2024-07-04");
//
//        // Create an instance of ForgotPassword
//        ForgotPassword forgotPassword = new ForgotPassword(1, 123456, expirationTime, null);
//
//        // Test getters
//        Assertions.assertEquals(1, forgotPassword.getFpid());
//        Assertions.assertEquals(123456, forgotPassword.getOtp());
//        Assertions.assertEquals(expirationTime, forgotPassword.getExpirationTime());
//        Assertions.assertNull(forgotPassword.getUser()); // Assuming user is null initially
//    }
//
//
//
//    @Test
//    public void testRelationshipWithUserEntity() {
//        // Mock a Users object
//        Users mockUser = Mockito.mock(Users.class);
//
//        // Create an instance of ForgotPassword with the mock User
//        Date expirationTime = Date.valueOf("2024-07-04");
//        ForgotPassword forgotPassword = new ForgotPassword(1, 123456, expirationTime, mockUser);
//
//        // Verify that the User is correctly set and retrieved
//        Assertions.assertEquals(mockUser, forgotPassword.getUser());
//    }
//}
import com.accolite.entities.ForgotPassword;
import com.accolite.entities.Users;
import org.junit.jupiter.api.Test;

import java.sql.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class ForgotPasswordTest {

    @Test
    public void testConstructorAndGetters() {
        // Test data
        Integer fpid = 1;
        Integer otp = 123456;
        Date expirationTime = new Date(System.currentTimeMillis());
        Users user = new Users();

        // Create ForgotPassword instance using constructor
        ForgotPassword forgotPassword = new ForgotPassword(fpid, otp, expirationTime, user);

        // Verify using getters
        assertEquals(fpid, forgotPassword.getFpid());
        assertEquals(otp, forgotPassword.getOtp());
        assertEquals(expirationTime, forgotPassword.getExpirationTime());
        assertEquals(user, forgotPassword.getUser());
    }

    @Test
    public void testSetters() {
        // Create an empty instance of ForgotPassword
        ForgotPassword forgotPassword = new ForgotPassword();

        // Test data
        Integer fpid = 1;
        Integer otp = 123456;
        Date expirationTime = new Date(System.currentTimeMillis());
        Users user = new Users();

        // Set values using setters
        forgotPassword.setFpid(fpid);
        forgotPassword.setOtp(otp);
        forgotPassword.setExpirationTime(expirationTime);
        forgotPassword.setUser(user);

        // Verify using getters
        assertEquals(fpid, forgotPassword.getFpid());
        assertEquals(otp, forgotPassword.getOtp());
        assertEquals(expirationTime, forgotPassword.getExpirationTime());
        assertEquals(user, forgotPassword.getUser());
    }



    @Test
    public void testForgotPasswordConstructor() {
        Integer fpid = 1;
        Integer otp = 123456;
        Date expirationTime = new Date(System.currentTimeMillis());
        Users user = new Users();

        ForgotPassword forgotPassword = new ForgotPassword(fpid, otp, expirationTime, user);

        assertNotNull(forgotPassword);
        assertEquals(fpid, forgotPassword.getFpid());
        assertEquals(otp, forgotPassword.getOtp());
        assertEquals(expirationTime, forgotPassword.getExpirationTime());
        assertEquals(user, forgotPassword.getUser());
    }

    @Test
    public void testForgotPasswordSettersAndGetters() {
        ForgotPassword forgotPassword = new ForgotPassword();

        Integer fpid = 1;
        Integer otp = 123456;
        Date expirationTime = new Date(System.currentTimeMillis());
        Users user = new Users();

        forgotPassword.setFpid(fpid);
        forgotPassword.setOtp(otp);
        forgotPassword.setExpirationTime(expirationTime);
        forgotPassword.setUser(user);

        assertEquals(fpid, forgotPassword.getFpid());
        assertEquals(otp, forgotPassword.getOtp());
        assertEquals(expirationTime, forgotPassword.getExpirationTime());
        assertEquals(user, forgotPassword.getUser());
    }

    // Add more tests as needed for other methods and edge cases

}
