package com.university.universityportal.controller;

import com.university.universityportal.model.Submission;
import com.university.universityportal.repository.SubmissionRepository;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai-feedback")
public class AIFeedbackController {

    private final SubmissionRepository submissionRepository;

    public AIFeedbackController(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    @GetMapping("/submission/{submissionId}")
    public Submission getFeedback(@PathVariable Long submissionId) {
        return submissionRepository.findById(submissionId).orElseThrow();
    }

    @PostMapping("/re-evaluate/{submissionId}")
    public String reEvaluate(@PathVariable Long submissionId) {
        Submission submission = submissionRepository.findById(submissionId).orElseThrow();

        submission.setAiFeedback("Improved logic. Add more real-world examples.");
        submission.setScore(92.0);

        submissionRepository.save(submission);

        return "AI Re-evaluated Successfully!";
    }
}
