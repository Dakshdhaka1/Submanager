package com.submanager.subscriptionmanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle "Subscription not found" errors
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(RuntimeException ex) {
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("message", ex.getMessage());
        error.put("status", 404);
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // Handle validation errors (@NotBlank, @Positive, etc.)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, Object> error = new HashMap<>();
        Map<String, String> fieldErrors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(e ->
                fieldErrors.put(e.getField(), e.getDefaultMessage())
        );

        error.put("timestamp", LocalDateTime.now());
        error.put("message", "Validation failed");
        error.put("errors", fieldErrors);
        error.put("status", 400);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
