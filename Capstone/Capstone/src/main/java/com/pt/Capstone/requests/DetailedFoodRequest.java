package com.pt.Capstone.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DetailedFoodRequest {

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotNull(message = "Food id is required")
    private Long foodId;
}
