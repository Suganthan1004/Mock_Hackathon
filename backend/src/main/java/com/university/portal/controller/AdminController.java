package com.university.portal.controller;

import com.university.portal.entity.Event;
import com.university.portal.entity.News;
import com.university.portal.repository.EventRepository;
import com.university.portal.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final EventRepository eventRepository;
    private final NewsRepository newsRepository;

    // ── Events CRUD ────────────────────────────────────

    @GetMapping("/events")
    public ResponseEntity<?> getAllEvents() {
        return ResponseEntity.ok(eventRepository.findAllByOrderByDateDesc());
    }

    @PostMapping("/events")
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        Event saved = eventRepository.save(event);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(event.getTitle());
                    existing.setDescription(event.getDescription());
                    existing.setDate(event.getDate());
                    existing.setCategory(event.getCategory());
                    existing.setTag(event.getTag());
                    existing.setLocation(event.getLocation());
                    return ResponseEntity.ok(eventRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));
    }

    // ── News CRUD ──────────────────────────────────────

    @GetMapping("/news")
    public ResponseEntity<?> getAllNews() {
        return ResponseEntity.ok(newsRepository.findAllByOrderByDateDesc());
    }

    @PostMapping("/news")
    public ResponseEntity<?> createNews(@RequestBody News news) {
        News saved = newsRepository.save(news);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/news/{id}")
    public ResponseEntity<?> updateNews(@PathVariable Long id, @RequestBody News news) {
        return newsRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(news.getTitle());
                    existing.setDescription(news.getDescription());
                    existing.setDate(news.getDate());
                    existing.setContent(news.getContent());
                    return ResponseEntity.ok(newsRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/news/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        if (!newsRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        newsRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "News deleted successfully"));
    }

    // ── Users CRUD ──────────────────────────────────────

    private final com.university.portal.repository.UserRepository userRepository;
    private final com.university.portal.repository.CourseRepository courseRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody com.university.portal.entity.User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Generate studentId if student
        if (user.getRole() == com.university.portal.entity.User.Role.STUDENT && user.getStudentId() == null) {
            long count = userRepository.count();
            user.setStudentId("STU" + String.format("%03d", count + 1));
        }

        return ResponseEntity.ok(userRepository.save(user));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody com.university.portal.entity.User user) {
        return userRepository.findById(id)
                .map(existing -> {
                    existing.setName(user.getName());
                    existing.setEmail(user.getEmail());
                    existing.setRole(user.getRole());
                    existing.setDepartment(user.getDepartment());
                    if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                        existing.setPassword(passwordEncoder.encode(user.getPassword()));
                    }
                    // Handle studentId update if needed, but usually it's static
                    return ResponseEntity.ok(userRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    // ── Courses CRUD ────────────────────────────────────

    @GetMapping("/courses")
    public ResponseEntity<?> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @PostMapping("/courses")
    public ResponseEntity<?> createCourse(@RequestBody com.university.portal.entity.Course course) {
        if (courseRepository.findByCourseId(course.getCourseId()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Course ID already exists"));
        }
        return ResponseEntity.ok(courseRepository.save(course));
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id,
            @RequestBody com.university.portal.entity.Course course) {
        return courseRepository.findById(id)
                .map(existing -> {
                    existing.setName(course.getName());
                    existing.setDepartment(course.getDepartment());
                    existing.setDuration(course.getDuration());
                    existing.setDegree(course.getDegree());
                    existing.setDescription(course.getDescription());
                    // existing.setCourseId(course.getCourseId()); // Usually don't update ID
                    return ResponseEntity.ok(courseRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        if (!courseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        courseRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Course deleted successfully"));
    }
}
