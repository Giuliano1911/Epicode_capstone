package com.pt.Capstone.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FoodRequest {

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Calories is required")
    private Integer calories;
}
