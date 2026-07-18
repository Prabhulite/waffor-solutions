package com.food.kitchen_service.repository;

import com.food.kitchen_service.entity.KitchenOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KitchenOrderRepository extends JpaRepository<KitchenOrder, Long> {

}