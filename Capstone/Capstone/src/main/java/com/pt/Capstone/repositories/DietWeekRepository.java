package com.pt.Capstone.repositories;

import com.pt.Capstone.entities.Customer;
import com.pt.Capstone.entities.DietWeek;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DietWeekRepository extends JpaRepository<DietWeek, Long> {

    List<DietWeek> findByCustomer(Customer customer);
}
