package com.example.basta.dtos;

import com.example.basta.entity.FruitVegetable;

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
	private FruitVegetable fruitVegetable;
}
