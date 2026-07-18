package com.food.order_service.messaging;

import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class OrderProducer {

    private final JmsTemplate jmsTemplate;

    public OrderProducer(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    public void sendOrderCreatedMessage(String message) {

        jmsTemplate.convertAndSend(
                "order.created",
                message
        );

        System.out.println(
                "[ActiveMQ] Sent message : " + message
        );
    }
}