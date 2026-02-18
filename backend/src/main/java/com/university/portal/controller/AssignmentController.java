package com.university.portal.controller;

import com.university.portal.entity.Assignment;
import com.university.portal.entity.Submission;
import com.university.portal.repository.AssignmentRepository;
import com.university.portal.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getByCourse(@PathVariable String courseId) {
        List<Assignment> assignments = assignmentRepository.findByCourseId(courseId);
        List<Map<String, Object>> result = assignments.stream().map(a -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", a.getId());
            map.put("title", a.getTitle());
            map.put("description", a.getDescription());
            map.put("courseId", a.getCourseId());
            map.put("dueDate", a.getDueDate() != null ? a.getDueDate().toString() : null);
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadAssignment(
            @RequestParam("file") MultipartFile file,
            @RequestParam("courseId") String courseId,
            @RequestParam("assignmentId") String assignmentId,
            @RequestParam("studentId") String studentId) {

        try {
            // Save file
            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            file.transferTo(filePath.toFile());

            // Create submission
            Submission submission = Submission.builder()
                    .assignmentId(Long.parseLong(assignmentId))
                    .studentId(studentId)
                    .courseId(courseId)
                    .fileUrl(filePath.toString())
                    .fileName(file.getOriginalFilename())
                    .status(Submission.Status.SUBMITTED)
                    .build();

            submission = submissionRepository.save(submission);

            return ResponseEntity.ok(Map.of(
                    "message", "Assignment uploaded successfully",
                    "submissionId", submission.getId(),
                    "fileName", file.getOriginalFilename()));

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "File upload failed: " + e.getMessage()));
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getByStudent(@PathVariable String studentId) {
        List<Submission> submissions = submissionRepository.findByStudentId(studentId);

        List<Map<String, Object>> result = submissions.stream().map(s -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", s.getId());
            map.put("assignmentId", s.getAssignmentId());
            map.put("courseId", s.getCourseId());
            map.put("fileName", s.getFileName());
            map.put("status", s.getStatus().name());
            map.put("score", s.getScore());
            map.put("submittedAt", s.getSubmittedAt() != null ? s.getSubmittedAt().toString() : null);

            // Get assignment title
            Assignment assignment = assignmentRepository.findById(s.getAssignmentId()).orElse(null);
            map.put("assignmentTitle",
                    assignment != null ? assignment.getTitle() : "Assignment #" + s.getAssignmentId());

            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/course/{courseId}/submissions")
    public ResponseEntity<?> getSubmissionsByCourse(@PathVariable String courseId) {
        List<Submission> submissions = submissionRepository.findByCourseId(courseId);

        List<Map<String, Object>> result = submissions.stream().map(s -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", s.getId());
            map.put("assignmentId", s.getAssignmentId());
            map.put("studentId", s.getStudentId());
            map.put("courseId", s.getCourseId());
            map.put("fileName", s.getFileName());
            map.put("status", s.getStatus().name());
            map.put("score", s.getScore());
            map.put("submittedAt", s.getSubmittedAt() != null ? s.getSubmittedAt().toString() : null);

            // Get assignment title
            Assignment assignment = assignmentRepository.findById(s.getAssignmentId()).orElse(null);
            map.put("assignmentTitle",
                    assignment != null ? assignment.getTitle() : "Assignment #" + s.getAssignmentId());

            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
}
