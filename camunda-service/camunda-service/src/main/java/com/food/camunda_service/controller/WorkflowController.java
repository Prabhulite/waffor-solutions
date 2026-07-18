package com.food.camunda_service.controller;

import org.camunda.bpm.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class WorkflowController {

    @Autowired
    private RuntimeService runtimeService;

    @GetMapping("/start/{orderId}")
    public String startProcess(@PathVariable Long orderId) {

        Map<String,Object> variables = new HashMap<>();

        variables.put("orderId", orderId);

        runtimeService.startProcessInstanceByKey(
                "orderProcess",
                variables
        );

        return "Order Workflow Started Successfully!";
    }
}
