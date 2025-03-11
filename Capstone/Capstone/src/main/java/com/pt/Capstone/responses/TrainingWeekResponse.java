package com.pt.Capstone.responses;

import com.pt.Capstone.entities.Customer;
import com.pt.Capstone.entities.TrainingDay;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingWeekResponse {

    private Long id;

    private String name;

    private CustomerResponse customerResponse;

    private List<TrainingDay> trainingDays;
}
