package com.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/index.html", "/login.html", "/register.html", "/dashboard.html", "/style.css", "/script.js", "/register.js", "/login.js", "/registerModal", "/api/auth/register", "/api/auth/login", "/api/auth/user/me", "/favicon.ico", "/static/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.disable()) // Désactive la page de login par défaut
            .httpBasic(httpBasic -> httpBasic.disable()); // Désactive l'authentification HTTP Basic

        return http.build();
    }
} 