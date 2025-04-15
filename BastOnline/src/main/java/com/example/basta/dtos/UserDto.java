package com.example.basta.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	private Long id;
	private String name;
	private String password;
	private String email;
	private String address;
	private String city;
	private String phone;
	private String role;
}
