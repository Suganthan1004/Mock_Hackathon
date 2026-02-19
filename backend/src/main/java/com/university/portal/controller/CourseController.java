package com.university.portal.controller;

import com.university.portal.entity.Course;

import com.university.portal.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses/")
@RequiredArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;

    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        List<Map<String, Object>> result = courses.stream().map(c -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", c.getId());
            map.put("courseId", c.getCourseId());
            map.put("name", c.getName());
            map.put("department", c.getDepartment());
            map.put("duration", c.getDuration());
            map.put("degree", c.getDegree());
            map.put("description", c.getDescription());
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{courseId}/students")
    public ResponseEntity<?> getStudentsByCourse(@PathVariable String courseId) {
        Course course = courseRepository.findByCourseId(courseId).orElse(null);
        if (course == null) {
            return ResponseEntity.notFound().build();
        }

        List<Map<String, Object>> students = course.getStudents().stream().map(s -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", s.getStudentId() != null ? s.getStudentId() : "STU" + String.format("%03d", s.getId()));
            map.put("studentId", s.getStudentId());
            map.put("name", s.getName());
            map.put("email", s.getEmail());
            map.put("department", s.getDepartment());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(students);
    }
}
