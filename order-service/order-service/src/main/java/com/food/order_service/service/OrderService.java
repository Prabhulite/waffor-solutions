package com.food.order_service.service;

import com.food.order_service.entity.Order;
import com.food.order_service.entity.OrderStatus;
import com.food.order_service.messaging.OrderProducer;
import com.food.order_service.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderProducer orderProducer;
    private final CamundaService camundaService;

    public OrderService(OrderRepository orderRepository,
                        OrderProducer orderProducer,
                        CamundaService camundaService) {

        this.orderRepository = orderRepository;
        this.orderProducer = orderProducer;
        this.camundaService = camundaService;
    }

    public Order createOrder(Order order) {

        order.setStatus(OrderStatus.PLACED);

        Order savedOrder = orderRepository.save(order);

        // Print the specified log statement
        System.out.println("[OrderService]    Order #" + savedOrder.getId() + " - Status: PLACED, Workflow started");

        // Send ONLY the raw orderId to ActiveMQ to initiate Camunda asynchronously
        orderProducer.sendOrderCreatedMessage(
                String.valueOf(savedOrder.getId())
        );

        return savedOrder;
    }

    public Order updateStatus(Long id, OrderStatus status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);

        // Log completion/cancellation statuses
        if (status == OrderStatus.DELIVERED) {
            System.out.println("[OrderService]    Order #" + id + " - Workflow COMPLETE");
        } else if (status == OrderStatus.CANCELLED) {
            System.out.println("[OrderService]    Order #" + id + " - CANCELLED");
        }

        return updatedOrder;
    }

    public Order approvePendingPayment(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getItem() != null && order.getItem().contains("PENDING")) {
            String cleanItem = order.getItem()
                    .replace(" (PENDING)", "")
                    .replace("(PENDING)", "")
                    .replace("PENDING", "")
                    .trim();
            order.setItem(cleanItem);
        }

        order.setStatus(OrderStatus.PLACED);
        Order savedOrder = orderRepository.save(order);

        System.out.println("[OrderService]    Order #" + id + " - Payment APPROVED by User, starting workflow");

        orderProducer.sendOrderCreatedMessage(String.valueOf(savedOrder.getId()));

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}