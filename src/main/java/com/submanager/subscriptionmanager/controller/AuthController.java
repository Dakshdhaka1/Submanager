package com.submanager.subscriptionmanager.controller;

import com.submanager.subscriptionmanager.Dto.AuthRequest;
import com.submanager.subscriptionmanager.Dto.AuthResponse;
import com.submanager.subscriptionmanager.Repository.UserRepository;
import com.submanager.subscriptionmanager.entity.User;
import com.submanager.subscriptionmanager.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // POST /api/auth/register → Create a new user
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody AuthRequest request) {

        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body(
                    AuthResponse.builder()
                            .message("Username already taken!")
                            .build()
            );
        }

        // Create the user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))  // ENCRYPT the password!
                .role("USER")
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        // Generate token for the new user
        String token = jwtService.generateToken(user);

        return new ResponseEntity<>(
                AuthResponse.builder()
                        .token(token)
                        .username(user.getUsername())
                        .message("Registration successful!")
                        .build(),
                HttpStatus.CREATED
        );
    }

    // POST /api/auth/login → Login and get a JWT token
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {

        // Authenticate (checks username + password against DB)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // If we reach here, authentication passed! Load the user
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();

        // Generate token
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
                AuthResponse.builder()
                        .token(token)
                        .username(user.getUsername())
                        .message("Login successful!")
                        .build()
        );
    }
}
