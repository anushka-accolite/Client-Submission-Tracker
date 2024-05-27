package com.accolite.entities;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UsersTest {

    @Test
    public void testGetterAndSetter() {
        Users user = new Users();

        // Set values
        user.setUserId(1);
        user.setUserName("Anushka");
        user.setUserRole(UserRole.TalentAcquistion);
        user.setEmail("anushka@gmail.com.com");
        user.setLoginUserPassword("password123");
        user.setIsDeleted(false);

        // Check values
        assertEquals(1, user.getUserId());
        assertEquals("Anushka", user.getUserName());
        assertEquals(UserRole.TalentAcquistion, user.getUserRole());
        assertEquals("anushka@gmail.com", user.getEmail());
        assertEquals("password123", user.getLoginUserPassword());
        assertFalse(user.getIsDeleted());

        // Update values
        user.setUserName("Mounika");
        user.setEmail("mouika@gmail.com");
        user.setIsDeleted(true);

        // Check updated values
        assertEquals("Mounika", user.getUserName());
        assertEquals("mouika@gmail.com", user.getEmail());
        assertTrue(user.getIsDeleted());
    }
}
