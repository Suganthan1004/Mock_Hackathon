package com.university.universityportal.repository;

import com.university.universityportal.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByCourseIdAndDate(Long courseId, LocalDate date);

    List<Attendance> findByStudentId(Long studentId);
    
    List<Attendance> findByCourseIdAndDateBetween(
            Long courseId,
            LocalDate from,
            LocalDate to
    );
    List<Attendance> findByCourseId(Long courseId);

}
