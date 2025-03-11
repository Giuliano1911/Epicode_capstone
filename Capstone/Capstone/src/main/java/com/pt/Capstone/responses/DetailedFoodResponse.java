package com.pt.Capstone.responses;

import com.pt.Capstone.entities.Food;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailedFoodResponse {

    private Long id;

    private Integer quantity;

    private Food food;
}
