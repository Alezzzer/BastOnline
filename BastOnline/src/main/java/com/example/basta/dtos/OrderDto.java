package com.example.basta.dtos;

import java.util.Date;
import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private Boolean approved;
    private double finalPrice;
    private Date orderDate;
    private List<OrderItemDto> items;
    private String userName;
    private String userAddress;
    private String userPhone;
    private String userCity;
}
