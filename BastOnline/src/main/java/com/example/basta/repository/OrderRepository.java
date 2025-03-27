package com.example.basta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.basta.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
