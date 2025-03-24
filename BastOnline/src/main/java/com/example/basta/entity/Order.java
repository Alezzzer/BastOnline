package com.example.basta.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean approved;

    private Double finalPrice;

    private Double finalKilos;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  
    private User user;

    @ManyToMany
    @JoinTable(
        name = "orders_products",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;
}
