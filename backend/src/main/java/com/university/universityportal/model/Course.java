package com.university.universityportal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Course {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;

    @ManyToOne
    private User faculty;

	public Course(Long id, String courseName, User faculty) {
		super();
		this.id = id;
		this.courseName = courseName;
		this.faculty = faculty;
	}

	public Course() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public User getFaculty() {
		return faculty;
	}

	public void setFaculty(User faculty) {
		this.faculty = faculty;
	}
    
}
