package com.pt.Capstone.requests.detailedExercise;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestRequest {

    @NotBlank(message = "Rest is required")
    private String rest;
}
