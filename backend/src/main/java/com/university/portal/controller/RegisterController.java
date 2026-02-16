package com.university.portal.controller;

import com.university.portal.entity.User;
import com.university.portal.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RegisterController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String name = body.get("name");
        String role = body.get("role");
        String department = body.get("department");

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }

        // Generate studentId for students
        String studentId = null;
        if ("STUDENT".equalsIgnoreCase(role)) {
            long count = userRepository.count();
            studentId = "STU" + String.format("%03d", count + 1);
        }

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(User.Role.valueOf(role.toUpperCase()))
                .department(department)
                .studentId(studentId)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "message", "Registration successful",
                "id", user.getId()));
    }
}
