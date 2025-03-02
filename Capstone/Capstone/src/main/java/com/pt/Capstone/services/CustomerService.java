package com.pt.Capstone.services;

import com.pt.Capstone.entities.Customer;
import com.pt.Capstone.enums.Role;
import com.pt.Capstone.repositories.CustomerRepository;
import com.pt.Capstone.requests.CustomerRegisterRequest;
import com.pt.Capstone.responses.AuthResponse;
import com.pt.Capstone.responses.CustomerResponse;
import com.pt.Capstone.utils.JwtTokenUtil;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Validated
public class CustomerService {

    private final CustomerRepository customerRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    public CustomerResponse customerResponseFromEntity(Customer customer) {
        CustomerResponse customerResponse = new CustomerResponse();
        BeanUtils.copyProperties(customer, customerResponse);
        return customerResponse;
    }

    public List<CustomerResponse> customerResponseListFromEntityList(List<Customer> customers) {
        return customers.stream()
                .map(this::customerResponseFromEntity)
                .toList();
    }

    public List<CustomerResponse> findAll() {
        return customerResponseListFromEntityList(customerRepository.findAll());
    }

    public CustomerResponse findById(Long id) {
        return customerResponseFromEntity(customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User with id: " + id + " not found")));
    }

    public Optional<Customer> findByUsername(String username) {
        return customerRepository.findByUsername(username);
    }

    public Customer customerFromRegisterRequest(@Valid CustomerRegisterRequest customerRegisterRequest) {
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerRegisterRequest, customer);
        customer.setPassword(passwordEncoder.encode(customerRegisterRequest.getPassword()));
        return customer;
    }

    public void register(@Valid CustomerRegisterRequest customerRegisterRequest) {
        if (customerRepository.existsByUsername(customerRegisterRequest.getUsername())) {
            throw new EntityExistsException("User with username: " + customerRegisterRequest.getUsername() + " already exists.");
        }
        Customer customer = customerFromRegisterRequest(customerRegisterRequest);
        if (customerRegisterRequest.getRoles() == null) {
            customerRegisterRequest.setRoles(Set.of(Role.ROLE_CUSTOMER));
        }
        customerRepository.save(customer);
    }

    public AuthResponse authenticateUser(String username, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtTokenUtil.generateToken(userDetails);
            List<String> roles = jwtTokenUtil.getRolesFromToken(token);
            return new AuthResponse(token, roles);
        } catch (AuthenticationException e) {
            throw new SecurityException("Credentials are invalid", e);
        }
    }

    public CustomerResponse update(Long id, @Valid CustomerRegisterRequest customerRegisterRequest) {
        if (id == 1 || id == 2) {
            throw new SecurityException("User with id: " + id + " cannot be updated.");
        }
        Customer customer = customerFromRegisterRequest(customerRegisterRequest);
        customer.setId(id);
        customer.setRoles(Set.of(Role.ROLE_CUSTOMER));
        return customerResponseFromEntity(customerRepository.save(customer));
    }
}