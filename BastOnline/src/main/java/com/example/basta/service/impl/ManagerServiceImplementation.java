package com.example.basta.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.basta.dtos.OrderItemDto;
import com.example.basta.dtos.ProductDto;
import com.example.basta.dtos.OrderManagerDto;
import com.example.basta.dtos.UserDto;
import com.example.basta.entity.Order;
import com.example.basta.entity.OrderItem;
import com.example.basta.exception.ResourceNotFoundException;
import com.example.basta.repository.OrderRepository;
import com.example.basta.service.ManagerService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ManagerServiceImplementation implements ManagerService {

    private final OrderRepository orderRepo;
    private final ModelMapper modelMapper;

    @Override
    public OrderManagerDto getOrder(Long id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("An order with id: " + id + " is not found!"));

        OrderManagerDto dto = new OrderManagerDto();
        UserDto userDto = modelMapper.map(order.getUser(), UserDto.class);

        dto.setId(order.getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setFinalPrice(order.getFinalPrice());
        dto.setApproved(order.getApproved());
        dto.setUserName(userDto.getName());
        dto.setUserAddress(userDto.getAddress());
        dto.setUserEmail(userDto.getEmail());
        dto.setUserPhone(userDto.getPhone());

        List<OrderItemDto> items = order.getItems().stream().map(this::mapToOrderItemDto).collect(Collectors.toList());
        dto.setItems(items);

        return dto;
    }

    @Override
    public List<OrderManagerDto> getOrders() {
        return orderRepo.findAll().stream().map(order -> {
            OrderManagerDto dto = new OrderManagerDto();
            UserDto userDto = modelMapper.map(order.getUser(), UserDto.class);

            dto.setId(order.getId());
            dto.setOrderDate(order.getOrderDate());
            dto.setFinalPrice(order.getFinalPrice());
            dto.setApproved(order.getApproved());
            dto.setUserName(userDto.getName());
            dto.setUserAddress(userDto.getAddress());
            dto.setUserEmail(userDto.getEmail());
            dto.setUserPhone(userDto.getPhone());

            List<OrderItemDto> items = order.getItems().stream().map(this::mapToOrderItemDto).collect(Collectors.toList());
            dto.setItems(items);

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public OrderManagerDto approve(Long id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("An order with id: " + id + " is not found!"));

        order.setApproved(true);
        orderRepo.save(order);

        return getOrder(id); // reuse the logic
    }

    private OrderItemDto mapToOrderItemDto(OrderItem item) {
        OrderItemDto dto = new OrderItemDto();

        if (item.getProduct() != null) {
            ProductDto productDto = modelMapper.map(item.getProduct(), ProductDto.class);
            dto.setProduct(productDto);
        }

        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());

        return dto;
    }
}
