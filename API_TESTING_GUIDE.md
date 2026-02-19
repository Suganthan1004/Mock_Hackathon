# Postman API Testing Guide — Vel Tech University Portal

This guide provides step-by-step instructions to test the backend APIs.

**Base URL:** `http://mock-hackathon.onrender.com/api`

---

## 1. Setup Environment
1.  Open Postman.
2.  Create a new **Collection** named `University Portal`.
3.  Add a **Variable** to the collection:
    -   **Name:** `token`
    -   **Initial Value:** (leave empty)
    -   **Current Value:** (leave empty)

---

## 2. Authentication (First Step)
You **must** login first to get an access token for protected endpoints.

### Login (Student)
-   **Method:** `POST`
-   **URL:** `{{base_url}}/auth/login` (or `http://mock-hackathon.onrender.com/api/auth/login`)
-   **Body** (raw JSON):
    ```json
    {
        "email": "arjun@veltech.edu",
        "password": "student123"
    }
    ```
-   **Response:** Copy the `token` string from the response.
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiJ9..."
    }
    ```

> **Tip:** In Postman, go to the **Tests** tab of this request and add this code to auto-save the token:
> ```javascript
> var jsonData = pm.response.json();
> pm.collectionVariables.set("token", jsonData.token);
> ```

---

## 3. Using the Token
For all subsequent requests (except public ones), you must add the token to the header.

1.  Go to the **Authorization** tab of your request (or the entire Collection).
2.  Select **Type:** `Bearer Token`.
3.  **Token:** `{{token}}` (or paste the token string manually).

---

## 4. Test Scenarios

### A. Admin Actions
**Prerequisite:** Login as Admin (`admin@veltech.edu` / `admin123`)

#### 1. Create Event
-   **Method:** `POST`
-   **URL:** `/admin/events`
-   **Body:**
    ```json
    {
        "title": "Tech Symposium 2026",
        "description": "Annual technology meet",
        "date": "2026-03-20",
        "category": "upcoming",
        "tag": "Technology",
        "location": "Main Auditorium"
    }
    ```

#### 2. Create News
-   **Method:** `POST`
-   **URL:** `/admin/news`
-   **Body:**
    ```json
    {
        "title": "Exam Schedule Released",
        "description": "Final semester exams date sheet",
        "date": "2026-04-10",
        "content": "The full schedule is available on the portal..."
    }
    ```

### B. Faculty Actions
**Prerequisite:** Login as Faculty (`ramesh@veltech.edu` / `faculty123`)

#### 1. Mark Attendance
-   **Method:** `POST`
-   **URL:** `/attendance`
-   **Body:**
    ```json
    {
        "courseId": "CS101",
        "date": "2026-02-18",
        "facultyId": "1",
        "records": [
            { "studentId": "STU001", "status": "Present" },
            { "studentId": "STU002", "status": "Absent" }
        ]
    }
    ```

#### 2. Get Course Submissions
-   **Method:** `GET`
-   **URL:** `/assignments/course/CS101/submissions`

### C. Student Actions
**Prerequisite:** Login as Student (`arjun@veltech.edu` / `student123`)

#### 1. View Dashboard
-   **Method:** `GET`
-   **URL:** `/dashboard/student/STU001`

#### 2. Upload Assignment (Form-Data)
-   **Method:** `POST`
-   **URL:** `/assignments/upload`
-   **Body:** Select `form-data`
    -   `file`: (Select a file from your computer)
    -   `courseId`: `CS101`
    -   `assignmentId`: `1`
    -   `studentId`: `STU001`

---

## 5. Public Endpoints (No Token Required)

#### 1. Get University Events
-   **Method:** `GET`
-   **URL:** `/university/events`

#### 2. Get All Courses
-   **Method:** `GET`
-   **URL:** `/courses`
