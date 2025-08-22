package com.garcil.restaurant_backend.model;
import com.garcil.restaurant_backend.model.MenuItem;

import jakarta.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue
    private UUID order_id;  // matches database UUID column

    @Column(name = "order_status", nullable = false)
    private String orderStatus;

    @Column(name = "order_name", nullable = false)
    private String orderName;

    @Column(name = "order_phonenumber", nullable = false)
    private String orderPhonenumber;

    // Many-to-many relationship with Menu items via Order_Items
    @ManyToMany
    @JoinTable(
            name = "order_items",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id")
    )
    private List<MenuItem> items;

    public Order() {}

    public Order(UUID order_id, String orderStatus, String orderName, String orderPhonenumber) {
        this.order_id = order_id;
        this.orderStatus = orderStatus;
        this.orderName = orderName;
        this.orderPhonenumber = orderPhonenumber;
    }

    public UUID getOrder_id() { return order_id; }
    public void setOrder_id(UUID order_id) { this.order_id = order_id; }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public String getOrderName() { return orderName; }
    public void setOrderName(String orderName) { this.orderName = orderName; }

    public String getOrderPhonenumber() { return orderPhonenumber; }
    public void setOrderPhonenumber(String orderPhonenumber) { this.orderPhonenumber = orderPhonenumber; }

    public List<MenuItem> getItems() { return items; }
    public void setItems(List<MenuItem> items) { this.items = items; }
}
