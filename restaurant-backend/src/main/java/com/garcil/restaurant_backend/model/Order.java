package com.garcil.restaurant_backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private Long orderid;

    private String firstname;
    private String lastname;

    private String phonenumber;

    // Using @ElementCollection to store list of order items as Strings
    @ElementCollection
    @CollectionTable(name = "order_items", joinColumns = @JoinColumn(name = "orderid"))
    @Column(name = "item")
    private List<String> orderlist;

    public Order() {}

    public Order(Long orderid, String firstname, String lastname, String phonenumber, List<String> orderlist) {
        this.orderid = orderid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.orderlist = orderlist;
    }

    public Long getOrderid() { return orderid; }
    public void setOrderid(Long orderid) { this.orderid = orderid; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getPhonenumber() { return phonenumber; }
    public void setPhonenumber(String phonenumber) { this.phonenumber = phonenumber; }

    public List<String> getOrderlist() { return orderlist; }
    public void setOrderlist(List<String> orderlist) { this.orderlist = orderlist; }
}
