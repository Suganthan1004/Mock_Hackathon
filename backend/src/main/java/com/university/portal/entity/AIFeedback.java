package com.university.portal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ai_feedback")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "submission_id", nullable = false)
    private Long submissionId;

    @Column(name = "grammar_score")
    private Integer grammarScore;

    @Column(name = "relevance_score")
    private Integer relevanceScore;

    @Column(name = "originality_score")
    private Integer originalityScore;

    @Column(name = "overall_score")
    private Integer overallScore;

    @Column(length = 2000)
    private String summary;

    @Column(length = 3000)
    private String suggestions; // stored as JSON string
}
