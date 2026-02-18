-- ═══════════════════════════════════════════════════════════
-- University Portal — Complete MySQL Database Setup
-- ═══════════════════════════════════════════════════════════

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS university_portal;
USE university_portal;

-- ─────────────────────────────────────────────────────────
-- TABLE: users
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'FACULTY', 'ADMIN') NOT NULL,
    department VARCHAR(255),
    student_id VARCHAR(255) UNIQUE
);

-- ─────────────────────────────────────────────────────────
-- TABLE: courses
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    duration VARCHAR(255),
    degree VARCHAR(255),
    description VARCHAR(1000),
    faculty_id BIGINT,
    FOREIGN KEY (faculty_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ─────────────────────────────────────────────────────────
-- TABLE: course_students (Many-to-Many join table)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS course_students (
    course_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    PRIMARY KEY (course_id, student_id),
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────
-- TABLE: assignments
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assignments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    course_id VARCHAR(255) NOT NULL,
    due_date DATE
);

-- ─────────────────────────────────────────────────────────
-- TABLE: submissions
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    assignment_id BIGINT NOT NULL,
    student_id VARCHAR(255) NOT NULL,
    course_id VARCHAR(255) NOT NULL,
    file_url VARCHAR(255),
    file_name VARCHAR(255),
    status ENUM('PENDING', 'SUBMITTED', 'EVALUATED') NOT NULL DEFAULT 'SUBMITTED',
    score INT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────
-- TABLE: attendance
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id VARCHAR(255) NOT NULL,
    student_id VARCHAR(255) NOT NULL,
    student_name VARCHAR(255),
    faculty_id VARCHAR(255),
    date DATE NOT NULL,
    status VARCHAR(255) NOT NULL
);

-- ─────────────────────────────────────────────────────────
-- TABLE: ai_feedback
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    submission_id BIGINT NOT NULL,
    grammar_score INT,
    relevance_score INT,
    originality_score INT,
    overall_score INT,
    summary VARCHAR(2000),
    suggestions VARCHAR(3000)
);

-- ─────────────────────────────────────────────────────────
-- TABLE: events
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    date DATE NOT NULL,
    category VARCHAR(255) NOT NULL,
    tag VARCHAR(255),
    location VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────
-- TABLE: news
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS news (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    date DATE NOT NULL,
    content VARCHAR(2000),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- ═══════════════════════════════════════════════════════════
-- SEED DATA
-- ═══════════════════════════════════════════════════════════

-- Passwords are BCrypt encoded. The raw passwords are shown in comments.

-- ─── Users ──────────────────────────────────────────────
-- admin@veltech.edu / admin123
INSERT INTO users (name, email, password, role, department, student_id) VALUES
('Admin', 'admin@veltech.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyed1eMPGQ.7RJh1BDj4RqRMQWbJ5YK1Wy', 'ADMIN', 'Administration', NULL);

-- john@veltech.edu / student123
INSERT INTO users (name, email, password, role, department, student_id) VALUES
('John Doe', 'john@veltech.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyed1eMPGQ.7RJh1BDj4RqRMQWbJ5YK1Wy', 'STUDENT', 'Computer Science', 'STU001');

-- jane@veltech.edu / student123
INSERT INTO users (name, email, password, role, department, student_id) VALUES
('Jane Smith', 'jane@veltech.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyed1eMPGQ.7RJh1BDj4RqRMQWbJ5YK1Wy', 'STUDENT', 'Computer Science', 'STU002');

-- prof.williams@veltech.edu / faculty123
INSERT INTO users (name, email, password, role, department, student_id) VALUES
('Prof. Williams', 'prof.williams@veltech.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyed1eMPGQ.7RJh1BDj4RqRMQWbJ5YK1Wy', 'FACULTY', 'Computer Science', NULL);

-- ─── Courses ────────────────────────────────────────────
INSERT INTO courses (course_id, name, department, duration, degree, description, faculty_id) VALUES
('CS101', 'Data Structures & Algorithms', 'Computer Science', '4 months', 'B.Tech', 'Learn fundamental data structures including arrays, linked lists, trees, graphs and sorting algorithms.', 4),
('CS102', 'Web Development', 'Computer Science', '4 months', 'B.Tech', 'Full-stack web development with HTML, CSS, JavaScript, React, and Spring Boot.', 4),
('CS103', 'Machine Learning', 'Computer Science', '4 months', 'M.Tech', 'Introduction to machine learning algorithms, neural networks, and deep learning.', 4);

-- ─── Assignments ────────────────────────────────────────
INSERT INTO assignments (title, description, course_id, due_date) VALUES
('DSA Assignment 1', 'Implement a linked list with insert, delete, and search operations.', 'CS101', '2026-03-15'),
('Web Dev Project', 'Build a responsive portfolio website using React.', 'CS102', '2026-03-20'),
('ML Report', 'Write a report on supervised vs unsupervised learning algorithms.', 'CS103', '2026-03-25');

-- ─── Events ─────────────────────────────────────────────
INSERT INTO events (title, description, date, category, tag, location) VALUES
('Annual Tech Fest 2026', 'Join us for three days of innovation, workshops, and competitions featuring industry leaders and student projects.', '2026-03-15', 'upcoming', 'Technology', 'Main Auditorium'),
('Cultural Night 2026', 'An evening of music, dance, and drama performances by our talented students from all departments.', '2026-04-05', 'upcoming', 'Culture', 'Open Air Theatre'),
('Hackathon: Code for Good', '24-hour hackathon to build solutions for social good. Cash prizes worth ₹1,00,000 for top teams!', '2026-03-22', 'upcoming', 'Hackathon', 'CS Block Lab'),
('Guest Lecture: AI in Healthcare', 'Distinguished lecture by Dr. Priya Sharma on AI applications in modern healthcare and diagnostics.', '2026-02-28', 'upcoming', 'Research', 'Seminar Hall B'),
('Spring Semester Hackathon', '48-hour coding challenge to build innovative solutions. Open to all departments.', '2026-03-01', 'ongoing', 'Hackathon', 'Innovation Lab'),
('International Research Conference', 'Present your research papers and collaborate with scholars from across the globe.', '2026-04-20', 'upcoming', 'Research', 'Conference Center');

-- ─── News ───────────────────────────────────────────────
INSERT INTO news (title, description, date, content) VALUES
('University Ranked #5 Nationally', 'Vel Tech University climbs to 5th position in the national university rankings for engineering excellence.', '2026-02-10', 'The annual national ranking survey has placed Vel Tech University at the 5th position among private engineering institutions.'),
('New AI Research Lab Inaugurated', 'State-of-the-art AI and Machine Learning research lab inaugurated by the Vice Chancellor.', '2026-02-08', 'The new AI lab features high-performance computing clusters and is open to all research scholars.'),
('Placement Record: 95% Students Placed', 'This year''s placement drive achieves a record 95% placement rate across all departments.', '2026-02-05', 'Top recruiters include Google, Microsoft, Amazon, and TCS. The average package has increased by 20% compared to last year.'),
('New Hostel Block Construction Begins', 'Construction of a new 500-bed hostel block has commenced, expected completion by December 2026.', '2026-02-01', 'The new hostel will feature modern amenities including a gym, reading room, and high-speed internet.');
