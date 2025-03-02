package com.pt.Capstone.runners;

import com.pt.Capstone.entities.Customer;
import com.pt.Capstone.enums.Role;
import com.pt.Capstone.requests.CustomerRegisterRequest;
import com.pt.Capstone.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class AuthRunner implements ApplicationRunner {

    private final CustomerService customerService;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        Optional<Customer> adminUser = customerService.findByUsername("admin");
        if (adminUser.isEmpty()) {
            customerService.register(new CustomerRegisterRequest("admin", "adminpwd", "adminn", "admins", LocalDate.of(2000, 1, 1), "3332327890", Set.of(Role.ROLE_ADMIN)));
        }

        Optional<Customer> trainerUser = customerService.findByUsername("trainer");
        if (trainerUser.isEmpty()) {
            customerService.register(new CustomerRegisterRequest("trainer", "trainerpwd", "trainern", "trainers", LocalDate.of(2000, 1, 1), "3452327890", Set.of(Role.ROLE_PERSONALTRAINER)));
        }

        Optional<Customer> customerUser = customerService.findByUsername("customer");
        if (customerUser.isEmpty()) {
            customerService.register(new CustomerRegisterRequest("customer1", "customerpwd", "customern", "customers", LocalDate.of(2000, 1, 1), "3282327890", Set.of(Role.ROLE_CUSTOMER)));
        }

    }
}
