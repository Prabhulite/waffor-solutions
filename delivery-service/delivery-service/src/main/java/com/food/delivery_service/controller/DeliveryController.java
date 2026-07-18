package com.food.delivery_service.controller;

import com.food.delivery_service.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/delivery/process/{orderId}")
    public String processDelivery(@PathVariable Long orderId) {
        return deliveryService.processDelivery(orderId);
    }
}