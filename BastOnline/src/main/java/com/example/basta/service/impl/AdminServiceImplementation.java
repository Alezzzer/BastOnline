package com.example.basta.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.basta.dtos.ProductDto;
import com.example.basta.dtos.UserDto;
import com.example.basta.entity.Product;
import com.example.basta.entity.User;
import com.example.basta.exception.ResourceNotFoundException;
import com.example.basta.repository.ProductRepository;
import com.example.basta.repository.UserRepository;
import com.example.basta.service.AdminService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminServiceImplementation implements AdminService {

	private ProductRepository pr;
	private UserRepository ur;
	private ModelMapper modelMapper;

	@Override
	public ProductDto addProduct(ProductDto productDto) {
		Product product = modelMapper.map(productDto, Product.class);
		Product savedProduct = pr.save(product);
		ProductDto savedProductDto = modelMapper.map(savedProduct, ProductDto.class);
		return savedProductDto;
	}

	@Override
	public void deleteProduct(Long id) {
		Product product = pr.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product with id: " + id + " is not found!"));
		pr.deleteById(id);

	}

	@Override
	public ProductDto getProductById(Long id) {
		Product product = pr.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product with id: " + id + " is not found!"));
		ProductDto productDto = modelMapper.map(product, ProductDto.class);
		return productDto;
	}

	@Override
	public List<ProductDto> getAllProducts() {
		List<ProductDto> listProductDto = new ArrayList<>();
		List<Product> listProduct = pr.findAll();
		for (Product p : listProduct) {
			ProductDto pTemp = modelMapper.map(p, ProductDto.class);
			listProductDto.add(pTemp);
		}

		return listProductDto;
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> listUser = ur.findAll();
		List<UserDto> listUserDto = new ArrayList<>();
		for(User u : listUser) {
			UserDto userDto = modelMapper.map(u, UserDto.class);
			listUserDto.add(userDto);
		}
		return listUserDto;
	}

	@Override
	public UserDto getUserById(Long id) {
		User user = ur.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User with id: "+ id +" is not found!"));
		UserDto userDto = modelMapper.map(user, UserDto.class);
		return userDto;
	}

	@Override
	public void deleteUser(Long id) {
		User user = ur.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User with id: "+ id +" is not found!"));
		ur.deleteById(id);
	}
	
	

}
