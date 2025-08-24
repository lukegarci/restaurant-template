package com.garcil.restaurant_backend.dto;
import java.util.List;

public class CheckoutOrderDTO {
    public String name;
    public String phoneNumber;
    public List<OrderItemDTO> items;

    public static class OrderItemDTO {
        public String itemId;
        public String name;
        public int quantity;
        public double price;
    }
}
