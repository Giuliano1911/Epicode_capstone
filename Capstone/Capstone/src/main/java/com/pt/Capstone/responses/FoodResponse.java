package com.pt.Capstone.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodResponse {

    private Long id;

    private String name;

    private Integer calories;
}
