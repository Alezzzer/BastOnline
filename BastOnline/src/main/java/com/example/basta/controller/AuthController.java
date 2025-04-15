package com.example.basta.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.basta.dtos.JwtAuthResponse;
import com.example.basta.dtos.LoginDto;
import com.example.basta.dtos.RegisterDto;
import com.example.basta.dtos.UserDto;
import com.example.basta.service.AuthService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth/")
@CrossOrigin("*")
public class AuthController {

    private AuthService as;

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto regDto) {
        String response = as.register(regDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        String token = as.login(loginDto);
        UserDto user = as.getUserByEmailOrUsername(loginDto.getUsernameOrEmail());

        JwtAuthResponse jwtAR = new JwtAuthResponse();
        jwtAR.setAccessToken(token);
        jwtAR.setUser(user);

        return new ResponseEntity<>(jwtAR, HttpStatus.OK);
    }
}
