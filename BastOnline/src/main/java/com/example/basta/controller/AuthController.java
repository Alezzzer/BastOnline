package com.example.basta.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.basta.dtos.LoginDto;
import com.example.basta.dtos.RegisterDto;
import com.example.basta.service.AuthService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth/")
public class AuthController {
	
	private AuthService as;
	
	@PostMapping("register")
	public ResponseEntity<String> register(@RequestBody RegisterDto regDto){
		String response = as.register(regDto);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@PostMapping("login")
	public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
		String response = as.login(loginDto);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	
}
