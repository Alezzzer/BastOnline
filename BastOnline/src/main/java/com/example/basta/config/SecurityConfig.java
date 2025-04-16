package com.example.basta.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.basta.entity.Role;
import com.example.basta.repository.RoleRepository;
import com.example.basta.security.JwtAuthenticationEntryPoint;
import com.example.basta.security.JwtAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {
	
	private UserDetailsService userDetailsService;
	private JwtAuthenticationEntryPoint authEntryPoint;
	private JwtAuthenticationFilter authFilter;
	@Bean
	public  PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf().disable()
		.cors()
		.and()
		.authorizeHttpRequests((authorize) ->{
			authorize.requestMatchers("/api/auth/**").permitAll();
			 authorize.requestMatchers("/api/admin/getProducts").permitAll();
			 authorize.requestMatchers("/images/**").permitAll();
			 authorize.requestMatchers("/api/admin/getProduct/**").permitAll();
			 authorize.requestMatchers("/api/admin/getUser/**").permitAll();
			 authorize.requestMatchers("/api/farm/**").permitAll();		
			 authorize.anyRequest().authenticated();
		}).httpBasic(Customizer.withDefaults() );
		
		http.exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPoint));
		http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
	
	@Bean
	public AuthenticationManager am(AuthenticationConfiguration configuration) throws Exception{
		return configuration.getAuthenticationManager();
	}
	
	@Bean
	public CommandLineRunner loadDefaultRoles(RoleRepository roleRepository) {
	    return args -> {
	        if (roleRepository.findAll().isEmpty()) {
	            roleRepository.save(new Role(null, "ROLE_ADMIN"));
	            roleRepository.save(new Role(null, "ROLE_USER")); 
	        }
	    };
	}

}
