package com.university.universityportal.controller;

import com.university.universityportal.dto.RegisterRequest;
import com.university.universityportal.model.User;
import com.university.universityportal.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists!";
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        userRepository.save(user);

        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String login(@RequestBody RegisterRequest request) {

        return userRepository.findByEmail(request.getEmail())
                .filter(user -> user.getPassword().equals(request.getPassword()))
                .map(user -> "Login successful! Role: " + user.getRole())
                .orElse("Invalid email or password");
    }
}
