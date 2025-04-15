package com.example.basta.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.basta.dtos.ProductDto;
import com.example.basta.dtos.UserDto;
import com.example.basta.service.impl.AdminServiceImplementation;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin/")
@AllArgsConstructor
public class AdminController {

    private AdminServiceImplementation aService;
    
    @PreAuthorize ("hasAnyRole('ADMIN','MANAGER')")
	@PostMapping(value = "/addProduct", consumes = "multipart/form-data")
	public ResponseEntity<ProductDto> addProduct(
	        @RequestPart("product") ProductDto productDto,
	        @RequestPart("image") MultipartFile imageFile) {
	    try {
	        ProductDto savedProduct = aService.addProduct(productDto, imageFile);
	        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
	    } catch (Exception e) {
	        e.printStackTrace(); // korisno za debug
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
    @PreAuthorize ("hasAnyRole('ADMIN','MANAGER')")
	@DeleteMapping("deleteProduct/{id}")
	public ResponseEntity<String> deleteProductById(@PathVariable ("id") Long productId){
		aService.deleteProduct(productId);
		return new ResponseEntity<>("Product with id: " + productId + " is successfully deleted!",HttpStatus.OK);
	}
   
	@GetMapping("getProduct/{id}")
	public ResponseEntity<ProductDto> getProductById(@PathVariable ("id") Long productId){
		ProductDto productDto = aService.getProductById(productId);
		return new ResponseEntity<>(productDto,HttpStatus.OK);
	}
    
	@GetMapping("getProducts")
	public ResponseEntity<List<ProductDto>> getAllProducts(){
		List<ProductDto> listProductDto = aService.getAllProducts();
		return new ResponseEntity<>(listProductDto,HttpStatus.OK);
	}
	 @PreAuthorize ("hasAnyRole('ADMIN','MANAGER')")
	@GetMapping("getUsers")
	public ResponseEntity<List<UserDto>> getAllUsers(){
		List<UserDto> listUsersDto = aService.getAllUsers();
		return new ResponseEntity<>(listUsersDto,HttpStatus.OK);
	}
	
	@GetMapping("getUser/{id}")
	public ResponseEntity<UserDto> getUserById(@PathVariable ("id") Long userId){
		UserDto userDto = aService.getUserById(userId);
		return new ResponseEntity<>(userDto,HttpStatus.OK);
	}
	 @PreAuthorize ("hasAnyRole('ADMIN','MANAGER')")
	@DeleteMapping("deleteUser/{id}")
	public ResponseEntity<String> deleteUserById(@PathVariable("id") Long userId){
		aService.deleteUser(userId);
		return new ResponseEntity<>("User with id: " + userId + "is successfully deleted!", HttpStatus.OK);
	}
	 @PreAuthorize ("hasAnyRole('ADMIN','MANAGER')")
	 @PutMapping(value = "/updateProduct/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	 public ResponseEntity<ProductDto> updateProduct(
	         @RequestPart("product") ProductDto productDto,
	         @RequestPart(value = "image", required = false) MultipartFile imageFile,
	         @PathVariable("id") Long productId) throws IOException {

	     ProductDto updatedProduct = aService.updateProduct(productDto, imageFile, productId);
	     return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
	 }
}


