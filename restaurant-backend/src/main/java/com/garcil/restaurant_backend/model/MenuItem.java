package com.garcil.restaurant_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu")
public class MenuItem {
    @Id
    private Long itemid;

    private String name;
    private String description;
    private Double price;
    private Boolean availability;
    private String foodtags;
    private String category;

    public MenuItem() {
    }

    public MenuItem(Long itemid,String name, Double price, String description, Boolean availability, String foodtags, String category) {
        this.itemid = itemid;
        this.name = name;
        this.price = price;
        this.description = description;
        this.availability = availability;
        this.foodtags = foodtags;
        this.category = category;
    }

    public Long getItemid() { return itemid; }
    public void setItemid(Long itemid) { this.itemid = itemid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Boolean getAvailability() { return availability; }
    public void setAvailability(Boolean availability) { this.availability = availability; }

    public String getFoodtags() { return foodtags; }
    public void setFoodtags(String foodtags) { this.foodtags = foodtags; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

}
