package com.university.portal.repository;

import com.university.portal.entity.AIFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AIFeedbackRepository extends JpaRepository<AIFeedback, Long> {
    Optional<AIFeedback> findBySubmissionId(Long submissionId);
}
