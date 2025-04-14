package com.example.basta.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.basta.dtos.OrderManagerDto;
import com.example.basta.service.ManagerService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/manager/")
public class ManagerController {
	@Autowired
	private ManagerService ms;
	  @PreAuthorize("hasAnyRole('ADMIN','USER')")
	@GetMapping("getOrder/{id}")
	public ResponseEntity<OrderManagerDto> getOrderById(@PathVariable("id") Long orderId){
		OrderManagerDto orderMDto = ms.getOrder(orderId);
		return new ResponseEntity<>(orderMDto,HttpStatus.OK);
	}
	  @PreAuthorize("hasAnyRole('ADMIN','USER')")
	@GetMapping("getOrders")
	public ResponseEntity<List<OrderManagerDto>> getOrders(){
		List<OrderManagerDto> orderMDtoList = ms.getOrders();
		return new ResponseEntity<>(orderMDtoList,HttpStatus.OK);
	}
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}/approve")
	public ResponseEntity<OrderManagerDto> approveOrder(@PathVariable("id") Long orderId){
		OrderManagerDto omd = ms.approve(orderId);
		return new ResponseEntity<>(omd,HttpStatus.OK);
	}
}
