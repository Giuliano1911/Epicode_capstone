package com.pt.Capstone.responses;

import com.pt.Capstone.entities.DietDay;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DietWeekResponse {

    private Long id;

    private String name;

    private CustomerResponse customerResponse;

    private List<DietDay> dietDays;
}
