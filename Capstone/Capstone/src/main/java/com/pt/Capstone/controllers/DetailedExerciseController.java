package com.pt.Capstone.controllers;

import com.pt.Capstone.requests.DetailedExerciseRequest;
import com.pt.Capstone.responses.DetailedExerciseResponse;
import com.pt.Capstone.responses.EntityPostResponse;
import com.pt.Capstone.services.DetailedExerciseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/detailedExercises")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PERSONALTRAINER')")
@Validated
public class DetailedExerciseController {
    private final DetailedExerciseService detailedExerciseService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public DetailedExerciseResponse findById(@PathVariable Long id) {
        return detailedExerciseService.findById(id);
    }

    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public EntityPostResponse save(@PathVariable Long id) {
        return detailedExerciseService.save(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateExercise(@PathVariable Long id, @RequestBody @Valid DetailedExerciseRequest detailedExerciseRequest) {
        detailedExerciseService.update(id, detailedExerciseRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        detailedExerciseService.delete(id);
    }
}
