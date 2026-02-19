# Backend Documentation — Vel Tech University Portal

> **Tech Stack:** Spring Boot 3.2 · Java 17 · MySQL · Spring Security (JWT) · Hibernate/JPA
> **Server Port:** `8081` · **Base URL:** `http://mock-hackathon.onrender.com/api`

---

## Table of Contents

1. [Project Structure Overview](#project-structure-overview)
2. [Configuration & Security](#configuration--security)
3. [Database Schema (Entities)](#database-schema-entities)
4. [API Endpoints (Controllers)](#api-endpoints-controllers)
5. [Data Transfer Objects (DTOs)](#data-transfer-objects-dtos)
6. [Repositories](#repositories)
7. [External Integrations](#external-integrations)

---

## Project Structure Overview

```
backend/src/main/java/com/university/portal/
├── UniversityPortalApplication.java    # Main Spring Boot entry point
│
├── config/
│   ├── SecurityConfig.java             # Spring Security & CORS config
│   └── DataSeeder.java                 # Database seeder (dev data)
│
├── security/
│   ├── JwtUtil.java                    # JWT generation & validation
│   └── JwtAuthFilter.java              # Request filter for token auth
│
├── entity/                             # JPA Entities (Database Tables)
│   ├── User.java, Course.java, Assignment.java, Submission.java
│   ├── Attendance.java, AIFeedback.java, Event.java, News.java
│
├── repository/                         # Spring Data JPA Interfaces
│   ├── UserRepository.java, CourseRepository.java, etc.
│
├── dto/                                # Data Transfer Objects
│   ├── LoginRequest.java, LoginResponse.java
│   └── AttendanceRequest.java
│
└── controller/                         # REST API Endpoints
    ├── AuthController.java             # Login & Registration
    ├── DashboardController.java        # Role-specific dashboards
    ├── CourseController.java           # Course management
    ├── AssignmentController.java       # Assignment upload/retrieval
    ├── AttendanceController.java       # Marking & Reporting
    ├── UniversityController.java       # Public info & Events
    ├── AdminController.java            # CRUD for Events/News
    └── AIFeedbackController.java       # AI Feedback handling
```

---

## Configuration & Security

### `application.properties`
- **Port:** `8081`
- **Database:** MySQL (`jdbc:mysql://localhost:3306/university_portal`)
- **JPA:** `hibernate.ddl-auto=update` (auto-updates schema)
- **File Upload:** Max 10MB, stores in `./uploads`
- **CORS:** Allowed origins `http://localhost:5173` (Frontend)

### `SecurityConfig.java`
**Purpose:** Configures the security filter chain.
- **CSRF:** Disabled (stateless API)
- **Session:** Stateless (JWT based)
- **Public Endpoints:** `/api/auth/**`, `/api/university/**`, `/api/courses`
- **Protected Endpoints:** All others require authentication. `/api/admin/**` requires `ADMIN` role.
- **CORS:** Configured to allow all standard methods (GET, POST, PUT, DELETE, OPTIONS).

### `JwtUtil.java`
**Purpose:** Helper for JWT operations.
- **Signing Key:** HMAC-SHA with secret from properties.
- **Expiration:** 24 hours (`86400000` ms).
- **Claims:** Stores `role` and `sub` (email).

### `JwtAuthFilter.java`
**Purpose:** Intercepts every request to check for valid `Authorization: Bearer <token>` header. If valid, sets the `SecurityContext` authentication.

---

## Database Schema (Entities)

### `User` (Table: `users`)
- **Roles:** `STUDENT`, `FACULTY`, `ADMIN`
- **Fields:** `id`, `name`, `email` (unique), `password` (BCrypt), `department`, `studentId` (for students)

### `Course` (Table: `courses`)
- **Fields:** `id`, `courseId` (String, e.g., "CS101"), `name`, `department`, `degree`, `description`
- **Relationships:**
  - `admin` (not explicitly mapped, course data is currently static/seeded)
  - `students` (ManyToMany with User)
  - `faculty` (ManyToOne with User)

### `Assignment` (Table: `assignments`)
- **Fields:** `id`, `title`, `description`, `dueDate`, `courseId`

### `Submission` (Table: `submissions`)
- **Fields:** `id`, `fileUrl`, `fileName`, `score`, `submittedAt`
- **Foreign Keys (Logical):** `assignmentId`, `studentId`, `courseId`
- **Status Enum:** `PENDING`, `SUBMITTED`, `EVALUATED`

### `Attendance` (Table: `attendance`)
- **Fields:** `id`, `date`, `status` ("Present"/"Absent"), `studentName`
- **Foreign Keys (Logical):** `courseId`, `studentId`, `facultyId`

### `AIFeedback` (Table: `ai_feedback`)
- **Fields:** `id`, `grammarScore`, `relevanceScore`, `originalityScore`, `overallScore`, `summary`, `suggestions` (JSON string)
- **Foreign Key:** `submissionId`

### `Event` (Table: `events`) & `News` (Table: `news`)
- **Common Fields:** `title`, `description`, `date`, `createdAt`
- **Event Specifics:** `category`, `tag`, `location`
- **News Specifics:** `content`

---

## API Endpoints (Controllers)

### 1. Authentication (`AuthController`, `RegisterController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Authenticates user, returns JWT and user details. |
| POST | `/api/auth/register` | Registers a new user (Student/Faculty). |
| GET | `/api/auth/me` | Returns current authenticated user's details. |

### 2. Dashboard (`DashboardController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/student/{id}` | Returns stats: assignments (total/evaluated), average score, attendance %. |
| GET | `/api/dashboard/faculty/{id}` | Returns stats: courses taught, recent attendance trends. |

### 3. Courses (`CourseController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Lists all courses. |
| GET | `/api/courses/{id}/students` | Lists all students enrolled in a specific course. |

### 4. Assignments (`AssignmentController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignments/course/{id}` | Lists assignments for a course. |
| POST | `/api/assignments/upload` | Uploads student assignment file (Multipart). |
| GET | `/api/assignments/student/{id}` | Lists a student's submissions with status/grades. |
| GET | `/api/assignments/course/{id}/submissions` | Lists all submissions for a course (Faculty view). |

### 5. Attendance (`AttendanceController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/attendance` | Marks attendance for multiple students. |
| GET | `/api/attendance/course/{id}` | Gets attendance report (supports date range filters). |
| GET | `/api/attendance/student/{id}` | Gets specific student's attendance record. |
| GET | `/api/attendance/course/{id}/date/{date}` | Gets attendance for a specific date. |

### 6. AI Feedback (`AIFeedbackController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ai-feedback/submission/{id}` | Retrieves AI evaluation for a submission. |
| POST | `/api/ai-feedback/submission/{id}` | Saves/Updates feedback (used by AI service or manual override). |

### 7. University Info (`UniversityController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/university/info` | Returns static university stats and description. |
| GET | `/api/university/events` | Lists all events and news. |
| GET | `/api/university/events/{id}` | Gets details for a single event. |

### 8. Admin (`AdminController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/events` | List all events (Admin view). |
| POST | `/api/admin/events` | Create new event. |
| PUT | `/api/admin/events/{id}` | Update event. |
| DELETE | `/api/admin/events/{id}` | Delete event. |
| CRUD | `/api/admin/news/**` | Equivalent CRUD endpoints for News. |

---

## Data Transfer Objects (DTOs)

- **`LoginRequest`**: `email`, `password`
- **`LoginResponse`**: `token` + user details (`id`, `name`, `role`, `department`)
- **`AttendanceRequest`**: `courseId`, `date`, `facultyId` + list of `{ studentId, status }`

---

## Repositories

All repositories extend `JpaRepository<Entity, Long>` providing standard CRUD operations. Custom query methods include:
- `UserRepository.findByEmail()`
- `CourseRepository.findByCourseId()`
- `SubmissionRepository.findByStudentId()`, `findByCourseId()`
- `AttendanceRepository.findByCourseIdAndDate()`, `findByStudentId()`
- `EventRepository.findAllByOrderByDateDesc()`

---

## External Integrations

- **OpenRouter AI (Frontend-driven):** The actual call to OpenRouter AI acts on the frontend, but the **results** are stored in the backend via `AIFeedbackController`. The backend stores the JSON analysis (`grammarScore`, `suggestions`, etc.) in the `ai_feedback` table.
