# University Portal — Backend Setup

## Prerequisites
- **Java 17+** (JDK)
- **Maven** 
- **MySQL 8.0+**

## Quick Start

### 1. Clone and switch to the feature branch
```bash
git clone https://github.com/Suganthini-004/Mock_Hackathon.git
cd Mock_Hackathon
git checkout feature
```

### 2. Set your MySQL credentials as environment variables

**Windows (PowerShell):**
```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
```

**Windows (CMD):**
```cmd
set DB_USERNAME=root
set DB_PASSWORD=your_mysql_password
```

**Mac/Linux:**
```bash
export DB_USERNAME=root
export DB_PASSWORD=your_mysql_password
```

> **Note:** If your MySQL uses `root` with no password, just set `DB_PASSWORD=`

### 3. Run the backend
```bash
cd backend
mvn spring-boot:run
```

The app will:
- Auto-create the `university_portal` database
- Auto-create all tables
- Seed demo data (students, faculty, courses, assignments)
- Start on **http://localhost:8081**

### 4. Run the frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

## Login Credentials (after seeding)

| Role    | Email                  | Password     |
|---------|------------------------|-------------|
| Student | arjun@veltech.edu      | student123  |
| Faculty | ramesh@veltech.edu     | faculty123  |

## Environment Variables (Optional)

| Variable      | Default           | Description          |
|---------------|-------------------|----------------------|
| `DB_HOST`     | `localhost`       | MySQL host           |
| `DB_PORT`     | `3306`            | MySQL port           |
| `DB_NAME`     | `university_portal` | Database name      |
| `DB_USERNAME` | `root`            | MySQL username       |
| `DB_PASSWORD` | `root`            | MySQL password       |
