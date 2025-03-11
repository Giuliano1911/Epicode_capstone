package com.pt.Capstone.exceptions;


import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerClass {
    @ExceptionHandler(value = EntityNotFoundException.class)
    protected ResponseEntity<Error> entityNotFound(EntityNotFoundException ex) {
        Error error = new Error();
        error.setMessage("Entity not found");
        error.setDetails(ex.getMessage());
        error.setStatus("404");
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = EntityExistsException.class)
    protected ResponseEntity<Error> alreadyExistsException(EntityExistsException ex) {
        Error error = new Error();
        error.setMessage("Entity already exists");
        error.setDetails(ex.getMessage());
        error.setStatus("409");
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = SecurityException.class)
    protected ResponseEntity<Error> securityException(SecurityException ex) {
        Error error = new Error();
        error.setMessage("Security exception");
        error.setDetails(ex.getMessage());
        error.setStatus("403");
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(value = IllegalStateException.class)
    protected ResponseEntity<Error> illegalStateException(IllegalStateException ex) {
        Error error = new Error();
        error.setMessage("Illegal state exception");
        error.setDetails(ex.getMessage());
        error.setStatus("400");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}