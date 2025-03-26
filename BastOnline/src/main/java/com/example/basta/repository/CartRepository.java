package com.example.basta.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.basta.entity.Cart;
import com.example.basta.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}