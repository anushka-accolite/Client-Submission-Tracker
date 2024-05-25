package com.accolite.config;
import com.accolite.service.JwtRequest;
import com.accolite.service.JwtResponse;
import com.accolite.security.JwtHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    private Logger logger= LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getUsername(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }


    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

}


//package com.accolite.controller;
//import com.accolite.service.JwtRequest;
//import com.accolite.service.JwtResponse;
//import com.accolite.security.JwtHelper;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiImplicitParam;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.web.bind.annotation.*;
//@RestController
//@RequestMapping("/auth")
//@Api(tags = "Authentication Controller", description = "Operations for authentication")
//public class AuthController {
//    @Autowired
//    private UserDetailsService userDetailsService;
//    @Autowired
//    private AuthenticationManager manager;
//    @Autowired
//    private JwtHelper helper;
//    private Logger logger= LoggerFactory.getLogger(AuthController.class);
//    @PostMapping("/login")
//    @ApiImplicitParam(name = "Authorization", value = "Bearer token", paramType = "header", required = true, example = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W10sInN1YiI6ImNoaXJhZzEwMSIsImlhdCI6MTcxNjM1MzI2NywiZXhwIjoxNzE2MzcxMjY3fQ.lwiR7OuLVFrMgT75OrA47_dudZGcwGTZ5Egd8TCH5L7-A1jDT2zgCO2uCZCaIKMseDpSHfBXSPCbADh-eZHpOQ")
//    public ResponseEntity<JwtResponse> login(@RequestHeader("Authorization") String authorizationHeader,@RequestBody JwtRequest request) {
//        this.doAuthenticate(request.getUsername(), request.getPassword());
//        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
//        String token = this.helper.generateToken(userDetails);
//        JwtResponse response = JwtResponse.builder()
//                .jwtToken(token)
//                .username(userDetails.getUsername()).build();
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//    private void doAuthenticate(String email, String password) {
//        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
//        try {
//            manager.authenticate(authentication);
//        } catch (BadCredentialsException e) {
//            throw new BadCredentialsException(" Invalid Username or Password  !!");
//        }
//    }
//    @ExceptionHandler(BadCredentialsException.class)
//    public String exceptionHandler() {
//        return "Credentials Invalid !!";
//    }
//}