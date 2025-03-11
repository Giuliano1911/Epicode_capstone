package com.pt.Capstone.controllers;

import com.pt.Capstone.requests.DietWeekNameRequest;
import com.pt.Capstone.responses.DietWeekResponse;
import com.pt.Capstone.services.DietWeekService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dietWeeks")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
@Validated
public class DietWeekController {
    private final DietWeekService dietWeekService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public DietWeekResponse findById(@PathVariable Long id) {
        return dietWeekService.findById(id);
    }

    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('PERSONALTRAINER')")
    public DietWeekResponse save(@PathVariable Long id, @RequestBody @Valid DietWeekNameRequest dietWeekNameRequest) {
        return dietWeekService.save(id, dietWeekNameRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('PERSONALTRAINER')")
    public void delete(@PathVariable Long id) {
        dietWeekService.delete(id);
    }

    @GetMapping("/customer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<DietWeekResponse> findByCustomer(@PathVariable Long id) {
        return dietWeekService.findByCustomer(id);
    }
}
