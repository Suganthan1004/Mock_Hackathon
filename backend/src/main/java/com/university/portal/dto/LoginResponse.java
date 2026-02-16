package com.university.portal.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private Long id;
    private String studentId;
    private String name;
    private String email;
    private String role;
    private String department;
    private String token;
}
