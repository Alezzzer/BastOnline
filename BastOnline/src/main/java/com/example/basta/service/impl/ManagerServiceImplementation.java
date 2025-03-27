package com.example.basta.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.basta.dtos.OrderDto;
import com.example.basta.dtos.OrderManagerDto;
import com.example.basta.dtos.UserDto;
import com.example.basta.entity.Order;
import com.example.basta.exception.ResourceNotFoundException;
import com.example.basta.repository.OrderRepository;
import com.example.basta.service.ManagerService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ManagerServiceImplementation implements ManagerService {
	private OrderRepository or;
	private ModelMapper modelMapper;

	@Override
	public OrderManagerDto getOrder(Long id) {
		Order order = or.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("An order with id: " + id + "is not found!"));
		OrderManagerDto omd = new OrderManagerDto();
		UserDto userDto = modelMapper.map(order.getUser(), UserDto.class);
		omd.setOrderDate(order.getOrderDate());
		omd.setFinalPrice(order.getFinalPrice());
		omd.setProducts(order.getProducts());
		omd.setUserAddress(userDto.getAddress());
		omd.setUserEmail(userDto.getEmail());
		omd.setUserPhone(userDto.getPhone());
		omd.setUserName(userDto.getName());
		omd.setApproved(order.getApproved());
		return omd;
	}

	@Override
	public List<OrderManagerDto> getOrders() {
		List<Order> orders = or.findAll();
//		List<OrderDto> ordersDto = new ArrayList<>();
//		for(Order o : orders) {
		// ordersDto.add(modelMapper.map(o, OrderDto.class));
		// }

		List<OrderManagerDto> omds = new ArrayList<>();
		for (Order o : orders) {
			OrderManagerDto omd = new OrderManagerDto();
			UserDto userDto = modelMapper.map(o.getUser(), UserDto.class);
			omd.setOrderDate(o.getOrderDate());
			omd.setFinalPrice(o.getFinalPrice());
			omd.setProducts(o.getProducts());
			omd.setUserAddress(userDto.getAddress());
			omd.setUserEmail(userDto.getEmail());
			omd.setUserPhone(userDto.getPhone());
			omd.setUserName(userDto.getName());
			omd.setApproved(o.getApproved());
			omds.add(omd);
		}
		return omds;
	}

	@Override
	public OrderManagerDto approve(Long id) {
		Order o = or.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("An order with id: " + id + "is not found!"));
		o.setApproved(true);
		Order order = or.save(o);
		OrderManagerDto omd = new OrderManagerDto();
		UserDto userDto = modelMapper.map(order.getUser(), UserDto.class);
		omd.setOrderDate(order.getOrderDate());
		omd.setFinalPrice(order.getFinalPrice());
		omd.setProducts(order.getProducts());
		omd.setUserAddress(userDto.getAddress());
		omd.setUserEmail(userDto.getEmail());
		omd.setUserPhone(userDto.getPhone());
		omd.setUserName(userDto.getName());
		omd.setApproved(order.getApproved());

		return omd;
	}

}
