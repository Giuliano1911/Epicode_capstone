package com.pt.Capstone.services;

import com.pt.Capstone.entities.Customer;
import com.pt.Capstone.entities.Reservation;
import com.pt.Capstone.repositories.CustomerRepository;
import com.pt.Capstone.repositories.ReservationRepository;
import com.pt.Capstone.requests.ReservationRequest;
import com.pt.Capstone.responses.EntityPostResponse;
import com.pt.Capstone.responses.ReservationResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Validated
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    public ReservationResponse ReservationResponseFromReservation(Reservation reservation) {
        ReservationResponse reservationResponse = new ReservationResponse();
        BeanUtils.copyProperties(reservation, reservationResponse);
        reservationResponse.setCustomerResponse(customerService.customerResponseFromEntity(customerRepository.findById(reservation.getCustomer().getId()).orElseThrow(() -> new EntityNotFoundException("Customer with id: " + reservation.getCustomer().getId() + " not found"))));
        return reservationResponse;
    }

    public List<ReservationResponse> ReservationResponseListFromReservationList(List<Reservation> reservations) {
        return reservations.stream().map(this::ReservationResponseFromReservation).toList();
    }

    public ReservationResponse findById(Long id) {
        return ReservationResponseFromReservation(reservationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Reservation with id: " + id + " not found")));
    }

    public EntityPostResponse save(@Valid ReservationRequest reservationRequest) {
        Reservation reservation = new Reservation();
        BeanUtils.copyProperties(reservationRequest, reservation);
        reservation.setCustomer(customerRepository.findById(reservationRequest.getCustomerId()).orElseThrow(() -> new EntityNotFoundException("Customer with id: " + reservationRequest.getCustomerId() + " not found")));
        reservationRepository.save(reservation);
        return new EntityPostResponse(reservation.getId());
    }

    public ReservationResponse update(Long id, @Valid ReservationRequest reservationRequest) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Reservation with id: " + id + " not found"));
        BeanUtils.copyProperties(reservationRequest, reservation);
        reservation.setCustomer(customerRepository.findById(reservationRequest.getCustomerId()).orElseThrow(() -> new EntityNotFoundException("Customer with id: " + reservationRequest.getCustomerId() + " not found")));
        return ReservationResponseFromReservation(reservationRepository.save(reservation));
    }

    public List<ReservationResponse> findByCustomer(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Customer with id: " + id + " not found"));
        List<Reservation> reservations = reservationRepository.findByCustomer(customer);
        return ReservationResponseListFromReservationList(reservations);
    }

    public List<ReservationResponse> findByDate(LocalDate date) {
        List<Reservation> reservations = reservationRepository.findByDate(date);
        return ReservationResponseListFromReservationList(reservations);
    }

    public void delete(Long id) {
        reservationRepository.deleteById(id);
    }
}
