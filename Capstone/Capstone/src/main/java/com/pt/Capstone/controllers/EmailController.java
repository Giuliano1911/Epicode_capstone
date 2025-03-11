package com.pt.Capstone.controllers;

import com.pt.Capstone.requests.EmailRequest;
import com.pt.Capstone.services.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void sendEmail(@RequestBody EmailRequest EmailRequest) {
        try {
            emailService.sendEmail("giulyannio.torros@gmail.com", "Richiesta di informazioni da " + EmailRequest.getEmail(), "Nome: " + EmailRequest.getName() + "\nCognome: " + EmailRequest.getSurname() + "\nRichiesta: " + EmailRequest.getText());
        } catch (MessagingException e) {
            System.out.println("Error sending email: " + e.getMessage());
        }
    }
}
