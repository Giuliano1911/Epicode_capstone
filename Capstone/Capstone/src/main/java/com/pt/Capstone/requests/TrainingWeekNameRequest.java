package com.pt.Capstone.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingWeekNameRequest {

    @NotBlank(message = "Name is required")
    private String name;
}
