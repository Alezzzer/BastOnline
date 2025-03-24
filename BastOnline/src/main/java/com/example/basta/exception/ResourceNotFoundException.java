package com.example.basta.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

	/**
	* 
	*/
	private static final long serialVersionUID = 8306489744591002911L;

	public ResourceNotFoundException(String message) {
		super(message);
	}

}
