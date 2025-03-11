package com.pt.Capstone.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "diet_day")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DietDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String day;

    @OneToMany
    @JoinColumn(name = "diet_day_id")
    private List<Meal> meals = new ArrayList<>();
}
