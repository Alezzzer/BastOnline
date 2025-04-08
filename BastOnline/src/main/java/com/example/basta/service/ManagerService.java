package com.example.basta.service;

import java.util.List;

import com.example.basta.dtos.OrderManagerDto;
import com.example.basta.dtos.ProductDto;

public interface ManagerService {
	OrderManagerDto getOrder(Long id);
	List<OrderManagerDto> getOrders();
	OrderManagerDto approve(Long id);
	
}
