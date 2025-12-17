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
           
            .csrf(csrf -> csrf.disable())

            
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))

            //  AUTORIZACIÓN DE RUTAS
            .authorizeHttpRequests(auth -> auth
                // PÚBLICAS
                .requestMatchers(
                        "/h2-console/**",
                        "/auth/**",
                        "/error"
                ).permitAll()

                //   ADMIN 
                .requestMatchers(
                        "/api/perfumes/**"
                ).authenticated()

                // TODO LO DEMÁS
                .anyRequest().permitAll()
            )

            // SIN SESIÓN
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            //  AUTH PROVIDER
            .authenticationProvider(authenticationProvider)

            //  JWT FILTER
            .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
