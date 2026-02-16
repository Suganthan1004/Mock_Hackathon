import { Link } from "react-router";
import { BookOpen, Calendar, FileText, Award, Bell, User } from "lucide-react";
import { useState } from "react";

export function StudentPortalPage() {
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
      title: "Submit Assignment",
      description: "Upload and submit your assignments",
      link: "/assignments",
      color: "bg-blue-500",
    },
    {
      icon,
      title: "My Courses",
      description: "View enrolled courses and materials",
      link: "/courses",
      color: "bg-green-500",
    },
    {
      icon,
      title: "Academic Calendar",
      description: "View important dates and events",
      link: "/",
      color: "bg-purple-500",
    },
    {
      icon,
      title: "Grades",
      description: "Check your academic progress",
      link: "/",
      color: "bg-yellow-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Assignment submitted for CS101",
      date: "Today, 10:30 AM",
      type: "success",
    },
    {
      id: 2,
      title: "New grade posted for MATH201",
      date: "Yesterday, 2:15 PM",
      type: "info",
    },
    {
      id: 3,
      title: "Upcoming exam 301",
      date: "Feb 25, 2026",
      type: "warning",
    },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl text-gray-900 text-center mb-8">Student Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Username / Student ID</label>
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
              <h1 className="text-4xl text-gray-900 mb-2">Student Portal</h1>
              <p className="text-lg text-gray-600">Welcome back, {username}!</p>
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
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl text-gray-900">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "info"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl text-gray-900">Profile</h2>
            </div>
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-1">Student Name</h3>
              <p className="text-sm text-gray-600">ID: STU123456</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Program:</span>
                <span className="text-gray-900">Computer Science</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year:</span>
                <span className="text-gray-900">2nd Year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GPA:</span>
                <span className="text-gray-900">3.75</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

