package com.example.basta.service;

import com.example.basta.dtos.LoginDto;
import com.example.basta.dtos.RegisterDto;

public interface AuthService {
	String register (RegisterDto reg);
	
	String login(LoginDto log);
}
