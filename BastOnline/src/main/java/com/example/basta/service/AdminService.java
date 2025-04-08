package com.example.basta.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.basta.dtos.ProductDto;
import com.example.basta.dtos.UserDto;

public interface AdminService {
	ProductDto addProduct(ProductDto productDto, MultipartFile imageFile) throws IOException;
	List<ProductDto> getAllProducts();
	void deleteProduct(Long id);
	ProductDto getProductById(Long id);
	List<UserDto> getAllUsers();
	UserDto getUserById(Long id);
	void deleteUser(Long id);
	ProductDto updateProduct(ProductDto productDto, Long id);
}
