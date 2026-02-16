import { BookOpen, Clock, Users, Award } from "lucide-react";

export function CoursesPage() {
  const courses = [
    {
      id: 1,
      code: "CS101",
      title: "Introduction to Computer Science",
      department: "Computer Science",
      credits: 3,
      duration: "14 weeks",
      students: 120,
      description: "An introduction to fundamental concepts in computer science including programming, algorithms, and data structures.",
    },
    {
      id: 2,
      code: "MATH201",
      title: "Linear Algebra",
      department: "Mathematics",
      credits: 4,
      duration: "14 weeks",
      students: 80,
      description: "Study of vector spaces, linear transformations, matrices, and their applications in various fields.",
    },
    {
      id: 3,
      code: "PHYS301",
      title: "Quantum Mechanics",
      department: "Physics",
      credits: 4,
      duration: "14 weeks",
      students: 45,
      description: "Advanced study of quantum theory, wave mechanics, and applications to atomic and molecular systems.",
    },
    {
      id: 4,
      code: "ENG101",
      title: "Engineering Design",
      department: "Engineering",
      credits: 3,
      duration: "14 weeks",
      students: 100,
      description: "Introduction to engineering design process, CAD tools, and project-based learning.",
    },
    {
      id: 5,
      code: "DS202",
      title: "Data Structures and Algorithms",
      department: "Computer Science",
      credits: 4,
      duration: "14 weeks",
      students: 95,
      description: "In-depth study of data structures, algorithm design, and complexity analysis.",
    },
    {
      id: 6,
      code: "BIO101",
      title: "Introduction to Biology",
      department: "Biology",
      credits: 3,
      duration: "14 weeks",
      students: 150,
      description: "Fundamental concepts in biology including cell structure, genetics, and evolution.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl text-gray-900 mb-4">Course Catalog</h1>
        <p className="text-lg text-gray-600 mb-12">
          Explore our wide range of courses across various departments
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-2">
                    {course.code}
                  </span>
                  <h2 className="text-2xl text-gray-900 mb-1">{course.title}</h2>
                  <p className="text-sm text-gray-600">{course.department}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>

              <p className="text-gray-700 mb-6">{course.description}</p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <Award className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">{course.credits} Credits</p>
                </div>
                <div className="text-center">
                  <Clock className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">{course.duration}</p>
                </div>
                <div className="text-center">
                  <Users className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">{course.students} Students</p>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

