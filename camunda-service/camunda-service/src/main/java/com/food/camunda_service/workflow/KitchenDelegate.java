package com.food.camunda_service.workflow;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component("kitchenDelegate")
public class KitchenDelegate implements JavaDelegate {

    @Override
    public void execute(DelegateExecution execution) {

        Long orderId = ((Number) execution.getVariable("orderId")).longValue();

        RestTemplate restTemplate = new RestTemplate();

        String response =
                restTemplate.getForObject(
                        "http://localhost:8082/kitchen/process/" + orderId,
                        String.class);

        restTemplate.put(
                "http://localhost:8080/api/orders/" +
                orderId +
                "/status/PREPARING",
                null
        );

        System.out.println("===== KITCHEN SERVICE RESPONSE FOR ORDER #" + orderId + ": " + response + " =====");
    }
}
