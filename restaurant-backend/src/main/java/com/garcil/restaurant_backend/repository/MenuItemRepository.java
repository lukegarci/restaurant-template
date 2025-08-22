package com.garcil.restaurant_backend.repository;

import com.garcil.restaurant_backend.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByMeal(String meal);
}
