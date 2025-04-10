package com.example.basta.dtos;

import java.util.Date;
import java.util.List;

import com.example.basta.entity.Product;
import com.example.basta.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderManagerDto {
	private Long id;
    private Boolean approved;
    private double finalPrice;
    private Date orderDate;
    private String userName;
    private String userEmail;
    private String userAddress;
    private String userPhone;
    private List<OrderItemDto> items;
   
}
