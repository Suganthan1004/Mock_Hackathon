package com.university.portal.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_id", nullable = false, unique = true)
    private String courseId;

    @Column(nullable = false)
    private String name;

    private String department;
    private String duration;
    private String degree;

    @Column(length = 1000)
    private String description;

    @ManyToMany
    @JoinTable(
        name = "course_students",
        joinColumns = @JoinColumn(name = "course_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<User> students;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private User faculty;
}
