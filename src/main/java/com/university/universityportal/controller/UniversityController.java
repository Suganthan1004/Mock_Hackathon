package com.university.universityportal.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/university")
public class UniversityController {

    // 1️⃣ University Info
    @GetMapping("/info")
    public Map<String, Object> getUniversityInfo() {

        return Map.of(
                "name", "Vel Tech Rangarajana Dr.Sagunthala R&D Institute of Science and Technology",
                "motto", "Empowering Innovation Through Education",
                "establishedYear", 1998,
                "location", "Chennai, India",
                "contactEmail", "info@futuretech.edu"
        );
    }

    // 2️⃣ University Events
    @GetMapping("/events")
    public List<Map<String, Object>> getEvents() {

        return List.of(
                Map.of(
                        "id", 1,
                        "title", "Tech Hackathon 2026",
                        "date", "2026-03-10",
                        "description", "Annual coding and innovation challenge."
                ),
                Map.of(
                        "id", 2,
                        "title", "AI & ML Workshop",
                        "date", "2026-03-20",
                        "description", "Hands-on workshop on AI tools."
                )
        );
    }
}
