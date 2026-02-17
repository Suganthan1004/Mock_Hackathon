package com.university.universityportal.service;

import com.university.universityportal.model.Attendance;
import com.university.universityportal.model.Submission;
import com.university.universityportal.repository.AttendanceRepository;
import com.university.universityportal.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final AttendanceRepository attendanceRepository;
    private final SubmissionRepository submissionRepository;

    public DashboardService(AttendanceRepository attendanceRepository,
                            SubmissionRepository submissionRepository) {
        this.attendanceRepository = attendanceRepository;
        this.submissionRepository = submissionRepository;
    }

    public Map<String, Object> getStudentDashboard(Long studentId) {

        // 🔹 Attendance Data
        List<Attendance> records = attendanceRepository.findByStudentId(studentId);

        long totalClasses = records.size();
        long presentCount = records.stream()
                .filter(a -> "PRESENT".equalsIgnoreCase(a.getStatus()))
                .count();

        double attendancePercentage = totalClasses == 0 ? 0 :
                ((double) presentCount / totalClasses) * 100;

        // 🔹 Assignment Data
        List<Submission> submissions = submissionRepository.findByStudentId(studentId);

        long totalSubmissions = submissions.size();

        double averageScore = submissions.stream()
                .mapToDouble(Submission::getScore)
                .average()
                .orElse(0.0);

        // 🔹 Response
        Map<String, Object> response = new HashMap<>();
        response.put("totalClasses", totalClasses);
        response.put("attendancePercentage", attendancePercentage);
        response.put("totalSubmissions", totalSubmissions);
        response.put("averageScore", averageScore);

        return response;
    }
}
