package com.food.kitchen_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "kitchen_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KitchenOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;

    private String item;

    private String status;
}