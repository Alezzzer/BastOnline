package com.example.basta.service;

import java.util.List;

import com.example.basta.dtos.CartDto;
import com.example.basta.dtos.OrderDto;
import com.example.basta.dtos.ProductDto;
import com.example.basta.dtos.UserDto;

public interface UserService {
	
	UserDto myProfile (Long id);
	
	UserDto updateProfile (UserDto userDto, Long id);
	
	List<ProductDto> vegetables();
	
	List<ProductDto> fruits();
	
	CartDto getCartByUser(Long userId);
	
	CartDto removeProductFromCart(Long userId, Long productId);
	
	CartDto addProductToCart(Long userId, Long productId, double quantity);
	
	OrderDto createOrderFromCart(Long userId);
	
	OrderDto getOrderDetails(Long orderId);
	
	List<OrderDto> orders(Long userId);

	
	

}
