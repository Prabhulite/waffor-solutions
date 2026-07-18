package com.food.camunda_service.workflow;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component("cancelDelegate")
public class CancelDelegate implements JavaDelegate {

    @Override
    public void execute(DelegateExecution execution) {
        Long orderId = ((Number) execution.getVariable("orderId")).longValue();
        RestTemplate restTemplate = new RestTemplate();

        // Update the order-service with status CANCELLED
        restTemplate.put(
                "http://localhost:8080/api/orders/" + orderId + "/status/CANCELLED",
                null
        );

        System.out.println("===== CAMUNDA CANCELLED ORDER: #" + orderId + " =====");
    }
}
