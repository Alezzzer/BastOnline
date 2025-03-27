package com.example.basta.service;

import java.util.List;

import com.example.basta.dtos.ProductDto;
import com.example.basta.dtos.UserDto;

public interface AdminService {
	ProductDto addProduct(ProductDto productDto);
	List<ProductDto> getAllProducts();
	void deleteProduct(Long id);
	ProductDto getProductById(Long id);
	List<UserDto> getAllUsers();
	UserDto getUserById(Long id);
	void deleteUser(Long id);
}
