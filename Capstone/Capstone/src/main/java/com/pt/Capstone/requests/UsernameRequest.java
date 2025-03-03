package com.pt.Capstone.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsernameRequest {

    @NotBlank(message = "Username is required")
    private String username;
}
