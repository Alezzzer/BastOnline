package com.example.basta.dtos;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
	private Long id;
	private String name;
	private double kilograms;
	private double price;
	private String category;
	private String description;
	 private byte[] image;
}
