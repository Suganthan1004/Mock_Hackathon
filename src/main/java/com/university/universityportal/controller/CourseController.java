package com.university.universityportal.controller;

import com.university.universityportal.model.Attendance;
import com.university.universityportal.model.Course;
import com.university.universityportal.model.User;
import com.university.universityportal.repository.AttendanceRepository;
import com.university.universityportal.repository.CourseRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;
    private final AttendanceRepository attendanceRepository;

    public CourseController(CourseRepository courseRepository,
                            AttendanceRepository attendanceRepository) {
        this.courseRepository = courseRepository;
        this.attendanceRepository = attendanceRepository;
    }

    // 1️⃣ Get all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // 2️⃣ Get students of a course
    @GetMapping("/{courseId}/students")
    public List<User> getStudentsOfCourse(@PathVariable Long courseId) {

        return attendanceRepository.findByCourseId(courseId)
                .stream()
                .map(Attendance::getStudent)
                .distinct()
                .toList();
    }
}
