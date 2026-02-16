package com.university.portal.controller;

import com.university.portal.dto.AttendanceRequest;
import com.university.portal.entity.Attendance;
import com.university.portal.entity.User;
import com.university.portal.repository.AttendanceRepository;
import com.university.portal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> markAttendance(@RequestBody AttendanceRequest request) {
        LocalDate date = LocalDate.parse(request.getDate());

        List<Attendance> records = request.getRecords().stream().map(r -> {
            // Resolve student name
            String studentName = "";
            User student = userRepository.findByStudentId(r.getStudentId()).orElse(null);
            if (student != null)
                studentName = student.getName();

            return Attendance.builder()
                    .courseId(request.getCourseId())
                    .studentId(r.getStudentId())
                    .studentName(studentName)
                    .facultyId(request.getFacultyId())
                    .date(date)
                    .status(capitalize(r.getStatus()))
                    .build();
        }).collect(Collectors.toList());

        attendanceRepository.saveAll(records);

        return ResponseEntity.ok(Map.of(
                "message", "Attendance saved successfully",
                "count", records.size()));
    }

    @GetMapping("/course/{courseId}/date/{date}")
    public ResponseEntity<?> getByDate(@PathVariable String courseId, @PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        List<Attendance> records = attendanceRepository.findByCourseIdAndDate(courseId, localDate);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("courseId", courseId);
        result.put("date", date);
        result.put("students", records.stream().map(r -> Map.of(
                "studentId", r.getStudentId(),
                "name", r.getStudentName() != null ? r.getStudentName() : "",
                "status", r.getStatus())).collect(Collectors.toList()));

        return ResponseEntity.ok(result);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getReport(
            @PathVariable String courseId,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to) {

        List<Attendance> records;

        if (from != null && to != null) {
            records = attendanceRepository.findByCourseIdAndDateBetween(courseId, LocalDate.parse(from),
                    LocalDate.parse(to));
        } else {
            records = attendanceRepository.findByCourseId(courseId);
        }

        // Group by date
        Map<LocalDate, List<Attendance>> grouped = records.stream()
                .collect(Collectors.groupingBy(Attendance::getDate));

        List<Map<String, Object>> result = grouped.entrySet().stream()
                .sorted(Map.Entry.<LocalDate, List<Attendance>>comparingByKey().reversed())
                .map(entry -> {
                    Map<String, Object> dayReport = new LinkedHashMap<>();
                    dayReport.put("courseId", courseId);
                    dayReport.put("date", entry.getKey().toString());
                    dayReport.put("students", entry.getValue().stream().map(r -> Map.of(
                            "studentId", r.getStudentId(),
                            "name", r.getStudentName() != null ? r.getStudentName() : "",
                            "status", r.getStatus())).collect(Collectors.toList()));
                    return dayReport;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getByStudent(@PathVariable String studentId) {
        List<Attendance> records = attendanceRepository.findByStudentId(studentId);

        long total = records.size();
        long present = records.stream().filter(r -> "Present".equalsIgnoreCase(r.getStatus())).count();
        double percentage = total > 0 ? Math.round((double) present / total * 100) : 0;

        return ResponseEntity.ok(Map.of(
                "studentId", studentId,
                "totalClasses", total,
                "present", present,
                "absent", total - present,
                "percentage", percentage,
                "records", records.stream().map(r -> Map.of(
                        "courseId", r.getCourseId(),
                        "date", r.getDate().toString(),
                        "status", r.getStatus())).collect(Collectors.toList())));
    }

    private String capitalize(String str) {
        if (str == null || str.isBlank())
            return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }
}
