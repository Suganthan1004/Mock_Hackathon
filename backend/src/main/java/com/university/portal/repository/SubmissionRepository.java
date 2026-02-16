package com.university.portal.repository;

import com.university.portal.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByStudentId(String studentId);
    List<Submission> findByCourseId(String courseId);
    List<Submission> findByAssignmentId(Long assignmentId);
}
