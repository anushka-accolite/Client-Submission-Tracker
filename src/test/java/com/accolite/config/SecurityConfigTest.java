//package com.accolite.config;
//
//import com.accolite.security.JwtAuthenticationEntryPoint;
//import com.accolite.security.JwtAuthenticationFilter;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class SecurityConfigTest {
//
//    @Mock
//    private JwtAuthenticationEntryPoint point;
//
//    @Mock
//    private JwtAuthenticationFilter filter;
//
//    @InjectMocks
//    private SecurityConfig securityConfig;
//
//    @Test
//    public void testSecurityFilterChainConfiguration() throws Exception {
//        // Mock HttpSecurity
//        HttpSecurity http = mock(HttpSecurity.class);
//
//        // Mock behavior for CSRF disabling
//        when(http.csrf()).thenReturn(mock(HttpSecurity.CsrfConfigurer.class));
//        when(http.csrf().disable()).thenReturn(http);
//
//        // Mock behavior for authorization rules
//        when(http.authorizeRequests()).thenReturn(mock(HttpSecurity.AuthorizeRequests.class));
//        when(http.authorizeRequests()
//                .requestMatchers("/auth/login", "/api/user", "/forgotPassword/**").permitAll())
//                .thenReturn(mock(HttpSecurity.RequestMatcherConfigurer.class));
//        when(http.authorizeRequests()
//                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**", "/webjars/**").permitAll())
//                .thenReturn(mock(HttpSecurity.RequestMatcherConfigurer.class));
//        when(http.authorizeRequests()
//                .requestMatchers("/test").authenticated())
//                .thenReturn(mock(HttpSecurity.RequestMatcherConfigurer.class));
//        when(http.authorizeRequests().anyRequest().authenticated())
//                .thenReturn(mock(HttpSecurity.RequestMatcherConfigurer.class));
//
//        // Mock behavior for exception handling
//        when(http.exceptionHandling()).thenReturn(mock(HttpSecurity.ExceptionHandlingConfigurer.class));
//        when(http.exceptionHandling().authenticationEntryPoint(any())).thenReturn(http);
//
//        // Mock behavior for session management
//        when(http.sessionManagement()).thenReturn(mock(HttpSecurity.SessionManagementConfigurer.class));
//        when(http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .thenReturn(http);
//
//        // Mock behavior for adding filter before UsernamePasswordAuthenticationFilter
//        when(http.addFilterBefore(any(), any())).thenReturn(http);
//
//        // Call the method under test
//        SecurityFilterChain securityFilterChain = securityConfig.securityFilterChain(http);
//
//        // Verify interactions and configurations
//        verify(http).csrf();
//        verify(http.csrf()).disable();
//
//        verify(http.authorizeRequests()).requestMatchers("/auth/login", "/api/user", "/forgotPassword/**").permitAll();
//        verify(http.authorizeRequests()).requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**", "/webjars/**").permitAll();
//        verify(http.authorizeRequests()).requestMatchers("/test").authenticated();
//        verify(http.authorizeRequests()).anyRequest().authenticated();
//
//        verify(http.exceptionHandling()).authenticationEntryPoint(point);
//
//        verify(http.sessionManagement()).sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//        verify(http).addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
//    }
//}
