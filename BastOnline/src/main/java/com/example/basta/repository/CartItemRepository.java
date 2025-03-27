package com.example.basta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.basta.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

}
