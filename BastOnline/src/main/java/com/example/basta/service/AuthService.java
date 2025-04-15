package com.example.basta.service;

import com.example.basta.dtos.LoginDto;
import com.example.basta.dtos.RegisterDto;
import com.example.basta.dtos.UserDto;

public interface AuthService {
	String register (RegisterDto reg);
	
	String login(LoginDto log);

	UserDto getUserByEmailOrUsername(String usernameOrEmail);
}
