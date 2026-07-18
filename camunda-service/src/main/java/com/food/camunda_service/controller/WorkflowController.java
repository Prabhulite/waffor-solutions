package com.food.camunda_service.controller;

import org.camunda.bpm.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WorkflowController {

  @Autowired
  private RuntimeService runtimeService;

  @GetMapping("/start")
  public String startProcess() {

    runtimeService.startProcessInstanceByKey("orderProcess");

    return "Order Workflow Started Successfully!";
  }
}