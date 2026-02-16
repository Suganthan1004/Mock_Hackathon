import { useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Download } from "lucide-react";

export function AssignmentPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);

  const courses = [
    "Computer Science 101",
    "Mathematics 201",
    "Physics 301",
    "Engineering Design 101",
    "Data Structures 202",
  ];

  const assignments = {
    "Computer Science 101": [
      {
        id: "cs101-1",
        course: "Computer Science 101",
        title: "Introduction to Programming - Variables and Data Types",
        dueDate: "2026-02-28",
        maxScore: 100,
      },
      {
        id: "cs101-2",
        course: "Computer Science 101",
        title: "Control Flow and Loops",
        dueDate: "2026-03-15",
        maxScore: 100,
      },
    ],
    "Mathematics 201": [
      {
        id: "math201-1",
        course: "Mathematics 201",
        title: "Linear Algebra Problem Set",
        dueDate: "2026-02-25",
        maxScore: 100,
      },
    ],
    "Physics 301": [
      {
        id: "phys301-1",
        course: "Physics 301",
        title: "Quantum Mechanics Research Paper",
        dueDate: "2026-03-10",
        maxScore: 150,
      },
    ],
    "Engineering Design 101": [
      {
        id: "ed101-1",
        course: "Engineering Design 101",
        title: "CAD Model Design Project",
        dueDate: "2026-03-20",
        maxScore: 100,
      },
    ],
    "Data Structures 202": [
      {
        id: "ds202-1",
        course: "Data Structures 202",
        title: "Binary Search Trees Implementation",
        dueDate: "2026-02-22",
        maxScore: 100,
      },
    ],
  };

  // Load submissions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("assignmentSubmissions");
    if (saved) {
      setSubmissions(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
      ];

      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF, DOCX, or image file");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      setSelectedFile(file);
    }
  };

  const simulateAIEvaluation = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate AI evaluation with random scores
        const contentRelevance = Math.floor(Math.random() * 20) + 80; // 80-100
        const grammarScore = Math.floor(Math.random() * 15) + 85; // 85-100
        const originalityScore = Math.floor(Math.random() * 25) + 75; // 75-100
        const structureScore = Math.floor(Math.random() * 20) + 80; // 80-100
        
        const overallScore = Math.floor(
          (contentRelevance + grammarScore + originalityScore + structureScore) / 4
        );

        const plagiarismDetected = originalityScore < 80;

        const evaluation = {
          overallScore,
          maxScore: 100,
          contentRelevance,
          grammarScore,
          originalityScore,
          structureScore,
          plagiarismDetected,
          feedback: plagiarismDetected
            ? "Good work overall, but some sections show similarity to existing sources. Please ensure all sources are properly cited."
            : "Excellent work! Your assignment demonstrates strong understanding of the topic with original insights and clear presentation.",
          suggestions: [
            contentRelevance < 90
              ? "Consider adding more specific examples to strengthen your arguments"
              : "Content is highly relevant and well-researched",
            grammarScore < 90
              ? "Review grammar and punctuation in paragraphs 3 and 5"
              : "Grammar and writing style are excellent",
            originalityScore < 85
              ? "Ensure all sources are properly cited to improve originality score"
              : "Demonstrates original thinking and unique perspectives",
            structureScore < 90
              ? "Consider reorganizing sections for better flow"
              : "Well-structured with clear introduction, body, and conclusion",
          ],
        };

        resolve(evaluation);
      }, 3000); // Simulate 3 second evaluation time
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !selectedAssignment || !selectedFile) {
      alert("Please fill in all fields and select a file");
      return;
    }

    const assignment = assignments[selectedCourse]?.find((a) => a.id === selectedAssignment);
    if (!assignment) return;

    setIsEvaluating(true);
    setCurrentEvaluation(null);

    try {
      // Simulate AI evaluation
      const evaluation = await simulateAIEvaluation();

      const newSubmission = {
        id: `sub-${Date.now()}`,
        assignmentId: assignment.id,
        assignmentTitle: assignment.title,
        course,
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / 1024).toFixed(2)} KB`,
        submittedAt: new Date().toISOString(),
        evaluation,
      };

      const updatedSubmissions = [...submissions, newSubmission];
      setSubmissions(updatedSubmissions);
      localStorage.setItem("assignmentSubmissions", JSON.stringify(updatedSubmissions));

      setCurrentEvaluation(evaluation);
      setSelectedFile(null);
      setSelectedAssignment("");
      setSelectedCourse("");
    } catch (error) {
      alert("Error evaluating assignment. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-gray-900">Assignment Submission</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submission Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl text-gray-900 mb-6">Submit Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Select Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setSelectedAssignment("");
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a course...</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCourse && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Select Assignment</label>
                  <select
                    value={selectedAssignment}
                    onChange={(e) => setSelectedAssignment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose an assignment...</option>
                    {assignments[selectedCourse]?.map((assignment) => (
                      <option key={assignment.id} value={assignment.id}>
                        {assignment.title} (Due: {assignment.dueDate})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-700"
                  >
                    Click to upload
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF, DOCX, or Image (max 10MB)
                  </p>
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <p className="text-sm text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-600">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isEvaluating}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isEvaluating ? "Evaluating..." : "Submit Assignment"}
              </button>
            </form>

            {isEvaluating && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <p className="text-sm text-gray-700">
                    AI is evaluating your assignment... This may take a few moments.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Evaluation Results */}
          {currentEvaluation && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl text-gray-900 mb-6">Evaluation Results</h2>

              <div className="mb-6 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white text-center">
                <p className="text-sm mb-2">Overall Score</p>
                <p className="text-5xl">{currentEvaluation.overallScore}</p>
                <p className="text-sm mt-2">out of {currentEvaluation.maxScore}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Content Relevance</span>
                    <span>{currentEvaluation.contentRelevance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${currentEvaluation.contentRelevance}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Grammar & Writing</span>
                    <span>{currentEvaluation.grammarScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${currentEvaluation.grammarScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Originality</span>
                    <span>{currentEvaluation.originalityScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        currentEvaluation.plagiarismDetected ? "bg-yellow-600" : "bg-green-600"
                      }`}
                      style={{ width: `${currentEvaluation.originalityScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Structure & Organization</span>
                    <span>{currentEvaluation.structureScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${currentEvaluation.structureScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {currentEvaluation.plagiarismDetected && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800">
                      Plagiarism Detection content may be similar to existing sources.
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm text-gray-900 mb-2">Feedback</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
                  {currentEvaluation.feedback}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-900 mb-3">Suggestions for Improvement</h3>
                <ul className="space-y-2">
                  {currentEvaluation.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Submission History */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl text-gray-900 mb-6">Submission History</h2>
          {submissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No submissions yet</p>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-1">{submission.assignmentTitle}</h3>
                      <p className="text-sm text-gray-600 mb-2">{submission.course}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {submission.fileName}
                        </span>
                        <span>{submission.fileSize}</span>
                        <span>{new Date(submission.submittedAt).toLocaleString()}</span>
                      </div>
                    </div>
                    {submission.evaluation && (
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Score</p>
                          <p className="text-2xl text-blue-600">
                            {submission.evaluation.overallScore}/{submission.evaluation.maxScore}
                          </p>
                        </div>
                        <button
                          onClick={() => setCurrentEvaluation(submission.evaluation)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

