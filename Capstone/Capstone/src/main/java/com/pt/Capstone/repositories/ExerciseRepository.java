package com.pt.Capstone.repositories;

import com.pt.Capstone.entities.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    boolean existsByName(String name);
}
