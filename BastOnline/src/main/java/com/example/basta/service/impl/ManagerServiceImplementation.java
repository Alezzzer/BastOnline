package com.example.basta.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.basta.dtos.OrderDto;
import com.example.basta.entity.Order;
import com.example.basta.repository.OrderRepository;
import com.example.basta.service.ManagerService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ManagerServiceImplementation implements ManagerService{
	private OrderRepository or;
	private ModelMapper modelMapper;
	@Override
	public OrderDto createOrder(OrderDto orderDto) {
		Order orderToSave = modelMapper.map(orderDto, Order.class);
		Order orderSaved = or.save(orderToSave);
		return modelMapper.map(orderSaved, OrderDto.class);
	}
	
}
