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

import com.example.basta.entity.Role;
import com.example.basta.repository.RoleRepository;

import lombok.AllArgsConstructor;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {
	
	private UserDetailsService userDetailsService;
	
	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf().disable()
		.authorizeHttpRequests((authorize) ->{
			authorize.requestMatchers("/api/auth/**").permitAll();
			authorize.anyRequest().authenticated();
		}).httpBasic(Customizer.withDefaults() );
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
	            roleRepository.save(new Role(null, "ADMIN"));
	            roleRepository.save(new Role(null, "USER")); // recimo da ovaj dobije ID = 2
	        }
	    };
	}
//	@Bean
//	public UserDetailsService userDetailsService() {
//		UserDetails admin = User.builder()
//				.username("admin")
//				.password(passwordEncoder().encode("password"))
//				.roles("ADMIN","MANAGER")
//				.build();
//		
//		UserDetails petra = User.builder()
//				.username("petra")
//				.password(passwordEncoder().encode("password"))
//				.roles("USER")
//				.build();
//		return new InMemoryUserDetailsManager(admin, petra);
//	}
}
