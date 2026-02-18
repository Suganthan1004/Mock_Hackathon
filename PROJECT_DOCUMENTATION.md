# Vel Tech University Portal — Project Documentation

> **Date:** February 2026 | **Type:** Full-Stack Web Application

---

## 1. Project Overview

The **Vel Tech University Portal** is a role-based university management web application that serves three user types — **Students**, **Faculty**, and **Admins**. It provides a centralized platform for academic management including course browsing, assignment submission with AI-powered evaluation, attendance tracking, event & news management, and personalized dashboards.

---

## 2. Architecture

```
┌──────────────────────────────────────────────────┐
│                  FRONTEND (React)                │
│         http://localhost:5173 (Vite Dev)         │
│                                                  │
│   Pages · Components · Context · Services (API)  │
└──────────────────┬───────────────────────────────┘
                   │  REST API calls (Axios)
                   │  + JWT Bearer Token
                   ▼
┌──────────────────────────────────────────────────┐
│               BACKEND (Spring Boot)              │
│            http://localhost:8081                  │
│                                                  │
│   Controllers → Services → Repositories → JPA    │
│   Security (JWT + Role-Based Access Control)     │
└──────────────────┬───────────────────────────────┘
                   │  JDBC / Hibernate ORM
                   ▼
┌──────────────────────────────────────────────────┐
│              DATABASE (MySQL 8.x)                │
│         Schema: university_portal                │
│                                                  │
│   9 Tables: users, courses, course_students,     │
│   assignments, submissions, attendance,          │
│   ai_feedback, events, news                      │
└──────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

### 3.1 Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2.0 | UI library for building component-based interfaces |
| **Vite** | 7.3.1 | Fast build tool and dev server with Hot Module Replacement (HMR) |
| **React Router DOM** | 7.13.0 | Client-side routing with role-based protected routes |
| **Axios** | 1.13.5 | HTTP client for making REST API calls to the backend |
| **Vanilla CSS** | — | Custom styling with CSS variables, glassmorphism, and animations |
| **ESLint** | 9.39.1 | Code linting and quality enforcement |

**Why React?**
React's component-based architecture allows us to build reusable UI elements (Navbar, Sidebar, ConfirmDialog, etc.) and manage state efficiently with hooks (`useState`, `useEffect`, `useContext`). The virtual DOM ensures performant re-renders.

**Why Vite?**
Vite provides near-instant dev server startup and lightning-fast HMR compared to traditional bundlers like Webpack. This significantly speeds up development.

**Key Frontend Patterns:**
- **Context API** for global authentication state management (`AuthContext`)
- **Protected Routes** with role-based access control (`ProtectedRoute` component)
- **Axios Interceptors** for automatic JWT token injection on every API request
- **Responsive Design** with mobile-first CSS and media queries

---

### 3.2 Backend

| Technology | Version | Purpose |
|---|---|---|
| **Java** | 17 (LTS) | Programming language |
| **Spring Boot** | 3.2.2 | Application framework for rapid development |
| **Spring Web** | 6.x | RESTful API development with `@RestController` |
| **Spring Data JPA** | 3.x | ORM for database access using repository pattern |
| **Spring Security** | 6.2.1 | Authentication and authorization framework |
| **Hibernate** | 6.x | JPA implementation for object-relational mapping |
| **JJWT** | 0.12.3 | JSON Web Token generation, parsing, and validation |
| **Lombok** | Latest | Reduces boilerplate code (`@Data`, `@Builder`, etc.) |
| **MySQL Connector/J** | 8.x | JDBC driver for MySQL database connectivity |
| **Maven** | 3.x | Build tool and dependency management |

**Why Spring Boot?**
Spring Boot provides auto-configuration, embedded server (Tomcat), and a rich ecosystem of starters that eliminate boilerplate setup. It's the industry standard for Java-based REST APIs.

**Why JWT Authentication?**
JSON Web Tokens provide stateless authentication — the server doesn't need to store session data. The token contains the user's identity and role, making it ideal for REST APIs and scalable architectures.

**Backend Architecture:**
```
Controller Layer    →  Handles HTTP requests, input validation
    ↓
Service Layer       →  Business logic (implicit in controllers)
    ↓
Repository Layer    →  Spring Data JPA interfaces for DB operations
    ↓
Entity Layer        →  JPA entities mapped to database tables
    ↓
