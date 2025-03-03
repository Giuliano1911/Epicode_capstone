package com.pt.Capstone.requests;

import lombok.Data;

import java.util.List;

@Data
public class ExerciseRequest {

    private String name;

    private String description;

    private List<String> muscleGroups;
}
