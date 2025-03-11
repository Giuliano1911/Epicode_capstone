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
            customerService.registerMain("admin", "adminpwd", Set.of(Role.ROLE_ADMIN));
        }

        Optional<Customer> trainerUser = customerService.findByUsername("trainer");
        if (trainerUser.isEmpty()) {
            customerService.registerMain("trainer", "trainerpwd", Set.of(Role.ROLE_PERSONALTRAINER));
        }

        Optional<Customer> customerUser = customerService.findByUsername("customer1");
        if (customerUser.isEmpty()) {
            customerService.register(new CustomerRegisterRequest("customer1", "customerpwd", "customern1", "customers", LocalDate.of(2000, 1, 1), "3282327890"));
        }

        Optional<Customer> customerUser1 = customerService.findByUsername("customer2");
        if (customerUser.isEmpty()) {
            customerService.register(new CustomerRegisterRequest("customer2", "customerpwd", "customern2", "customers", LocalDate.of(2000, 1, 1), "3282327840"));
        }

        Optional<Customer> customerUser2 = customerService.findByUsername("customer3");
        if (customerUser.isEmpty()) {
            customerService.register(new CustomerRegisterRequest("customer3", "customerpwd", "customern3", "customers", LocalDate.of(2000, 1, 1), "3282324890"));
        }

    }
}
