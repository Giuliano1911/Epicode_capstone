package com.pt.Capstone.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DetailedExerciseRequest {

    @NotNull(message = "Exercise id is required")
    private Long exerciseId;

    @NotNull(message = "Reps is required")
    private Integer reps;

    @NotNull(message = "Sets is required")
    private Integer sets;

    @NotNull(message = "Rest is required")
    private Integer rest;
}
