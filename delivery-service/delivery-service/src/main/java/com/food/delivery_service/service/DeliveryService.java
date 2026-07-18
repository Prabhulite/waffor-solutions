package com.food.delivery_service.service;

import com.food.delivery_service.entity.Delivery;
import com.food.delivery_service.repository.DeliveryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public String processDelivery(Long orderId) {
        String driverName = "Rider #" + (int)(Math.random() * 90 + 10);
        
        // Print the specified log statement
        System.out.println("[DeliveryService] Order #" + orderId + " - Driver assigned, delivering... DELIVERED");

        // Save delivery record to DB
        Delivery delivery = new Delivery();
        delivery.setOrderId(orderId);
        delivery.setAddress("Customer Local Address");
        delivery.setStatus("DELIVERED");
        delivery.setDriverName(driverName);
        deliveryRepository.save(delivery);

        return "DELIVERED";
    }

    public Delivery createDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }
}