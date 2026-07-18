package com.food.kitchen_service.controller;

import com.food.kitchen_service.service.KitchenOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class KitchenController {

    @Autowired
    private KitchenOrderService kitchenOrderService;

    @GetMapping("/kitchen/process/{orderId}")
    public String processKitchen(@PathVariable Long orderId) {
        return kitchenOrderService.processKitchenOrder(orderId);
    }
}