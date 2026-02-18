package com.university.portal.controller;

import com.university.portal.entity.AIFeedback;
import com.university.portal.repository.AIFeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ai-feedback")
@RequiredArgsConstructor
public class AIFeedbackController {

    private final AIFeedbackRepository aiFeedbackRepository;

    @GetMapping("/submission/{submissionId}")
    public ResponseEntity<?> getBySubmission(@PathVariable Long submissionId) {
        AIFeedback feedback = aiFeedbackRepository.findBySubmissionId(submissionId).orElse(null);

        if (feedback == null) {
            return ResponseEntity.notFound().build();
        }

        // Parse suggestions from JSON string
        List<String> suggestions = new ArrayList<>();
        if (feedback.getSuggestions() != null) {
            try {
                String raw = feedback.getSuggestions().replaceAll("[\\[\\]\"]", "");
                suggestions = Arrays.asList(raw.split(",\\s*"));
            } catch (Exception e) {
                suggestions = List.of(feedback.getSuggestions());
            }
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("submissionId", submissionId);
        result.put("grammarScore", feedback.getGrammarScore());
        result.put("relevanceScore", feedback.getRelevanceScore());
        result.put("originalityScore", feedback.getOriginalityScore());
        result.put("overallScore", feedback.getOverallScore());
        result.put("summary", feedback.getSummary());
        result.put("suggestions", suggestions);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/submission/{submissionId}")
    public ResponseEntity<?> saveFeedback(@PathVariable Long submissionId, @RequestBody Map<String, Object> body) {
        AIFeedback feedback = aiFeedbackRepository.findBySubmissionId(submissionId)
                .orElse(AIFeedback.builder().submissionId(submissionId).build());

        feedback.setGrammarScore((Integer) body.getOrDefault("grammarScore", 0));
        feedback.setRelevanceScore((Integer) body.getOrDefault("relevanceScore", 0));
        feedback.setOriginalityScore((Integer) body.getOrDefault("originalityScore", 0));
        feedback.setOverallScore((Integer) body.getOrDefault("overallScore", 0));
        feedback.setSummary((String) body.getOrDefault("summary", ""));

        Object suggestionsObj = body.get("suggestions");
        if (suggestionsObj instanceof List) {
            feedback.setSuggestions(suggestionsObj.toString());
        }

        aiFeedbackRepository.save(feedback);

        return ResponseEntity.ok(Map.of("message", "Feedback saved", "id", feedback.getId()));
    }
}
