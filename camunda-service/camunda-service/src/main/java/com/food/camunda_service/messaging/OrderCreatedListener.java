package com.food.camunda_service.messaging;

import org.camunda.bpm.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class OrderCreatedListener {

    @Autowired
    private RuntimeService runtimeService;

    @JmsListener(destination = "order.created")
    public void receiveOrderCreatedMessage(String message) {
        try {
            System.out.println("===== CAMUNDA CONSUMED MESSAGE: " + message + " =====");
            
            // The message sent by order-service contains the raw Order ID
            Long orderId = Long.parseLong(message.trim());

            Map<String, Object> variables = new HashMap<>();
            variables.put("orderId", orderId);

            runtimeService.startProcessInstanceByKey("orderProcess", variables);
            
            System.out.println("===== CAMUNDA STARTED WORKFLOW ASYNCHRONOUSLY FOR ORDER #" + orderId + " =====");
        } catch (Exception e) {
            System.err.println("Failed to start Camunda workflow for message: " + message);
            e.printStackTrace();
        }
    }
}
