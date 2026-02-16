import { useState, useEffect } from "react";
import { Calendar, Check, X, Download, Search } from "lucide-react";

export function AttendancePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState({});
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [viewMode, setViewMode] = useState("mark");
  const [filterClass, setFilterClass] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const classes = [
    "Computer Science 101",
    "Mathematics 201",
    "Physics 301",
    "Engineering Design 101",
    "Data Structures 202",
  ];

  const students = {
    "Computer Science 101": [
      { id: "1", name: "Alice Johnson", rollNumber: "CS001" },
      { id: "2", name: "Bob Smith", rollNumber: "CS002" },
      { id: "3", name: "Carol Davis", rollNumber: "CS003" },
      { id: "4", name: "David Wilson", rollNumber: "CS004" },
      { id: "5", name: "Emma Brown", rollNumber: "CS005" },
    ],
    "Mathematics 201": [
      { id: "6", name: "Frank Miller", rollNumber: "MA001" },
      { id: "7", name: "Grace Lee", rollNumber: "MA002" },
      { id: "8", name: "Henry Taylor", rollNumber: "MA003" },
      { id: "9", name: "Ivy Chen", rollNumber: "MA004" },
    ],
    "Physics 301": [
      { id: "10", name: "Jack Anderson", rollNumber: "PH001" },
      { id: "11", name: "Kate Martinez", rollNumber: "PH002" },
      { id: "12", name: "Leo Garcia", rollNumber: "PH003" },
    ],
    "Engineering Design 101": [
      { id: "13", name: "Mia Robinson", rollNumber: "ED001" },
      { id: "14", name: "Noah White", rollNumber: "ED002" },
      { id: "15", name: "Olivia Harris", rollNumber: "ED003" },
    ],
    "Data Structures 202": [
      { id: "16", name: "Peter Clark", rollNumber: "DS001" },
      { id: "17", name: "Quinn Lewis", rollNumber: "DS002" },
      { id: "18", name: "Rachel Walker", rollNumber: "DS003" },
    ],
  };

  // Load records from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("attendanceRecords");
    if (saved) {
      setAttendanceRecords(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication - accept any username/password
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleMarkAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmitAttendance = () => {
    if (!selectedClass || !selectedDate) {
      alert("Please select a class and date");
      return;
    }

    const classStudents = students[selectedClass] || [];
    const newRecords = classStudents.map((student) => ({
      id: `${student.id}-${selectedDate}-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      rollNumber: student.rollNumber,
      className,
      date,
      status: attendance[student.id] || "Absent",
    }));

    const updatedRecords = [...attendanceRecords, ...newRecords];
    setAttendanceRecords(updatedRecords);
    localStorage.setItem("attendanceRecords", JSON.stringify(updatedRecords));

    alert("Attendance submitted successfully!");
    setAttendance({});
  };

  const getFilteredRecords = () => {
    return attendanceRecords.filter((record) => {
      const classMatch = !filterClass || record.className === filterClass;
      const startDateMatch = !filterStartDate || record.date >= filterStartDate;
      const endDateMatch = !filterEndDate || record.date <= filterEndDate;
      return classMatch && startDateMatch && endDateMatch;
    });
  };

  const generateReport = () => {
    const filtered = getFilteredRecords();
    const csvContent = [
      ["Roll Number", "Student Name", "Class", "Date", "Status"],
      ...filtered.map((r) => [r.rollNumber, r.studentName, r.className, r.date, r.status]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-report-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl text-gray-900 text-center mb-8">Faculty Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Demo any username and password to login
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-gray-900">Attendance Management</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setViewMode("mark")}
            className={`px-6 py-2 rounded-md transition-colors ${
              viewMode === "mark"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Mark Attendance
          </button>
          <button
            onClick={() => setViewMode("view")}
            className={`px-6 py-2 rounded-md transition-colors ${
              viewMode === "view"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            View Records
          </button>
        </div>

        {viewMode === "mark" ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl text-gray-900 mb-6">Mark Attendance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Select Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setAttendance({});
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a class...</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {selectedClass && (
              <>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm text-gray-900">Roll Number</th>
                        <th className="px-6 py-3 text-left text-sm text-gray-900">Student Name</th>
                        <th className="px-6 py-3 text-center text-sm text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students[selectedClass]?.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{student.rollNumber}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-4">
                              <button
                                onClick={() => handleMarkAttendance(student.id, "Present")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                                  attendance[student.id] === "Present"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                <Check className="h-4 w-4" />
                                Present
                              </button>
                              <button
                                onClick={() => handleMarkAttendance(student.id, "Absent")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                                  attendance[student.id] === "Absent"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                <X className="h-4 w-4" />
                                Absent
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={handleSubmitAttendance}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit Attendance
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Attendance Records</h2>
              <button
                onClick={generateReport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Report
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Filter by Class</label>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Classes</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm text-gray-900">Date</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-900">Class</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-900">Roll Number</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-900">Student Name</th>
                    <th className="px-6 py-3 text-center text-sm text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getFilteredRecords().length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No attendance records found
                      </td>
                    </tr>
                  ) : (
                    getFilteredRecords().map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.className}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.rollNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.studentName}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm ${
                              record.status === "Present"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

