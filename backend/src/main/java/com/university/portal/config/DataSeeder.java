package com.university.portal.config;

import com.university.portal.entity.*;
import com.university.portal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

        private final UserRepository userRepository;
        private final CourseRepository courseRepository;
        private final AssignmentRepository assignmentRepository;
        private final PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) {
                if (userRepository.count() > 0)
                        return; // Already seeded

                // ── Users ──────────────────────────────────────────────
                User student1 = userRepository.save(User.builder()
                                .name("Arjun Sharma").email("arjun@veltech.edu")
                                .password(passwordEncoder.encode("student123"))
                                .role(User.Role.STUDENT).department("Computer Science").studentId("STU001").build());

                User student2 = userRepository.save(User.builder()
                                .name("Priya Patel").email("priya@veltech.edu")
                                .password(passwordEncoder.encode("student123"))
                                .role(User.Role.STUDENT).department("Computer Science").studentId("STU002").build());

                User student3 = userRepository.save(User.builder()
                                .name("Rahul Verma").email("rahul@veltech.edu")
                                .password(passwordEncoder.encode("student123"))
                                .role(User.Role.STUDENT).department("Computer Science").studentId("STU003").build());

                User student4 = userRepository.save(User.builder()
                                .name("Sneha Gupta").email("sneha@veltech.edu")
                                .password(passwordEncoder.encode("student123"))
                                .role(User.Role.STUDENT).department("Computer Science").studentId("STU004").build());

                User student5 = userRepository.save(User.builder()
                                .name("Vikram Singh").email("vikram@veltech.edu")
                                .password(passwordEncoder.encode("student123"))
                                .role(User.Role.STUDENT).department("Electronics").studentId("STU005").build());

                User student6 = userRepository.save(User.builder()
                                .name("Ananya Reddy").email("ananya@veltech.edu")
                                .password(passwordEncoder.encode("student123"))
                                .role(User.Role.STUDENT).department("Computer Science").studentId("STU006").build());

                User student7 = userRepository.save(User.builder()
                                .name("Karthik Nair").email("karthik@veltech.edu")
                                .password(passwordEncoder.encode("student123"))
                                .role(User.Role.STUDENT).department("Computer Science").studentId("STU007").build());

                User student8 = userRepository.save(User.builder()
                                .name("Meera Joshi").email("meera@veltech.edu")
                                .password(passwordEncoder.encode("student123"))
                                .role(User.Role.STUDENT).department("Computer Science").studentId("STU008").build());

                User faculty1 = userRepository.save(User.builder()
                                .name("Dr. Ramesh Kumar").email("ramesh@veltech.edu")
                                .password(passwordEncoder.encode("faculty123"))
                                .role(User.Role.FACULTY).department("Computer Science").build());

                User faculty2 = userRepository.save(User.builder()
                                .name("Dr. Lakshmi Iyer").email("lakshmi@veltech.edu")
                                .password(passwordEncoder.encode("faculty123"))
                                .role(User.Role.FACULTY).department("Computer Science").build());

                // ── Courses ────────────────────────────────────────────
                courseRepository.save(Course.builder()
                                .courseId("CS201").name("Data Structures").department("Computer Science")
                                .degree("B.Tech").duration("4 Years")
                                .description("Study of fundamental data structures including arrays, linked lists, trees, and graphs.")
                                .faculty(faculty1)
                                .students(List.of(student1, student2, student3, student4, student5, student6, student7,
                                                student8))
                                .build());

                courseRepository.save(Course.builder()
                                .courseId("CS202").name("Database Management").department("Computer Science")
                                .degree("B.Tech").duration("4 Years")
                                .description("Relational databases, SQL, normalization, and transaction management.")
                                .faculty(faculty1)
                                .students(List.of(student1, student4, student5, student6))
                                .build());

                courseRepository.save(Course.builder()
                                .courseId("CS301").name("Machine Learning").department("Computer Science")
                                .degree("M.Tech").duration("2 Years")
                                .description("Introduction to ML algorithms, neural networks, and deep learning fundamentals.")
                                .faculty(faculty2)
                                .students(List.of(student2, student3, student5, student7))
                                .build());

                courseRepository.save(Course.builder()
                                .courseId("CS305").name("Web Development").department("Computer Science")
                                .degree("B.Tech").duration("4 Years")
                                .description("Full-stack web development with React, Node.js, and modern web technologies.")
                                .faculty(faculty2)
                                .students(List.of(student1, student2, student3, student4, student8))
                                .build());

                courseRepository.save(Course.builder()
                                .courseId("CS204").name("Computer Networks").department("Computer Science")
                                .degree("B.Tech").duration("4 Years")
                                .description("Network protocols, TCP/IP, routing, switching, and network security.")
                                .faculty(faculty1)
                                .students(List.of(student6, student7, student8))
                                .build());

                // ── Assignments ────────────────────────────────────────
                assignmentRepository.saveAll(List.of(
                                Assignment.builder().title("Lab 1 - Linked Lists").courseId("CS201")
                                                .dueDate(LocalDate.of(2026, 2, 28))
                                                .description(
                                                                "Implement singly and doubly linked lists with insert, delete, and search operations.")
                                                .build(),
                                Assignment.builder().title("Lab 2 - Binary Trees").courseId("CS201")
                                                .dueDate(LocalDate.of(2026, 3, 10))
                                                .description("Implement a binary search tree with traversal algorithms.")
                                                .build(),
                                Assignment.builder().title("Lab 3 - Graph Algorithms").courseId("CS201")
                                                .dueDate(LocalDate.of(2026, 3, 20))
                                                .description("Implement BFS and DFS graph traversal algorithms.")
                                                .build(),

                                Assignment.builder().title("ER Diagram Design").courseId("CS202")
                                                .dueDate(LocalDate.of(2026, 2, 25))
                                                .description("Design an ER diagram for a university management system.")
                                                .build(),
                                Assignment.builder().title("SQL Queries Assignment").courseId("CS202")
                                                .dueDate(LocalDate.of(2026, 3, 5))
                                                .description("Write SQL queries for CRUD operations and joins.")
                                                .build(),
                                Assignment.builder().title("Normalization Exercise").courseId("CS202")
                                                .dueDate(LocalDate.of(2026, 3, 15))
                                                .description("Normalize a given schema to 3NF.").build(),

                                Assignment.builder().title("Project Proposal").courseId("CS301")
                                                .dueDate(LocalDate.of(2026, 3, 1))
                                                .description("Submit a proposal for your ML research project.").build(),
                                Assignment.builder().title("Literature Review").courseId("CS301")
                                                .dueDate(LocalDate.of(2026, 3, 12))
                                                .description("Review 5 research papers and summarize findings.")
                                                .build(),
                                Assignment.builder().title("Model Implementation").courseId("CS301")
                                                .dueDate(LocalDate.of(2026, 3, 25))
                                                .description("Implement and train a classification model.").build(),

                                Assignment.builder().title("React App Development").courseId("CS305")
                                                .dueDate(LocalDate.of(2026, 2, 28))
                                                .description("Build a task management app using React.").build(),
                                Assignment.builder().title("REST API Design").courseId("CS305")
                                                .dueDate(LocalDate.of(2026, 3, 8))
                                                .description("Design and document RESTful APIs for your project.")
                                                .build(),
                                Assignment.builder().title("Full Stack Project").courseId("CS305")
                                                .dueDate(LocalDate.of(2026, 3, 22))
                                                .description("Complete full-stack project with frontend and backend.")
                                                .build(),

                                Assignment.builder().title("TCP/IP Analysis").courseId("CS204")
                                                .dueDate(LocalDate.of(2026, 3, 3))
                                                .description("Capture and analyze TCP/IP packets using Wireshark.")
                                                .build(),
                                Assignment.builder().title("Network Simulation").courseId("CS204")
                                                .dueDate(LocalDate.of(2026, 3, 13))
                                                .description("Simulate a network topology using Cisco Packet Tracer.")
                                                .build(),
                                Assignment.builder().title("Protocol Design").courseId("CS204")
                                                .dueDate(LocalDate.of(2026, 3, 23))
                                                .description("Design a custom application-layer protocol.").build()));

                System.out.println("✅ Database seeded with demo data!");
        }
}
