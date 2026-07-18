package com.food.camunda_service.workflow;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component("paymentDelegate")
public class PaymentDelegate implements JavaDelegate {

    @Override
    public void execute(DelegateExecution execution) {

        Long orderId = ((Number) execution.getVariable("orderId")).longValue();

        RestTemplate restTemplate = new RestTemplate();

        // Call payment-service passing the orderId
        String response =
                restTemplate.getForObject(
                        "http://localhost:8081/api/payments/process/" + orderId,
                        String.class);

        System.out.println("===== PAYMENT SERVICE RESPONSE FOR ORDER #" + orderId + ": " + response + " =====");

        if (response != null && response.trim().equalsIgnoreCase("SUCCESS")) {
            // Success path
            execution.setVariable("paymentStatus", "SUCCESS");
            restTemplate.put(
                    "http://localhost:8080/api/orders/" +
                    orderId +
                    "/status/PAYMENT_SUCCESS",
                    null
            );
        } else if (response != null && response.trim().equalsIgnoreCase("PENDING")) {
            // Pending path: does NOT call order status update, so it stays PLACED (pending)
            execution.setVariable("paymentStatus", "PENDING");
            System.out.println("===== PAYMENT SERVICE PENDING STAGE ENGAGED FOR ORDER #" + orderId + " =====");
        } else {
            // Failure path
            execution.setVariable("paymentStatus", "FAILED");
        }
    }
}
