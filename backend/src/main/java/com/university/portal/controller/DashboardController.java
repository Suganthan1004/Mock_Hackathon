package com.university.portal.controller;

import com.university.portal.entity.*;
import com.university.portal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final SubmissionRepository submissionRepository;
    private final AttendanceRepository attendanceRepository;
    private final CourseRepository courseRepository;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> studentDashboard(@PathVariable String studentId) {
        List<Submission> submissions = submissionRepository.findByStudentId(studentId);

        long total = submissions.size();
        long evaluated = submissions.stream().filter(s -> s.getStatus() == Submission.Status.EVALUATED).count();
        long pending = submissions.stream()
                .filter(s -> s.getStatus() == Submission.Status.SUBMITTED || s.getStatus() == Submission.Status.PENDING)
                .count();
        double avgScore = submissions.stream()
                .filter(s -> s.getScore() != null)
                .mapToInt(Submission::getScore)
                .average()
                .orElse(0);

        // Attendance summary
        List<Attendance> attendance = attendanceRepository.findByStudentId(studentId);
        long totalClasses = attendance.size();
        long presentCount = attendance.stream().filter(a -> "Present".equalsIgnoreCase(a.getStatus())).count();
        double attendancePercent = totalClasses > 0 ? Math.round((double) presentCount / totalClasses * 100) : 0;

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalAssignments", total);
        result.put("evaluated", evaluated);
        result.put("pending", pending);
        result.put("avgScore", Math.round(avgScore));
        result.put("attendancePercent", attendancePercent);
        result.put("totalClasses", totalClasses);
        result.put("presentClasses", presentCount);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/faculty/{facultyId}")
    public ResponseEntity<?> facultyDashboard(@PathVariable String facultyId) {
        Long fId;
        try {
            fId = Long.parseLong(facultyId);
        } catch (NumberFormatException e) {
            fId = null;
        }

        // Get courses taught by this faculty
        List<Course> courses = fId != null ? courseRepository.findByFacultyId(fId) : courseRepository.findAll();

        List<Map<String, Object>> courseData = courses.stream().map(c -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("courseId", c.getCourseId());
            map.put("courseName", c.getName());
            map.put("students", c.getStudents() != null ? c.getStudents().size() : 0);

            // Today's attendance
            List<Attendance> todayAtt = attendanceRepository.findByCourseIdAndDate(c.getCourseId(), LocalDate.now());
            if (!todayAtt.isEmpty()) {
                long present = todayAtt.stream().filter(a -> "Present".equalsIgnoreCase(a.getStatus())).count();
                map.put("todayAttendance", present);
            } else {
                map.put("todayAttendance", null);
            }
            return map;
        }).collect(Collectors.toList());

        // Recent attendance across all courses
        final List<Map<String, Object>> recent = new ArrayList<>();
        for (Course c : courses) {
            List<Attendance> all = attendanceRepository.findByCourseId(c.getCourseId());
            Map<LocalDate, List<Attendance>> grouped = all.stream().collect(Collectors.groupingBy(Attendance::getDate));
            grouped.entrySet().stream()
                    .sorted(Map.Entry.<LocalDate, List<Attendance>>comparingByKey().reversed())
                    .limit(3)
                    .forEach(entry -> {
                        long present = entry.getValue().stream().filter(a -> "Present".equalsIgnoreCase(a.getStatus()))
                                .count();
                        recent.add(Map.of(
                                "date", entry.getKey().toString(),
                                "course", c.getCourseId(),
                                "present", present,
                                "total", entry.getValue().size()));
                    });
        }

        // Sort by date descending and limit
        recent.sort((a, b) -> String.valueOf(b.get("date")).compareTo(String.valueOf(a.get("date"))));
        List<Map<String, Object>> recentLimited = recent.size() > 10 ? recent.subList(0, 10) : recent;

        return ResponseEntity.ok(Map.of(
                "courses", courseData,
                "recentAttendance", recentLimited));
    }
}
