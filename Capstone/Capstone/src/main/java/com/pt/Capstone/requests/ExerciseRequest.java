package com.pt.Capstone.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExerciseRequest {

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Description is required")
    private String description;

    @NotNull(message = "Muscle group is required")
    private String muscleGroup;
}
