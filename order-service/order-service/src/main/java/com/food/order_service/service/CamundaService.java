package com.food.order_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CamundaService {

    @Autowired
    private RestTemplate restTemplate;

    public String startWorkflow(Long orderId) {

        String url = "http://localhost:8084/start/" + orderId;

        return restTemplate.getForObject(url, String.class);
    }
}
