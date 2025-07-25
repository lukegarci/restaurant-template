package com.garcil.restaurant_backend.controller;

import com.garcil.restaurant_backend.model.MenuItem;
import com.garcil.restaurant_backend.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<MenuItem> getItemsByCategory(@PathVariable String category) {
        return menuItemRepository.findByCategory(category);
    }
}
