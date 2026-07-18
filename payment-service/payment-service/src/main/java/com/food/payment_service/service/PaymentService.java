package com.food.payment_service.service;

import com.food.payment_service.entity.Payment;
import com.food.payment_service.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public String processOrderPayment(Long orderId) {
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
        Double amount = 0.0;
        String item = "";
        
        try {
            // Retrieve order details from order-service
            String url = "http://localhost:8080/api/orders/" + orderId;
            java.util.Map<String, Object> orderDetails = restTemplate.getForObject(url, java.util.Map.class);
            if (orderDetails != null) {
                if (orderDetails.get("amount") != null) {
                    amount = ((Number) orderDetails.get("amount")).doubleValue();
                }
                if (orderDetails.get("item") != null) {
                    item = orderDetails.get("item").toString();
                }
            }
        } catch (Exception e) {
            System.err.println("Could not retrieve order details for payment of order: " + orderId);
        }
        // Mock payment processing logic: check if explicitly requested to remain pending
        if (item.contains("PENDING")) {
            // Save payment record to DB
            Payment payment = new Payment();
            payment.setOrderId(orderId);
            payment.setAmount(amount);
            payment.setStatus("PENDING");
            paymentRepository.save(payment);

            System.out.println("[PaymentService]  Order #" + orderId + " - Payment processing... PENDING");
            return "PENDING";
        }

        // COD always succeeds. Cards fail if amount is 999 or 10% randomly.
        boolean isSuccess = true;
        if (item.contains("COD")) {
            isSuccess = true;
        } else if (amount == 999.0) {
            isSuccess = false;
        } else {
            isSuccess = Math.random() > 0.1;
        }

        String status = isSuccess ? "SUCCESS" : "FAILED";

        // Log the required statement format
        System.out.println("[PaymentService]  Order #" + orderId + " - Payment processing... " + status);

        // Save payment record to DB
        Payment payment = new Payment();
        payment.setOrderId(orderId);
        payment.setAmount(amount);
        payment.setStatus(status);
        paymentRepository.save(payment);

        return status;
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}