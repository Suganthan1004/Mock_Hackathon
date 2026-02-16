import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth APIs
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

// Assignment APIs
export const assignmentAPI = {
    getAll: (studentId) => api.get(`/assignments?studentId=${studentId}`),
    submit: (formData) => api.post('/assignments/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    getFeedback: (assignmentId) => api.get(`/assignments/feedback/${assignmentId}`),
};

// Attendance APIs
export const attendanceAPI = {
    mark: (data) => api.post('/attendance/mark', data),
    getReport: (params) => api.get('/attendance/report', { params }),
    getStudents: (courseId) => api.get(`/attendance/students?courseId=${courseId}`),
};

// AI Evaluation API
export const aiAPI = {
    evaluate: (data) => api.post('/ai/evaluate', data),
};

export default api;
