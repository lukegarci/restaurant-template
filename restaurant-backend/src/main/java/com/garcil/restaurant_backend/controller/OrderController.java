package com.garcil.restaurant_backend.controller;

import com.garcil.restaurant_backend.dto.OrderDTO;
import com.garcil.restaurant_backend.model.Order;
import com.garcil.restaurant_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public ResponseEntity<String> placeOrder(@RequestBody OrderDTO orderDTO) {
        // Map DTO to entity
        Order order = new Order();
        order.setFirstname(orderDTO.getFirstname());
        order.setLastname(orderDTO.getLastname());
        order.setPhonenumber(orderDTO.getPhonenumber());
        order.setOrderlist(orderDTO.getOrderlist());

        //save order
        orderRepository.save(order);

        return ResponseEntity.ok("Order has been sent");
    }


}
