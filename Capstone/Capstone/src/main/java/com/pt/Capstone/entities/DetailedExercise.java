package com.pt.Capstone.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "detailed_exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailedExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    private String reps;

    private String sets;

    private String rest;
}
