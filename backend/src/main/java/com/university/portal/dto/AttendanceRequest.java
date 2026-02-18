package com.university.portal.dto;

import lombok.Data;
import java.util.List;

@Data
public class AttendanceRequest {
    private String courseId;
    private String date;
    private String facultyId;
    private List<AttendanceRecord> records;

    @Data
    public static class AttendanceRecord {
        private String studentId;
        private String status; // "present" or "absent"
    }
}
