package com.pt.Capstone.requests.detailedExercise;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepsRequest {

    @NotBlank(message = "Reps is required")
    private String reps;
}
