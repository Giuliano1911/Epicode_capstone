package com.pt.Capstone.controllers;

import com.pt.Capstone.requests.FoodRequest;
import com.pt.Capstone.responses.EntityPostResponse;
import com.pt.Capstone.responses.FoodResponse;
import com.pt.Capstone.services.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PERSONALTRAINER')")
@Validated
public class FoodController {

    private final FoodService foodService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FoodResponse> findAll() {
        return foodService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FoodResponse findById(@PathVariable Long id) {
        return foodService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EntityPostResponse save(@RequestBody @Valid FoodRequest foodRequest) {
        return foodService.save(foodRequest);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FoodResponse update(@PathVariable Long id, @RequestBody @Valid FoodRequest foodRequest) {
        return foodService.update(id, foodRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        foodService.delete(id);
    }
}
