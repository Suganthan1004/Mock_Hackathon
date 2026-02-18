package com.university.portal.controller;

import com.university.portal.repository.EventRepository;
import com.university.portal.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/university")
@RequiredArgsConstructor
public class UniversityController {

        private final EventRepository eventRepository;
        private final NewsRepository newsRepository;

        @GetMapping("/info")
        public ResponseEntity<?> getInfo() {
                Map<String, Object> info = new LinkedHashMap<>();
                info.put("name", "Vel Tech University");
                info.put("established", 2005);
                info.put("location", "Bangalore, India");
                info.put("description",
                                "A premier institution committed to academic excellence, innovation, and holistic development.");
                info.put("stats", Map.of(
                                "students", 5000,
                                "faculty", 200,
                                "courses", 50,
                                "campusAcres", 120));
                return ResponseEntity.ok(info);
        }

        @GetMapping("/events")
        public ResponseEntity<?> getEvents() {
                return ResponseEntity.ok(Map.of(
                                "events", eventRepository.findAllByOrderByDateDesc(),
                                "news", newsRepository.findAllByOrderByDateDesc()));
        }

        @GetMapping("/events/{id}")
        public ResponseEntity<?> getEventById(@PathVariable Long id) {
                return eventRepository.findById(id)
                                .map(ResponseEntity::ok)
                                .orElse(ResponseEntity.notFound().build());
        }
}
