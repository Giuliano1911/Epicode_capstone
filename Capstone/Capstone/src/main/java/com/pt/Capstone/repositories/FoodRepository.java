package com.pt.Capstone.repositories;

import com.pt.Capstone.entities.Food;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
    boolean existsByName(@NotNull(message = "Name is required") String name);
}
