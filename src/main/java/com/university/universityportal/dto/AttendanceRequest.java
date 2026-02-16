package com.university.universityportal.dto;

import java.time.LocalDate;

public class AttendanceRequest {

    private Long courseId;
    private Long studentId;
    private LocalDate date;
    private String status; // PRESENT or ABSENT

    public AttendanceRequest() {}

    public Long getCourseId() {
        return courseId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getStatus() {
        return status;
    }
}
