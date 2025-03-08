package com.pt.Capstone.services;

import com.pt.Capstone.entities.Customer;
import com.pt.Capstone.enums.Role;
import com.pt.Capstone.repositories.CustomerRepository;
import com.pt.Capstone.requests.CustomerPutRequest;
import com.pt.Capstone.requests.CustomerRegisterRequest;
import com.pt.Capstone.responses.AuthResponse;
import com.pt.Capstone.responses.CustomerResponse;
import com.pt.Capstone.components.JwtTokenUtil;
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

import java.time.LocalDate;
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

    public Customer customerFromPutRequest(@Valid CustomerPutRequest customerPutRequest) {
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerPutRequest, customer);
        return customer;
    }

    public void register(@Valid CustomerRegisterRequest customerRegisterRequest) {
        if (customerRepository.existsByUsername(customerRegisterRequest.getUsername())) {
            throw new EntityExistsException("User with username: " + customerRegisterRequest.getUsername() + " already exists.");
        }
        if (customerRepository.existsByPhoneNumber(customerRegisterRequest.getPhoneNumber())) {
            throw new EntityExistsException("User with phone number: " + customerRegisterRequest.getPhoneNumber() + " already exists.");
        }
        Customer customer = customerFromRegisterRequest(customerRegisterRequest);
        customer.setRoles(Set.of(Role.ROLE_CUSTOMER));
        customerRepository.save(customer);
    }

    public void registerMain(String username, String password, Set<Role> roles) {
        if (customerRepository.existsByUsername(username))
            throw new EntityExistsException("User with username: " + username + " already exists.");
        Customer customer = new Customer();
        customer.setUsername(username);
        customer.setPassword(passwordEncoder.encode(password));
        customer.setRoles(roles);
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

    public CustomerResponse update(Long id, @Valid CustomerPutRequest customerPutRequest) {
        if (id == 1 || id == 2) {
            throw new SecurityException("User with id: " + id + " cannot be updated.");
        }
        Customer customer = customerFromPutRequest(customerPutRequest);
        customer.setId(id);
        customer.setRoles(Set.of(Role.ROLE_CUSTOMER));
        customer.setUsername(customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User with id: " + id + " not found")).getUsername());
        customer.setPassword(customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User with id: " + id + " not found")).getPassword());
        return customerResponseFromEntity(customerRepository.save(customer));
    }

    public void delete(Long id) {
        if (id == 1 || id == 2) {
            throw new SecurityException("User with id: " + id + " cannot be deleted.");
        }
        customerRepository.deleteById(id);
    }

    public CustomerResponse updatePassword(Long id, String password, String oldPassword) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User with id: " + id + " not found"));
        if (!passwordEncoder.matches(oldPassword, customer.getPassword()))
            throw new SecurityException("Old password is incorrect.");
        customer.setPassword(passwordEncoder.encode(password));
        return customerResponseFromEntity(customerRepository.save(customer));
    }

    public CustomerResponse updateUsername(Long id, String username) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User with id: " + id + " not found"));
        if (customerRepository.existsByUsername(username))
            throw new EntityExistsException("User with username: " + username + " already exists.");
        customer.setUsername(username);
        return customerResponseFromEntity(customerRepository.save(customer));
    }

    public CustomerResponse updateLastPaymentDate(Long id, LocalDate lastPaymentDate) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User with id: " + id + " not found"));
        customer.setLastPaymentDate(lastPaymentDate);
        return customerResponseFromEntity(customerRepository.save(customer));
    }
}