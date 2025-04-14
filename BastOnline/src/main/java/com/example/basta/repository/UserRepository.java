package com.example.basta.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.basta.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	    Boolean existsByEmail(String email);

	    Optional<User> findByEmail(String email);
}
