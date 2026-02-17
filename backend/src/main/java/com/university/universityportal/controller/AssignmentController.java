package com.university.universityportal.controller;

import com.university.universityportal.model.Assignment;
import com.university.universityportal.model.Submission;
import com.university.universityportal.service.AssignmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping("/course/{courseId}")
    public List<Assignment> getAssignmentsByCourse(@PathVariable Long courseId) {
        return assignmentService.getAssignmentsByCourse(courseId);
    }

    @PostMapping("/create")
    public Assignment createAssignment(@RequestParam Long courseId,
                                       @RequestParam String title,
                                       @RequestParam String description) {
        return assignmentService.createAssignment(courseId, title, description);
    }

    @PostMapping("/upload")
    public String uploadAssignment(@RequestParam Long assignmentId,
                                   @RequestParam Long studentId,
                                   @RequestParam String fileName) {
        return assignmentService.uploadAssignment(assignmentId, studentId, fileName);
    }

    @GetMapping("/student/{studentId}")
    public List<Submission> getSubmissionsByStudent(@PathVariable Long studentId) {
        return assignmentService.getSubmissionsByStudent(studentId);
    }
}
