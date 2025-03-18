package com.pt.Capstone.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ReseravtionDateRequest {

    @NotNull(message = "Date is required")
    private LocalDate date;
}
