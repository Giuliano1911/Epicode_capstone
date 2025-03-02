package com.pt.Capstone.controllers;

import com.pt.Capstone.requests.CustomerRegisterRequest;
import com.pt.Capstone.requests.LoginRequest;
import com.pt.Capstone.responses.AuthResponse;
import com.pt.Capstone.responses.CustomerResponse;
import com.pt.Capstone.services.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@Validated
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('PERSONALTRAINER')")
    public ResponseEntity<String> register(@RequestBody @Valid CustomerRegisterRequest customerRegisterRequest) {
        customerService.register(customerRegisterRequest);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
        String token = customerService.authenticateUser(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        ).getToken();
        List<String> roles = customerService.authenticateUser(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        ).getRoles();
        return ResponseEntity.ok().body(new AuthResponse(token, roles));
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CustomerResponse> findAll() {
        return customerService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CustomerResponse findById(@PathVariable Long id) {
        return customerService.findById(id);
    }
}
