package com.example.basta.service;

import com.example.basta.dtos.OrderDto;

public interface ManagerService {
	OrderDto createOrder(OrderDto orderDto);
}
