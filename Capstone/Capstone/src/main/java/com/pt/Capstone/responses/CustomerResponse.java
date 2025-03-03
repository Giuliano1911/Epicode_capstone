package com.pt.Capstone.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {

    private Long id;

    private String name;

    private String surname;

    private LocalDate dateOfBirth;

    private String phoneNumber;

    private LocalDate lastPaymentDate;

}
