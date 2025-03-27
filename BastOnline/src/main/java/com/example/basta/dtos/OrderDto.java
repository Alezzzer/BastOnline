package com.example.basta.dtos;

import java.util.Date;
import java.util.List;

import com.example.basta.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
	 	private Long id;
	    private Boolean approved;
	    private double finalPrice;
	    private Date orderDate;
	    private List<Product> products;
}
