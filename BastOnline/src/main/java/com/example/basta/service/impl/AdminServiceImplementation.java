package com.example.basta.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.basta.dtos.ProductDto;
import com.example.basta.dtos.UserDto;
import com.example.basta.entity.Product;
import com.example.basta.entity.User;
import com.example.basta.exception.ResourceNotFoundException;
import com.example.basta.repository.ProductRepository;
import com.example.basta.repository.UserRepository;
import com.example.basta.service.AdminService;

@Service
public class AdminServiceImplementation implements AdminService {

    private final ProductRepository pr;
    private final UserRepository ur;
    private final ModelMapper modelMapper;

    @Value("${product.image.directory}")
    private String imageDirectory;

    public AdminServiceImplementation(ProductRepository pr, UserRepository ur, ModelMapper modelMapper) {
        this.pr = pr;
        this.ur = ur;
        this.modelMapper = modelMapper;
    }

    @Override
    public ProductDto addProduct(ProductDto productDto, MultipartFile imageFile) throws IOException {
        Product product = modelMapper.map(productDto, Product.class);

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            File dir = new File(imageDirectory);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            File imagePath = new File(dir, imageName);
            try (FileOutputStream fos = new FileOutputStream(imagePath)) {
                fos.write(imageFile.getBytes());
            }

            product.setImagePath(imagePath.getPath());
        }

        Product savedProduct = pr.save(product);
        ProductDto savedProductDto = modelMapper.map(savedProduct, ProductDto.class);

        if (savedProduct.getImagePath() != null) {
            String imageUrl = "http://localhost:8080/images/" + new File(savedProduct.getImagePath()).getName();
            savedProductDto.setImagePath(imageUrl);
        }


        return savedProductDto;
    }
	 @Override
	    public void deleteUser(Long id) {
	        User user = ur.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + id + " is not found!"));
	        ur.deleteById(id);
	    }
	@Override
	public ProductDto updateProduct(ProductDto productDto, Long id) {
		Product product = pr.findById(id).orElseThrow(() -> 
		new ResourceNotFoundException("Product with id: " + id + "is not found!"));
		product.setName(productDto.getName());
		product.setDescription(productDto.getDescription());
		product.setCategory(productDto.getDescription());
		product.setKilograms(productDto.getKilograms());
		product.setPrice(productDto.getPrice());
		product.setImagePath(productDto.getImagePath());
		Product prod = pr.save(product);
		ProductDto updatedProduct = modelMapper.map(prod, ProductDto.class);
		return updatedProduct;
	}
	
	


    @Override
    public void deleteProduct(Long id) {
        Product product = pr.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id: " + id + " is not found!"));

        if (product.getImagePath() != null) {
            File img = new File(product.getImagePath());
            if (img.exists()) {
                img.delete();
            }
        }

        pr.deleteById(id);
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = pr.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id: " + id + " is not found!"));
        ProductDto productDto = modelMapper.map(product, ProductDto.class);

        if (product.getImagePath() != null) {
            String imageUrl = "http://localhost:8080/images/" + new File(product.getImagePath()).getName();
            productDto.setImagePath(imageUrl);
        }

        return productDto;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<ProductDto> listProductDto = new ArrayList<>();
        List<Product> listProduct = pr.findAll();

        for (Product p : listProduct) {
            ProductDto pTemp = modelMapper.map(p, ProductDto.class);
            if (p.getImagePath() != null) {
                String imageUrl = "http://localhost:8080/images/" + new File(p.getImagePath()).getName();
                pTemp.setImagePath(imageUrl);
            }
            listProductDto.add(pTemp);
        }

        return listProductDto;
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> listUser = ur.findAll();
        List<UserDto> listUserDto = new ArrayList<>();
        for (User u : listUser) {
            UserDto userDto = modelMapper.map(u, UserDto.class);
            listUserDto.add(userDto);
        }
        return listUserDto;
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = ur.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: " + id + " is not found!"));
        return modelMapper.map(user, UserDto.class);
    }

   
}
