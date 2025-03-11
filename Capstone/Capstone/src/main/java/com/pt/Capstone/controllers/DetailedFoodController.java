package com.pt.Capstone.controllers;

import com.pt.Capstone.requests.DetailedFoodRequest;
import com.pt.Capstone.responses.DetailedFoodResponse;
import com.pt.Capstone.responses.EntityPostResponse;
import com.pt.Capstone.services.DetailedFoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/detailedFood")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PERSONALTRAINER')")
@Validated
public class DetailedFoodController {
    private final DetailedFoodService detailedFoodService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public DetailedFoodResponse findById(@PathVariable Long id) {
        return detailedFoodService.findById(id);
    }

    @PostMapping("/{mealId}/{dietDayId}")
    @ResponseStatus(HttpStatus.CREATED)
    public EntityPostResponse save(@PathVariable Long mealId, @PathVariable Long dietDayId, @RequestBody @Valid DetailedFoodRequest detailedFoodRequest) {
        return detailedFoodService.save(mealId, dietDayId, detailedFoodRequest);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable Long id, @RequestBody @Valid DetailedFoodRequest detailedFoodRequest) {
        detailedFoodService.update(id, detailedFoodRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        detailedFoodService.delete(id);
    }
}
