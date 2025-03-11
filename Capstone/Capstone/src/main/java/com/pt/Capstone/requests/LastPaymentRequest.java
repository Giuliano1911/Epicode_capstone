package com.pt.Capstone.requests;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LastPaymentRequest {

    private LocalDate lastPaymentDate;
}
