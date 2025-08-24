package com.garcil.restaurant_backend.controller;

import com.garcil.restaurant_backend.dto.CheckoutOrderDTO;
import com.garcil.restaurant_backend.service.StripeService;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // allow your React frontend
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(@RequestBody CheckoutOrderDTO order) throws Exception {
        Session session = stripeService.createCheckoutSession(order);
        Map<String, String> response = new HashMap<>();
        response.put("url", session.getUrl());
        return response;
    }
}
