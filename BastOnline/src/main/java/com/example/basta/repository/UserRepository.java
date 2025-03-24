package com.example.basta.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.basta.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
