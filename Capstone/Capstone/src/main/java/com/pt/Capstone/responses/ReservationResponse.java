package com.pt.Capstone.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

    private Long id;

    private LocalDate date;

    private String time;

    private String description;

    private CustomerResponse customerResponse;
}
