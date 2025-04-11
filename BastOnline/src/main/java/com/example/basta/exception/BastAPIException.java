package com.example.basta.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class BastAPIException extends RuntimeException{
    private HttpStatus status;
    private String message;
}
