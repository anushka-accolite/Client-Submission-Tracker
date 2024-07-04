package com.accolite.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ChangePasswordTest {

    @Test
    public void testChangePasswordRecord() {
        // Create ChangePassword object
        ChangePassword changePassword = new ChangePassword("password123", "password123");

        // Verify that password and repeatPassword fields are correctly set
        assertEquals("password123", changePassword.password());
        assertEquals("password123", changePassword.repeatPassword());
    }

    @Test
    public void testChangePasswordRecord_PasswordMismatch() {
        // Create ChangePassword object with mismatched passwords
        ChangePassword changePassword = new ChangePassword("password123", "differentPassword");

        // Verify that passwords do not match
        assertNotEquals(changePassword.password(), changePassword.repeatPassword());
    }
}
