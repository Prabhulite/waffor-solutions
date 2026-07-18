package com.food.order_service.controller;

import com.food.order_service.entity.Order;
import com.food.order_service.entity.OrderStatus;
import com.food.order_service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @PutMapping("/{id}/status/{status}")
    public Order updateStatus(@PathVariable Long id,
                              @PathVariable OrderStatus status) {

        return orderService.updateStatus(id, status);
    }

    @PutMapping("/{id}/approve")
    public Order approvePendingPayment(@PathVariable Long id) {
        return orderService.approvePendingPayment(id);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }
}