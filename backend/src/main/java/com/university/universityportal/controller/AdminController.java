package com.university.universityportal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.university.universityportal.model.Course;
import com.university.universityportal.model.Role;
import com.university.universityportal.model.User;
import com.university.universityportal.repository.CourseRepository;
import com.university.universityportal.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public AdminController(UserRepository userRepository,
                           CourseRepository courseRepository) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }
 // 1️⃣ Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
 // 2️⃣ Create new course
    @PostMapping("/courses")
    public Course createCourse(@RequestParam String courseName,
                               @RequestParam Long facultyId) {

        User faculty = userRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        Course course = new Course();
        course.setCourseName(courseName);
        course.setFaculty(faculty);

        return courseRepository.save(course);
    }
    @PostMapping("/course/{courseId}/faculty/{facultyId}")
    public String assignFacultyToCourse(@PathVariable Long courseId,
                                        @PathVariable Long facultyId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        User faculty = userRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        // Optional safety check
        if (faculty.getRole() != Role.FACULTY) {
            return "User is not a faculty!";
        }


        course.setFaculty(faculty);
        courseRepository.save(course);

        return "Faculty assigned successfully!";
    }


}