Security Layer      →  JWT filter, SecurityConfig, BCrypt passwords
```

---

### 3.3 Database

| Technology | Version | Purpose |
|---|---|---|
| **MySQL** | 8.x | Relational database management system |
| **Hibernate DDL Auto** | `update` | Auto-creates/updates tables from JPA entities |

**Database Schema — `university_portal`:**

| Table | Description | Key Columns |
|---|---|---|
| `users` | All platform users | id, name, email, password (BCrypt), role (STUDENT/FACULTY/ADMIN), department, student_id |
| `courses` | Course catalog | id, course_id, name, department, duration, degree, faculty_id (FK) |
| `course_students` | Many-to-many enrollment | course_id (FK), student_id (FK) |
| `assignments` | Faculty-created assignments | id, title, description, course_id, due_date |
| `submissions` | Student submissions | id, assignment_id, student_id, file_url, file_name, status, score, submitted_at |
| `attendance` | Daily attendance records | id, course_id, student_id, student_name, faculty_id, date, status |
| `ai_feedback` | AI evaluation results | id, submission_id, grammar_score, relevance_score, originality_score, overall_score, summary, suggestions |
| `events` | University events | id, title, description, date, category, tag, location, created_at |
| `news` | University news articles | id, title, description, date, content, created_at |

---

### 3.4 Security

| Mechanism | Implementation |
|---|---|
| **Password Hashing** | BCrypt via Spring Security's `PasswordEncoder` |
| **Authentication** | JWT-based stateless authentication |
| **Authorization** | Role-based access control (STUDENT, FACULTY, ADMIN) |
| **CORS** | Configured for `localhost:5173` and `localhost:3000` |
| **CSRF** | Disabled (stateless REST API) |
| **Session** | Stateless (`SessionCreationPolicy.STATELESS`) |
| **Token Expiry** | 24 hours (86,400,000 ms) |

**Auth Flow:**
```
1. User submits credentials → POST /api/auth/login
2. Backend validates → BCrypt password check
3. Backend generates JWT → Contains userId, email, role
4. Frontend stores JWT → localStorage
5. Every API call → Axios interceptor adds "Authorization: Bearer <token>"
6. Backend JwtAuthFilter → Validates token on every request
7. SecurityConfig → Checks role for protected endpoints
```

---

## 4. Features by Role

### 4.1 Public (No Login Required)
- 🏠 **Home Page** — University overview, dynamic events & news from database
- 📖 **About Page** — University information
- 📚 **Courses Page** — Browse all available courses
- 📅 **Event Detail Page** — Detailed view of individual events
- 🔐 **Login/Register** — Role-based authentication

### 4.2 Student
- 📊 **Dashboard** — Assignment stats (total, evaluated, pending), average score, attendance percentage
- 📝 **Assignment Submission** — Upload files for assignments, view submission history
- 🤖 **AI Feedback** — Receive AI-powered evaluation with scores for grammar, relevance, originality, and overall quality + improvement suggestions

### 4.3 Faculty
- 📊 **Dashboard** — Course overview, total students, today's attendance status
- 📝 **View Submissions** — Browse all student submissions per course, view AI feedback scores and suggestions in a modal
- ✅ **Mark Attendance** — Select course, date, and mark each student present/absent
- 📋 **Attendance Reports** — View historical attendance data with percentage calculations

### 4.4 Admin
- ⚙️ **Admin Panel** — Full CRUD management for events and news
- 📅 **Events Management** — Create, edit, delete campus events (with categories, tags, locations)
- 📰 **News Management** — Create, edit, delete news articles

---

## 5. API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/login` | User login, returns JWT | Public |
| POST | `/api/auth/register` | User registration | Public |

### University (Public)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/university/events` | List all events + news | Public |
| GET | `/api/university/events/{id}` | Single event detail | Public |
| GET | `/api/courses` | List all courses | Public |

### Student
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/dashboard/student/{id}` | Student dashboard data | Authenticated |
| GET | `/api/assignments/course/{courseId}` | Assignments for a course | Authenticated |
| POST | `/api/assignments/upload` | Submit assignment (multipart) | Authenticated |
| GET | `/api/assignments/student/{studentId}` | Student's submissions | Authenticated |
| GET | `/api/ai-feedback/submission/{id}` | AI feedback for a submission | Authenticated |

### Faculty
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/dashboard/faculty/{id}` | Faculty dashboard data | Authenticated |
| GET | `/api/assignments/course/{id}/submissions` | All submissions for a course | Authenticated |
| POST | `/api/attendance/mark` | Mark attendance | Authenticated |
| GET | `/api/attendance/course/{courseId}` | Attendance records | Authenticated |

