package com.accolite.config;

import com.accolite.entities.Users;
import com.accolite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class MySecurityConfig {

    @Autowired
    private UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        List<Users> loginDetailsList = (List<Users>) userRepository.findAll();
        List<UserDetails> users = new ArrayList<>();
        for (Users userEntity : loginDetailsList) {
            UserDetails user = User.builder()
                    .username(userEntity.getUserName())
                    .password(passwordEncoder().encode(userEntity.getLoginUserPassword())) // Ensure password encoding// Assuming you have a method to get roles
                    .build();
            users.add(user);
        }

        return new InMemoryUserDetailsManager(users.toArray(new UserDetails[0]));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
}
