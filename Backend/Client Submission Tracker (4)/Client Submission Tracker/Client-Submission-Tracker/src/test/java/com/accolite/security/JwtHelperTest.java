package com.accolite.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JwtHelperTest {

    private final JwtHelper jwtHelper = new JwtHelper();

    @Test
    void getUsernameFromToken_ValidToken_ReturnsUsername() {
        String username = "testUser";
        String token = jwtHelper.generateToken(createUserDetails(username));
        assertEquals(username, jwtHelper.getUsernameFromToken(token));
    }

    @Test
    void getExpirationDateFromToken_ValidToken_ReturnsExpirationDate() {
        String username = "testUser";
        String token = jwtHelper.generateToken(createUserDetails(username));
        assertNotNull(jwtHelper.getExpirationDateFromToken(token));
    }

    @Test
    void validateToken_ValidTokenAndUserDetails_ReturnsTrue() {
        String username = "testUser";
        String token = jwtHelper.generateToken(createUserDetails(username));
        assertTrue(jwtHelper.validateToken(token, createUserDetails(username)));
    }



    @Test
    void getRolesFromToken_ValidToken_ReturnsRoles() {
        String username = "testUser";
        List<String> roles = List.of("ROLE_ADMIN", "ROLE_USER");
        UserDetails userDetails = createUserDetails(username, roles);
        String token = jwtHelper.generateToken(userDetails);
        assertEquals(roles, jwtHelper.getRolesFromToken(token));
    }

    private UserDetails createUserDetails(String username) {
        return new User(username, "password", new ArrayList<>());
    }

    private UserDetails createUserDetails(String username, List<String> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        roles.forEach(role -> authorities.add((GrantedAuthority) () -> role));
        return new User(username, "password", authorities);
    }
}