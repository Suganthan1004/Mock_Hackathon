import { Link } from "react-router";
import { Users, Calendar, FileText, BarChart3, BookOpen, User } from "lucide-react";
import { useState } from "react";

export function FacultyPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication - accept any username/password
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const quickLinks = [
    {
      icon,
      title: "Mark Attendance",
      description: "Record student attendance",
      link: "/attendance",
      color: "bg-blue-500",
    },
    {
      icon,
      title: "Grade Assignments",
      description: "Review and grade submissions",
      link: "/assignments",
      color: "bg-green-500",
    },
    {
      icon,
      title: "My Courses",
      description: "Manage course materials",
      link: "/courses",
      color: "bg-purple-500",
    },
    {
      icon,
      title: "Reports",
      description: "View analytics and reports",
      link: "/attendance",
      color: "bg-yellow-500",
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      course: "Computer Science 101",
      time: "Today, 10:00 AM - 11:30 AM",
      room: "Room 201",
    },
    {
      id: 2,
      course: "Data Structures 202",
      time: "Today, 2:00 PM - 3:30 PM",
      room: "Room 305",
    },
    {
      id: 3,
      course: "Computer Science 101",
      time: "Tomorrow, 10:00 AM - 11:30 AM",
      room: "Room 201",
    },
  ];

  const pendingTasks = [
    { id: 1, task: "Grade assignments for CS101", count: 15 },
    { id: 2, task: "Submit attendance reports", count: 3 },
    { id: 3, task: "Update course materials", count: 2 },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl text-gray-900 text-center mb-8">Faculty Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Username / Faculty ID</label>
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-gray-900 mb-2">Faculty Portal</h1>
              <p className="text-lg text-gray-600">Welcome back, Professor {username}!</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.link}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl text-gray-900">Upcoming Classes</h2>
            </div>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg text-gray-900 mb-2">{classItem.course}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {classItem.time}
                    </span>
                    <span className="hidden sm:block">•</span>
                    <span>{classItem.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl text-gray-900">Pending Tasks</h2>
            </div>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-900">{task.task}</p>
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-500 text-white text-xs rounded-full">
                      {task.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg text-gray-900">Profile</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="text-gray-900">Computer Science</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Courses:</span>
                  <span className="text-gray-900">3 Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students:</span>
                  <span className="text-gray-900">215 Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

