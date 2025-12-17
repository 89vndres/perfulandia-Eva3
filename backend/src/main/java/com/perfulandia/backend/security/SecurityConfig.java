package com.perfulandia.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfig(
            JwtTokenFilter jwtTokenFilter,
            AuthenticationProvider authenticationProvider
    ) {
        this.jwtTokenFilter = jwtTokenFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // ❌ CSRF OFF (OBLIGATORIO PARA H2)
            .csrf(csrf -> csrf.disable())

            // ❌ BLOQUEO DE FRAMES OFF (H2 usa iframe)
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))

            // 🔓 AUTORIZACIONES
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                        "/h2-console/**",
                        "/auth/**",
                        "/error"
                ).permitAll()
                .anyRequest().authenticated()
            )

            // 🔐 JWT → STATELESS
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // 🔐 AUTH PROVIDER
            .authenticationProvider(authenticationProvider)

            // 🔐 JWT FILTER
            .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
