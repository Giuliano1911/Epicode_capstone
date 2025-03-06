package com.pt.Capstone.controllers;

import com.pt.Capstone.requests.TrainingWeekNameRequest;
import com.pt.Capstone.responses.TrainingWeekResponse;
import com.pt.Capstone.services.TrainingWeekService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainingWeek")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
@Validated
public class TrainingWeekController {
    private final TrainingWeekService trainingWeekService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TrainingWeekResponse findById(@PathVariable Long id) {
        return trainingWeekService.findById(id);
    }

    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('PERSONALTRAINER')")
    public TrainingWeekResponse save(@PathVariable Long id, @RequestBody @Valid TrainingWeekNameRequest trainingWeekNameRequest) {
        return trainingWeekService.save(id,trainingWeekNameRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('PERSONALTRAINER')")
    public void delete(@PathVariable Long id) {
        trainingWeekService.delete(id);
    }

    @GetMapping("/customer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<TrainingWeekResponse> findByCustomer(@PathVariable Long id) {
        return trainingWeekService.findByCustomer(id);
    }
}
