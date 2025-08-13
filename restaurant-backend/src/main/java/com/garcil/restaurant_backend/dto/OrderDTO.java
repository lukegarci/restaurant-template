package com.garcil.restaurant_backend.dto;

import java.util.List;

public class OrderDTO {
    private String firstname;
    private String lastname;
    private String phonenumber;
    private List<String> orderlist;

    public OrderDTO() {}

    public OrderDTO(String firstname, String lastname, String phonenumber, List<String> orderlist) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.orderlist = orderlist;
    }

    public String getFirstname() {
        return firstname;
    }
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhonenumber() {
        return phonenumber;
    }
    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public List<String> getOrderlist() {
        return orderlist;
    }
    public void setOrderlist(List<String> orderlist) {
        this.orderlist = orderlist;
    }
}
