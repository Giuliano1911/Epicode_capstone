package com.pt.Capstone.repositories;

import com.pt.Capstone.entities.Customer;
import com.pt.Capstone.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {

    List<Reservation> findByCustomer(Customer customer);

    List<Reservation> findByDate(LocalDate date);
}
