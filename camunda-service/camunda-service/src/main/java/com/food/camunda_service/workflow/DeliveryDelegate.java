package com.food.camunda_service.workflow;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component("deliveryDelegate")
public class DeliveryDelegate implements JavaDelegate {

    @Override
    public void execute(DelegateExecution execution) {

        Long orderId = ((Number) execution.getVariable("orderId")).longValue();

        RestTemplate restTemplate = new RestTemplate();

        String response =
                restTemplate.getForObject(
                        "http://localhost:8083/delivery/process/" + orderId,
                        String.class);

        restTemplate.put(
                "http://localhost:8080/api/orders/" +
                orderId +
                "/status/DELIVERED",
                null
        );

        System.out.println("===== DELIVERY SERVICE RESPONSE FOR ORDER #" + orderId + ": " + response + " =====");
    }
}
