package com.pt.Capstone.services;

import com.pt.Capstone.entities.Customer;
import com.pt.Capstone.entities.TrainingDay;
import com.pt.Capstone.entities.TrainingWeek;
import com.pt.Capstone.repositories.CustomerRepository;
import com.pt.Capstone.repositories.TrainingDayRepository;
import com.pt.Capstone.repositories.TrainingWeekRepository;
import com.pt.Capstone.requests.TrainingWeekNameRequest;
import com.pt.Capstone.responses.CustomerResponse;
import com.pt.Capstone.responses.TrainingWeekResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@RequiredArgsConstructor
@Validated
public class TrainingWeekService {
    private final TrainingWeekRepository trainingWeekRepository;
    private final TrainingDayRepository trainingDayRepository;
    private final CustomerRepository customerRepository;
    private final CustomerService customerService;

    public TrainingWeekResponse TrainingWeekResponseFromTrainingWeek(TrainingWeek trainingWeek) {
        TrainingWeekResponse trainingWeekResponse = new TrainingWeekResponse();
        trainingWeekResponse.setId(trainingWeek.getId());
        trainingWeekResponse.setName(trainingWeek.getName());
        CustomerResponse customerResponse =  customerService.customerResponseFromEntity(customerRepository.findById(trainingWeek.getCustomer().getId()).orElseThrow(() -> new EntityNotFoundException("Customer with id: " + trainingWeek.getCustomer().getId() + " not found")));
        trainingWeekResponse.setCustomerResponse(customerResponse);
        trainingWeekResponse.setTrainingDays(trainingDayRepository.findAllById(trainingWeek.getTrainingDays().stream().map(TrainingDay::getId).toList()));
        return trainingWeekResponse;
    }

    public TrainingWeekResponse findById(Long id) {
        TrainingWeek trainingWeek = trainingWeekRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("TrainingWeek with id: " + id + " not found"));
        return TrainingWeekResponseFromTrainingWeek(trainingWeek);
    }

    public TrainingWeekResponse save(Long id,@Valid TrainingWeekNameRequest trainingWeekNameRequest) {
        TrainingWeek trainingWeek = new TrainingWeek();
        TrainingDay trainingDay1 = new TrainingDay();
        trainingDay1.setDay("Monday");
        trainingDayRepository.save(trainingDay1);

        TrainingDay trainingDay2 = new TrainingDay();
        trainingDay2.setDay("Tuesday");
        trainingDayRepository.save(trainingDay2);

        TrainingDay trainingDay3 = new TrainingDay();
        trainingDay3.setDay("Wednesday");
        trainingDayRepository.save(trainingDay3);

        TrainingDay trainingDay4 = new TrainingDay();
        trainingDay4.setDay("Thursday");
        trainingDayRepository.save(trainingDay4);

        TrainingDay trainingDay5 = new TrainingDay();
        trainingDay5.setDay("Friday");
        trainingDayRepository.save(trainingDay5);

        TrainingDay trainingDay6 = new TrainingDay();
        trainingDay6.setDay("Saturday");
        trainingDayRepository.save(trainingDay6);

        TrainingDay trainingDay7 = new TrainingDay();
        trainingDay7.setDay("Sunday");
        trainingDayRepository.save(trainingDay7);

        trainingWeek.getTrainingDays().add(trainingDay1);
        trainingWeek.getTrainingDays().add(trainingDay2);
        trainingWeek.getTrainingDays().add(trainingDay3);
        trainingWeek.getTrainingDays().add(trainingDay4);
        trainingWeek.getTrainingDays().add(trainingDay5);
        trainingWeek.getTrainingDays().add(trainingDay6);
        trainingWeek.getTrainingDays().add(trainingDay7);

        Customer customer = customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Customer with id: " + id + " not found"));
        trainingWeek.setCustomer(customer);


        trainingWeek.setName(trainingWeekNameRequest.getName());

        trainingWeekRepository.save(trainingWeek);

        return TrainingWeekResponseFromTrainingWeek(trainingWeek);
    }

    public List<TrainingWeekResponse> findByCustomer(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Customer with id: " + id + " not found"));
        List<TrainingWeek> trainingWeeks = trainingWeekRepository.findByCustomer(customer);
        return trainingWeeks.stream().map(this::TrainingWeekResponseFromTrainingWeek).toList();
    }

    public void delete(Long id) {
        trainingWeekRepository.deleteById(id);
    }
}
