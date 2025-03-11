package com.pt.Capstone.repositories;

import com.pt.Capstone.entities.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Long> {
}
