package com.pt.Capstone.controllers;

import com.pt.Capstone.responses.EntityPostResponse;
import com.pt.Capstone.responses.ExerciseResponse;
import com.pt.Capstone.services.ExerciseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PERSONALTRAINER')")
@Validated
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ExerciseResponse> findAll() {
        return exerciseService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ExerciseResponse findById(@PathVariable Long id) {
        return exerciseService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EntityPostResponse save(@RequestBody @Valid ExerciseResponse exerciseResponse) {
        return exerciseService.save(exerciseResponse);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ExerciseResponse update(@PathVariable Long id, @RequestBody @Valid ExerciseResponse exerciseResponse) {
        return exerciseService.update(id, exerciseResponse);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        exerciseService.delete(id);
    }
}
