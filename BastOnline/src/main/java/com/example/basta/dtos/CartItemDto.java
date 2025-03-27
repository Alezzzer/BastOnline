package com.example.basta.dtos;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor

public class CartItemDto {
	 private Long productId;
	    private String productName;
	    private double quantity;
	    private double price;

	    public CartItemDto(Long productId, String productName, double quantity, double price) {
	        this.productId = productId;
	        this.productName = productName;
	        this.quantity = quantity;
	        this.price = price;
	    }
}
