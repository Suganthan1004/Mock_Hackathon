package com.university.universityportal.controller;

import com.university.universityportal.dto.AttendanceRequest;
import com.university.universityportal.model.Attendance;
import com.university.universityportal.model.Course;
import com.university.universityportal.model.User;
import com.university.universityportal.repository.AttendanceRepository;
import com.university.universityportal.repository.CourseRepository;
import com.university.universityportal.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public AttendanceController(
            AttendanceRepository attendanceRepository,
            CourseRepository courseRepository,
            UserRepository userRepository) {
        this.attendanceRepository = attendanceRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public String markAttendance(@RequestBody AttendanceRequest request) {

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        User student = userRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Attendance attendance = new Attendance();
        attendance.setCourse(course);
        attendance.setStudent(student);
        attendance.setDate(request.getDate());
        attendance.setStatus(request.getStatus());

        attendanceRepository.save(attendance);

        return "Attendance marked successfully!";
    }

    @GetMapping("/course/{courseId}/date/{date}")
    public List<Attendance> getAttendanceByDate(
            @PathVariable Long courseId,
            @PathVariable String date) {

        return attendanceRepository.findByCourseIdAndDate(
                courseId,
                LocalDate.parse(date)
        );
    }
    @GetMapping("/student/{studentId}")
    public List<Attendance> getAttendanceByStudent(@PathVariable Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }
    
    
    @GetMapping("/course/{courseId}")
    public List<Attendance> getAttendanceReport(
            @PathVariable Long courseId,
            @RequestParam LocalDate from,
            @RequestParam LocalDate to
    ) {

        return attendanceRepository.findByCourseIdAndDateBetween(courseId, from, to);
    }


}
