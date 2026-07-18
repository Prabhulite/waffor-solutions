package com.food.kitchen_service.service;

import com.food.kitchen_service.entity.KitchenOrder;
import com.food.kitchen_service.repository.KitchenOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KitchenOrderService {

    private final KitchenOrderRepository kitchenOrderRepository;

    public KitchenOrderService(KitchenOrderRepository kitchenOrderRepository) {
        this.kitchenOrderRepository = kitchenOrderRepository;
    }

    public String processKitchenOrder(Long orderId) {
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
        String item = "Unknown Item";

        try {
            // Retrieve order details from order-service
            String url = "http://localhost:8080/api/orders/" + orderId;
            java.util.Map<String, Object> orderDetails = restTemplate.getForObject(url, java.util.Map.class);
            if (orderDetails != null && orderDetails.get("item") != null) {
                item = orderDetails.get("item").toString();
            }
        } catch (Exception e) {
            System.err.println("Could not retrieve order details for kitchen order: " + orderId);
        }

        // Print the specified log statement
        System.out.println("[KitchenService]  Order #" + orderId + " - Kitchen ticket created, preparing food... READY");

        // Save kitchen order record to DB
        KitchenOrder kitchenOrder = new KitchenOrder();
        kitchenOrder.setOrderId(orderId);
        kitchenOrder.setItem(item);
        kitchenOrder.setStatus("READY");
        kitchenOrderRepository.save(kitchenOrder);

        return "READY";
    }

    public KitchenOrder createOrder(KitchenOrder order) {
        return kitchenOrderRepository.save(order);
    }

    public List<KitchenOrder> getAllOrders() {
        return kitchenOrderRepository.findAll();
    }
}