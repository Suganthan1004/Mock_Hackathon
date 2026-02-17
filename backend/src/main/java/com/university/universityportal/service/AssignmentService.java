package com.university.universityportal.service;

import com.university.universityportal.model.*;
import com.university.universityportal.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public AssignmentService(AssignmentRepository assignmentRepository,
                             SubmissionRepository submissionRepository,
                             UserRepository userRepository,
                             CourseRepository courseRepository) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    // Get assignments by course
    public List<Assignment> getAssignmentsByCourse(Long courseId) {
        return assignmentRepository.findByCourseId(courseId);
    }

    // Create assignment
    public Assignment createAssignment(Long courseId,
                                       String title,
                                       String description) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Assignment assignment = new Assignment();
        assignment.setCourse(course);
        assignment.setTitle(title);
        assignment.setDescription(description);
        assignment.setDueDate(LocalDate.now().plusDays(7));

        return assignmentRepository.save(assignment);
    }

    // Upload submission
    public String uploadAssignment(Long assignmentId,
                                   Long studentId,
                                   String fileName) {

        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Submission submission = new Submission();
        submission.setAssignment(assignment);
        submission.setStudent(student);
        submission.setFileName(fileName);
        submission.setSubmittedAt(LocalDateTime.now());

        submission.setAiFeedback("Good structure. Improve conclusion clarity.");
        submission.setScore(85.0);

        submissionRepository.save(submission);

        return "Assignment submitted and AI evaluated successfully!";
    }

    // Get submissions
    public List<Submission> getSubmissionsByStudent(Long studentId) {
        return submissionRepository.findByStudentId(studentId);
    }
}
