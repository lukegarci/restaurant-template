package com.garcil.restaurant_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "menu")
public class MenuItem {

    @Id
    private UUID itemId;

    private String itemName;
    private String itemDescription;
    private Double itemPrice;
    private Boolean itemAvailability;
    private String category;
    private String meal;
    private String imageUrl;

    public MenuItem() {}

    public MenuItem(UUID itemId, String itemName, Double itemPrice, String itemDescription,
                    Boolean itemAvailability, String category, String meal, String imageUrl) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemDescription = itemDescription;
        this.itemAvailability = itemAvailability;
        this.category = category;
        this.meal = meal;
        this.imageUrl = imageUrl;
    }

    public UUID getItemId() { return itemId; }
    public void setItemId(UUID itemId) { this.itemId = itemId; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getItemDescription() { return itemDescription; }
    public void setItemDescription(String itemDescription) { this.itemDescription = itemDescription; }

    public Double getItemPrice() { return itemPrice; }
    public void setItemPrice(Double itemPrice) { this.itemPrice = itemPrice; }

    public Boolean getItemAvailability() { return itemAvailability; }
    public void setItemAvailability(Boolean itemAvailability) { this.itemAvailability = itemAvailability; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getMeal() { return meal; }
    public void setMeal(String meal) { this.meal = meal; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
