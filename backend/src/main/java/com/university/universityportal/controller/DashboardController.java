package com.university.universityportal.controller;

import com.university.universityportal.repository.AttendanceRepository;
import com.university.universityportal.repository.CourseRepository;
import com.university.universityportal.service.DashboardService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final AttendanceRepository attendanceRepository;
    private final CourseRepository courseRepository;

    // ✅ Proper Constructor
    public DashboardController(DashboardService dashboardService,
                               AttendanceRepository attendanceRepository,
                               CourseRepository courseRepository) {

        this.dashboardService = dashboardService;
        this.courseRepository = courseRepository;
        this.attendanceRepository = attendanceRepository;
           // ✅ FIXED
    }

    // ================= STUDENT DASHBOARD =================
    @GetMapping("/student/{studentId}")
    public Map<String, Object> getStudentDashboard(@PathVariable Long studentId) {
        return dashboardService.getStudentDashboard(studentId);
    }

    // ================= FACULTY DASHBOARD =================
    @GetMapping("/faculty/{facultyId}")
    public Map<String, Object> getFacultyDashboard(@PathVariable Long facultyId) {

        long totalCourses = courseRepository.countByFacultyId(facultyId);

        long totalStudents = attendanceRepository.countStudentsByFacultyId(facultyId);

        Map<String, Object> response = new HashMap<>();
        response.put("totalCourses", totalCourses);
        response.put("totalStudents", totalStudents);

        return response;
    }
}

