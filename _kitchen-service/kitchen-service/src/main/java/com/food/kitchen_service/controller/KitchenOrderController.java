package com.food.kitchen_service.controller;

import com.food.kitchen_service.entity.KitchenOrder;
import com.food.kitchen_service.service.KitchenOrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kitchen")
@CrossOrigin("*")
public class KitchenOrderController {

    private final KitchenOrderService kitchenOrderService;

    public KitchenOrderController(KitchenOrderService kitchenOrderService) {
        this.kitchenOrderService = kitchenOrderService;
    }

    @PostMapping
    public KitchenOrder createOrder(@RequestBody KitchenOrder order) {
        return kitchenOrderService.createOrder(order);
    }

    @GetMapping
    public List<KitchenOrder> getAllOrders() {
        return kitchenOrderService.getAllOrders();
    }
}