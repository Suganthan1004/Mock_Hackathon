package com.university.universityportal.dto;

import com.university.universityportal.model.Role;

public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private Role role;

    public RegisterRequest() {
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }
}