### Admin
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/admin/events` | List all events | ADMIN |
| POST | `/api/admin/events` | Create event | ADMIN |
| PUT | `/api/admin/events/{id}` | Update event | ADMIN |
| DELETE | `/api/admin/events/{id}` | Delete event | ADMIN |
| GET | `/api/admin/news` | List all news | ADMIN |
| POST | `/api/admin/news` | Create news | ADMIN |
| PUT | `/api/admin/news/{id}` | Update news | ADMIN |
| DELETE | `/api/admin/news/{id}` | Delete news | ADMIN |

---

## 6. Project Structure

```
Mock_Hackathon/
├── backend/                          # Spring Boot Application
│   ├── pom.xml                       # Maven dependencies
│   └── src/main/java/com/university/portal/
│       ├── PortalApplication.java    # Spring Boot entry point
│       ├── config/
│       │   ├── SecurityConfig.java   # Spring Security + CORS config
│       │   ├── JwtAuthFilter.java    # JWT authentication filter
│       │   ├── JwtUtil.java          # JWT token utility
│       │   └── DataSeeder.java       # Initial seed data on startup
│       ├── controller/
│       │   ├── AuthController.java   # Login endpoint
│       │   ├── RegisterController.java# Registration
│       │   ├── UniversityController.java # Public events/news
│       │   ├── CourseController.java  # Course listing
│       │   ├── AssignmentController.java # Assignments + submissions
│       │   ├── AttendanceController.java # Attendance marking
│       │   ├── DashboardController.java  # Dashboard data
│       │   ├── AIFeedbackController.java # AI evaluation
│       │   └── AdminController.java  # Admin CRUD
│       ├── entity/                   # JPA Entities (8 entities)
│       │   ├── User.java, Course.java, Assignment.java,
│       │   ├── Submission.java, Attendance.java,
│       │   ├── AIFeedback.java, Event.java, News.java
│       └── repository/              # Spring Data JPA Repositories
│
├── frontend/                         # React Application
│   ├── package.json                  # NPM dependencies
│   ├── vite.config.js                # Vite configuration
│   └── src/
│       ├── App.jsx                   # Routes & layout
│       ├── context/
│       │   └── AuthContext.jsx       # Authentication state
│       ├── services/
│       │   └── api.js                # Axios API layer
│       ├── components/
│       │   ├── Navbar.jsx            # Top navigation
│       │   ├── Header.jsx            # University header/brand
│       │   ├── Footer.jsx            # Footer
│       │   ├── Sidebar.jsx           # Dashboard sidebar nav
│       │   ├── ProtectedRoute.jsx    # Role-based route guard
│       │   └── ConfirmDialog.jsx     # Reusable confirm popup
│       └── pages/                    # 14 page components
│           ├── Home.jsx, About.jsx, Courses.jsx
│           ├── Login.jsx, Register.jsx
│           ├── StudentDashboard.jsx, AssignmentSubmission.jsx
│           ├── AIFeedback.jsx, EventDetail.jsx
│           ├── FacultyDashboard.jsx, FacultySubmissions.jsx
│           ├── AttendanceMarking.jsx, AttendanceReport.jsx
│           └── AdminDashboard.jsx
│
└── database/
    └── university_portal.sql         # Complete DB schema + seed data
```

---

## 7. How to Run

### Prerequisites
- **Java 17+** (JDK)
- **Node.js 18+** (with npm)
- **MySQL 8.x** (running on port 3306)
- **Maven 3.x**

### Step 1: Database Setup
```sql
-- Open MySQL and run:
CREATE DATABASE IF NOT EXISTS university_portal;
-- Or import the full schema:
SOURCE database/university_portal.sql;
```

### Step 2: Backend
```bash
cd backend
mvn spring-boot:run
# Runs on http://localhost:8081
```

### Step 3: Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Default Credentials (from DataSeeder)
| Role | Email | Password |
|---|---|---|
| Admin | admin@veltech.edu | admin123 |
| Student | john@veltech.edu | student123 |
| Faculty | prof.williams@veltech.edu | faculty123 |

---

## 8. Key Design Decisions

| Decision | Rationale |
|---|---|
| **JWT over Sessions** | Stateless auth scales better, works naturally with REST APIs |
| **Hibernate DDL Auto = Update** | Auto-creates tables for rapid development, no manual migrations needed |
| **Context API over Redux** | Simpler state management sufficient for auth state; avoids over-engineering |
| **Vanilla CSS over Tailwind** | Full control over styling, dark theme with CSS variables, glassmorphism effects |
| **BCrypt Password Hashing** | Industry-standard one-way hashing with salt, resistant to brute-force attacks |
| **Local File Storage** | Sufficient for demo; can be upgraded to Supabase/S3 for production |
| **DataSeeder on Startup** | Pre-populates the database with demo data for immediate testing |
| **Confirmation Dialogs** | Custom styled modals for logout and delete actions to prevent accidental operations |

---

## 9. Future Enhancements

- ☁️ **Cloud Storage** — Migrate file uploads to Supabase Storage for multi-device access
- 🗃️ **Supabase/PostgreSQL** — Migrate from local MySQL to cloud-hosted PostgreSQL
- 📱 **Mobile Responsive** — Further optimize for mobile devices
- 📧 **Email Notifications** — Assignment deadlines, attendance alerts
- 📊 **Analytics Dashboard** — Charts and graphs for academic performance trends
- 🔔 **Push Notifications** — Real-time alerts for new events and announcements
