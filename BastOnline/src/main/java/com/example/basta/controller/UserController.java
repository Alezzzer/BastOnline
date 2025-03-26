package com.example.basta.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.basta.dtos.CartDto;
import com.example.basta.dtos.ProductDto;
import com.example.basta.dtos.UserDto;
import com.example.basta.service.UserService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("api/basta")
@AllArgsConstructor
public class UserController {
	
	private UserService userService;
	
	@GetMapping("/myprofile/{id}")
    public ResponseEntity<UserDto> showProfile(@PathVariable("id") Long userId){
       UserDto user = userService.myProfile(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
	
	@PutMapping("/myprofile/update/{id}")
	public ResponseEntity<UserDto> updateProfile(@RequestBody UserDto userDto, @PathVariable("id") Long userId){
		UserDto updatedUser = userService.updateProfile(userDto, userId);
		return new ResponseEntity<>(updatedUser,HttpStatus.OK);
		
	}
	
	@GetMapping("/vegetables")
	public ResponseEntity<List<ProductDto>> allVegetables(){
		List<ProductDto> vegetables = userService.vegetables();
		return ResponseEntity.ok(vegetables);
	}
	
	@GetMapping("/fruits")
	public ResponseEntity<List<ProductDto>> allFruits(){
		List<ProductDto> fruits = userService.fruits();
		return ResponseEntity.ok(fruits);
	}
	
	 @GetMapping("/cart/{userId}")
	    public ResponseEntity<CartDto> getCart(@PathVariable Long userId) {
		 CartDto cart = userService.getCartByUser(userId);
	        return ResponseEntity.ok(cart);
	    }
	 
	 @PostMapping("/{userId}/addToCart/{productId}")
	    public ResponseEntity<CartDto> addProduct(@PathVariable Long userId, @PathVariable Long productId) {
	       CartDto cart = userService.addProductToCart(userId, productId);
		 return ResponseEntity.ok(cart);
	    }
	 
	 @DeleteMapping("/{userId}/removeFromCart/{productId}")
	    public ResponseEntity<CartDto> removeProduct(@PathVariable Long userId, @PathVariable Long productId) {
	       CartDto cart = userService.removeProductFromCart(userId, productId);
	       return ResponseEntity.ok(cart);
	    }
	 

}
