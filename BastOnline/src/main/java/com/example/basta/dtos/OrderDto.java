package com.example.basta.dtos;

import java.util.Date;

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
}
