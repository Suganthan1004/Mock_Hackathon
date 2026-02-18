package com.university.portal.repository;

import com.university.portal.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByCourseIdAndDate(String courseId, LocalDate date);
    List<Attendance> findByCourseIdAndDateBetween(String courseId, LocalDate from, LocalDate to);
    List<Attendance> findByStudentId(String studentId);
    List<Attendance> findByCourseId(String courseId);
}
