package com.pt.Capstone.controllers;

import com.pt.Capstone.requests.ReseravtionDateRequest;
import com.pt.Capstone.requests.ReservationRequest;
import com.pt.Capstone.responses.EntityPostResponse;
import com.pt.Capstone.responses.ReservationResponse;
import com.pt.Capstone.services.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
@Validated
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping("/customer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<ReservationResponse> findByCustomer(@PathVariable Long id) {
        return reservationService.findByCustomer(id);
    }

    @GetMapping("/date/{date}")
    @ResponseStatus(HttpStatus.OK)
    public List<ReservationResponse> findByDate(@PathVariable LocalDate date) {
        return reservationService.findByDate(date);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ReservationResponse findById(@PathVariable Long id) {
        return reservationService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EntityPostResponse save(@Valid @RequestBody ReservationRequest reservationRequest) {
        return reservationService.save(reservationRequest);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ReservationResponse update(@PathVariable Long id, @Valid @RequestBody ReservationRequest reservationRequest) {
        return reservationService.update(id, reservationRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        reservationService.delete(id);
    }
}
