package com.pt.Capstone.entities;

import com.pt.Capstone.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private String name;

    private String surname;

    private LocalDate dateOfBirth;

    @Column(unique = true, length = 10)
    private String phoneNumber;

    private LocalDate lastPaymentDate;

    private String avatar = "https://res.cloudinary.com/dmalqg6rj/image/upload/v1741866174/CustomerAvatar/standardpic.png";

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;

}