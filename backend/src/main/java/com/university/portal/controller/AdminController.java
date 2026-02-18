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
}
