package com.example.basta.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.basta.dtos.CartDto;
import com.example.basta.dtos.ProductDto;
import com.example.basta.dtos.UserDto;
import com.example.basta.entity.Cart;
import com.example.basta.entity.FruitVegetable;
import com.example.basta.entity.Product;
import com.example.basta.entity.User;
import com.example.basta.exception.ResourceNotFoundException;
import com.example.basta.repository.CartRepository;
import com.example.basta.repository.ProductRepository;
import com.example.basta.repository.UserRepository;
import com.example.basta.service.UserService;

import lombok.AllArgsConstructor;


@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
	
	private UserRepository userRepo;
	private ProductRepository productRepo;
	private CartRepository cartRepo;
	private ModelMapper modelMapper;

	@Override
	public UserDto myProfile(Long id) {
		
		User user = userRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("User doesn't exist"));
		return modelMapper.map(user, UserDto.class);
	}

	@Override
	public UserDto updateProfile(UserDto userDto, Long id) {
		
		User user = userRepo.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("User doesn't exist"));
		
		user.setAddress(userDto.getAddress());
		user.setEmail(userDto.getEmail());
		user.setName(userDto.getName());
		user.setPassword(userDto.getPassword());
		user.setPhone(userDto.getPhone());
		user.setUsername(userDto.getUsername());
		
		User updatedUser = userRepo.save(user);
		
		return modelMapper.map(updatedUser, UserDto.class);
	}

	@Override
	public List<ProductDto> vegetables() {
		
		List<Product> products = productRepo.findByFruitVegetable(FruitVegetable.VEGETABLE);
		return products.stream().map((product)->modelMapper.map(product, ProductDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<ProductDto> fruits() {
		
		List<Product> products = productRepo.findByFruitVegetable(FruitVegetable.FRUIT);
		return products.stream().map((product)->modelMapper.map(product, ProductDto.class))
				.collect(Collectors.toList());
	}
	
	
	@Override
	 public CartDto getCartByUser(Long userId) {
	        User user = userRepo.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        Cart cart = cartRepo.findByUser(user)
	                .orElseGet(() -> {
	                    Cart newCart = new Cart();
	                    newCart.setUser(user);
	                    return cartRepo.save(newCart);
	                });

	        return convertToDto(cart);
	    }
	@Override
	    public CartDto addProductToCart(Long userId, Long productId) {
	        Cart cart = getOrCreateCart(userId);
	        Product product = productRepo.findById(productId)
	                .orElseThrow(() -> new RuntimeException("Product not found"));

	        List<Product> products = cart.getProducts();
	        products.add(product);
	        cart.setProducts(products);

	        Cart updatedCart = cartRepo.save(cart);
	        return convertToDto(updatedCart);
	    }
	
	
	@Override
	    public CartDto removeProductFromCart(Long userId, Long productId) {
	        Cart cart = getOrCreateCart(userId);
	        List<Product> products = cart.getProducts();
	        products.removeIf(product -> product.getId().equals(productId));
	        cart.setProducts(products);

	        Cart updatedCart = cartRepo.save(cart);
	        return convertToDto(updatedCart);
	    }
	
	private Cart getOrCreateCart(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartRepo.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepo.save(newCart);
                });
    }

	    private CartDto convertToDto(Cart cart) {
	        CartDto cartDto = modelMapper.map(cart, CartDto.class);
	        cartDto.setUserId(cart.getUser().getId());
	        cartDto.setProducts(cart.getProducts().stream()
	                .map(product -> modelMapper.map(product, ProductDto.class))
	                .collect(Collectors.toList()));
	        return cartDto;
	    }

}
