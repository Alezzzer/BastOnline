package com.example.basta.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.basta.entity.User;
import com.example.basta.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CustomUserDetails implements UserDetailsService {
	
	private UserRepository ur;
	
	@Override
	public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
		User user = ur.findByEmail(usernameOrEmail)
				.orElseThrow(() -> new UsernameNotFoundException("User doesn't exist!"));
		
		Set<GrantedAuthority> authorities = Set.of(
			    new SimpleGrantedAuthority(user.getRole().getName())
			);
		
		return new org.springframework.security.core.userdetails.User(
				usernameOrEmail, user.getPassword(), authorities);
				
				
	}

}
