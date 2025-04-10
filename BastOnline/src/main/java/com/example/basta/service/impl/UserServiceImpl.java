package com.example.basta.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.basta.dtos.CartDto;
import com.example.basta.dtos.OrderDto;
import com.example.basta.dtos.OrderItemDto;
import com.example.basta.dtos.UserDto;
import com.example.basta.entity.Cart;
import com.example.basta.entity.CartItem;
import com.example.basta.entity.Order;
import com.example.basta.entity.OrderItem;
import com.example.basta.dtos.ProductDto;
import com.example.basta.entity.Product;
import com.example.basta.entity.User;
import com.example.basta.exception.ResourceNotFoundException;
import com.example.basta.repository.CartRepository;
import com.example.basta.repository.OrderRepository;
import com.example.basta.repository.ProductRepository;
import com.example.basta.repository.UserRepository;
import com.example.basta.service.UserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepo;
    private ProductRepository productRepo;
    private CartRepository cartRepo;
    private OrderRepository orderRepo;
    private ModelMapper modelMapper;

    @Override
    public UserDto myProfile(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User doesn't exist"));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateProfile(UserDto userDto, Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User doesn't exist"));

        user.setAddress(userDto.getAddress());
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        user.setPhone(userDto.getPhone());
        user.setUsername(userDto.getUsername());

        User updatedUser = userRepo.save(user);
        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public CartDto getCartByUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepo.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepo.save(newCart);
                });

        return modelMapper.map(cart, CartDto.class);
    }

    private Cart getOrCreateCart(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartRepo.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepo.save(newCart);
                });
    }

    @Override
    public CartDto removeProductFromCart(Long userId, Long productId) {
        Cart cart = getOrCreateCart(userId);

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not found in cart"));

        Product product = cartItem.getProduct();
        product.setKilograms(product.getKilograms() + cartItem.getQuantity());

        cart.getItems().remove(cartItem);
        cart.setTotalPrice(cart.getItems().stream().mapToDouble(CartItem::getPrice).sum());

        cartRepo.save(cart);
        productRepo.save(product);

        return modelMapper.map(cart, CartDto.class);
    }

    @Override
    public CartDto addProductToCart(Long userId, Long productId, double quantity) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getKilograms() < quantity) {
            throw new RuntimeException("Not enough stock available!");
        }

        product.setKilograms(product.getKilograms() - quantity);

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        cartItem.setPrice(quantity * product.getPrice());
        cartItem.setCart(cart);

        cart.getItems().add(cartItem);
        cart.setTotalPrice(cart.getItems().stream().mapToDouble(CartItem::getPrice).sum());

        cartRepo.save(cart);
        productRepo.save(product);

        return modelMapper.map(cart, CartDto.class);
    }

    @Override
    public OrderDto createOrderFromCart(Long userId) {
        Cart cart = getOrCreateCart(userId);

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty!");
        }

        Order order = new Order();
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        order.setUser(user);
        order.setFinalPrice(cart.getTotalPrice());
        order.setApproved(false);
        order.setOrderDate(new Date());

        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            return orderItem;
        }).collect(Collectors.toList());

        order.setItems(orderItems);

        orderRepo.save(order);

        cart.getItems().clear();
        cart.setTotalPrice(0);
        cartRepo.save(cart);

        return mapToOrderDto(order);
    }

    @Override
    public OrderDto getOrderDetails(Long orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToOrderDto(order);
    }

    @Override
    public List<OrderDto> orders(Long userId) {
        List<Order> orders = orderRepo.findByUserId(userId);
        return orders.stream().map(this::mapToOrderDto).collect(Collectors.toList());
    }

    private OrderDto mapToOrderDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setApproved(order.getApproved());
        dto.setFinalPrice(order.getFinalPrice());
        dto.setOrderDate(order.getOrderDate());
        dto.setUserName(order.getUser().getName());
        dto.setUserAddress(order.getUser().getAddress());
        dto.setUserPhone(order.getUser().getPhone());
        dto.setItems(order.getItems().stream()
                .map(this::mapToOrderItemDto)
                .collect(Collectors.toList()));
        return dto;
    }

    private OrderItemDto mapToOrderItemDto(OrderItem item) {
        OrderItemDto dto = new OrderItemDto();
        dto.setId(item.getId());
        dto.setProduct(modelMapper.map(item.getProduct(), ProductDto.class)); // ovo sad radi
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        return dto;
    }
}
