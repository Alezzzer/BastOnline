package com.example.basta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.basta.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
