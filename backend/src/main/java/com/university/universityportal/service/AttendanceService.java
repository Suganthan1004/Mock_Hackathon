package com.university.universityportal.service;

import com.university.universityportal.model.Attendance;
import com.university.universityportal.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<Attendance> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    public List<Attendance> getAttendanceByCourseAndDate(Long courseId, LocalDate date) {
        return attendanceRepository.findByCourseIdAndDate(courseId, date);
    }

    public List<Attendance> getAttendanceReport(Long courseId,
                                                LocalDate from,
                                                LocalDate to) {
        return attendanceRepository
                .findByCourseIdAndDateBetween(courseId, from, to);
    }
}
