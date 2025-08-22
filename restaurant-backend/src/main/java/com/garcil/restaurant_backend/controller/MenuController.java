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

    @GetMapping("/meal/{meal}")
    public List<MenuItem> getItemsByMeal(@PathVariable String meal) {
        return menuItemRepository.findByMeal(meal);
    }
}
