package com.university.portal.repository;

import com.university.portal.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCourseId(String courseId);
    List<Course> findByFacultyId(Long facultyId);
}
