package com.university.portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/university")
@RequiredArgsConstructor
public class UniversityController {

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
                List<Map<String, Object>> events = List.of(
                                Map.of("id", 1, "title", "Annual Tech Fest 2026", "date", "2026-03-15",
                                                "description",
                                                "Join us for three days of innovation, workshops, and competitions.",
                                                "category", "Academic", "location", "Main Auditorium"),
                                Map.of("id", 2, "title", "Guest Lecture: AI in Healthcare", "date", "2026-02-28",
                                                "description",
                                                "Distinguished lecture by Dr. Priya Sharma on AI applications in modern healthcare.",
                                                "category", "Lecture", "location", "Seminar Hall B"),
                                Map.of("id", 3, "title", "Cultural Night 2026", "date", "2026-04-05",
                                                "description",
                                                "An evening of music, dance, and drama performances by our talented students.",
                                                "category", "Cultural", "location", "Open Air Theatre"),
                                Map.of("id", 4, "title", "Hackathon: Code for Good", "date", "2026-03-22",
                                                "description",
                                                "24-hour hackathon to build solutions for social good. Cash prizes for top teams!",
                                                "category", "Competition", "location", "CS Building"));

                List<Map<String, Object>> news = List.of(
                                Map.of("id", 1, "title", "University Ranked in Top 50 Nationally",
                                                "date", "2026-02-10", "content",
                                                "Vel Tech University has been ranked among the top 50 universities in India."),
                                Map.of("id", 2, "title", "New AI Research Lab Inaugurated",
                                                "date", "2026-02-05", "content",
                                                "State-of-the-art AI and ML research laboratory opened with industry partnerships."),
                                Map.of("id", 3, "title", "Record Campus Placements",
                                                "date", "2026-01-28", "content",
                                                "95% placement rate achieved with top companies like Google, Microsoft, and Amazon."));

                return ResponseEntity.ok(Map.of("events", events, "news", news));
        }
}
