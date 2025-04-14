package com.example.basta.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.basta.dtos.LoginDto;
import com.example.basta.dtos.RegisterDto;
import com.example.basta.entity.Role;
import com.example.basta.entity.User;
import com.example.basta.exception.BastAPIException;
import com.example.basta.repository.RoleRepository;
import com.example.basta.repository.UserRepository;
import com.example.basta.service.AuthService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService{
	
	private UserRepository ur;
	private RoleRepository rr;
	private PasswordEncoder pe;
	private AuthenticationManager am;
	
	@Override
	public String register(RegisterDto reg) {
		if (ur.existsByEmail(reg.getEmail())) {
			throw new BastAPIException(HttpStatus.BAD_REQUEST, "User with this email "
					+ "credential already exists. ");
		}
		
		User user = new User();
		user.setName(reg.getName());
		user.setEmail(reg.getEmail());
		user.setPassword(pe.encode(reg.getPassword()));
		user.setAddress(reg.getAddress());
		user.setPhone(reg.getPhone());
		user.setCity(reg.getCity());
	
		
		 Role defaultRole = rr.findById(2L)
			        .orElseThrow(() -> new RuntimeException("Default role not found"));

			    user.setRoles(Set.of(defaultRole));

			    ur.save(user);
//		Set<Role> roles = new HashSet<>();
//		Role userRole = rr.findByName("USER");
//		roles.add(userRole);
//		user.setRoles(roles);
//		
//		ur.save(user);
		return "Successfully registration!";
		
	}

	@Override
	public String login(LoginDto log) {
		Authentication authentication = 
				am.authenticate(
				new UsernamePasswordAuthenticationToken
				(log.getUsernameOrEmail(),
						log.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		return "Login successfully";
	}

}
