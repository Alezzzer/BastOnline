package com.example.basta.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.basta.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
//	Role findByName(String name);
    Optional<Role> findByName(String name);
}
