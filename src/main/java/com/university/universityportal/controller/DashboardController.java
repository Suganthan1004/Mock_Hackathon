package com.university.universityportal.controller;

import com.university.universityportal.service.DashboardService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/student/{studentId}")
    public Map<String, Object> getStudentDashboard(@PathVariable Long studentId) {
        return dashboardService.getStudentDashboard(studentId);
    }
}

