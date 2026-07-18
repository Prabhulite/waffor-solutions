package com.food.camunda_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.food.camunda_service")
public class CamundaServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(CamundaServiceApplication.class, args);
  }

}