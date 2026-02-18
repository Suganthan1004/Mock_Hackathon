import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI, facultyAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import './FacultySubmissions.css';
import './Dashboard.css';

export default function FacultySubmissions() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subsLoading, setSubsLoading] = useState(false);
    const [feedbackModal, setFeedbackModal] = useState({ show: false, data: null, loading: false });

    // Fetch faculty's courses
    useEffect(() => {
        if (!user?.id) { setLoading(false); return; }
        dashboardAPI.getFaculty(user.id)
            .then((res) => {
                const c = res.data?.courses || [];
                setCourses(c);
                if (c.length > 0) {
                    setSelectedCourse(c[0].courseId);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [user]);

    // Fetch submissions when course changes
    useEffect(() => {
        if (!selectedCourse) return;
        setSubsLoading(true);
        facultyAPI.getSubmissions(selectedCourse)
            .then((res) => setSubmissions(res.data || []))
            .catch(() => setSubmissions([]))
            .finally(() => setSubsLoading(false));
    }, [selectedCourse]);

    const viewFeedback = (submissionId) => {
        setFeedbackModal({ show: true, data: null, loading: true });
        facultyAPI.getFeedback(submissionId)
            .then((res) => setFeedbackModal({ show: true, data: res.data, loading: false }))
            .catch(() => setFeedbackModal({ show: true, data: null, loading: false }));
    };

    const closeFeedback = () => setFeedbackModal({ show: false, data: null, loading: false });

    const getStatusBadge = (status) => {
        const map = {
            SUBMITTED: 'badge-info',
            EVALUATED: 'badge-success',
            PENDING: 'badge-warning',
        };
        return map[status] || 'badge-info';
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main">
                <div className="dashboard-header animate-fade-in-up">
                    <div>
                        <h1>📝 Student Submissions</h1>
                        <p className="dashboard-subtitle">Review submissions and AI feedback for your courses</p>
                    </div>
                </div>

                {/* Course Filter */}
                <div className="subs-filter glass-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <label className="filter-label">Select Course:</label>
                    <select
                        className="filter-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        {courses.map((c) => (
                            <option key={c.courseId} value={c.courseId}>
                                {c.courseId} — {c.courseName}
                            </option>
                        ))}
                    </select>
                    <span className="filter-count">
                        {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Submissions Table */}
                <div className="dashboard-section glass-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="section-header">
                        <h3>📄 Submissions for {selectedCourse}</h3>
                    </div>
                    {loading || subsLoading ? (
                        <div style={{ textAlign: 'center', padding: 40 }}>
                            <div className="spinner" style={{ margin: '0 auto' }}></div>
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="empty-state">
                            <p>No submissions found for this course yet.</p>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Assignment</th>
                                        <th>File</th>
                                        <th>Status</th>
                                        <th>Score</th>
                                        <th>Submitted</th>
                                        <th>AI Feedback</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map((s) => (
                                        <tr key={s.id}>
                                            <td><strong>{s.studentId}</strong></td>
                                            <td>{s.assignmentTitle}</td>
                                            <td className="td-file">{s.fileName || '—'}</td>
                                            <td>
                                                <span className={`badge ${getStatusBadge(s.status)}`}>
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td>
                                                {s.score != null ? (
                                                    <strong>{s.score}/100</strong>
                                                ) : '—'}
                                            </td>
                                            <td className="td-date">
                                                {s.submittedAt ? new Date(s.submittedAt).toLocaleDateString('en-US', {
                                                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                }) : '—'}
                                            </td>
                                            <td>
                                                {s.status === 'EVALUATED' ? (
                                                    <button className="btn btn-accent btn-sm" onClick={() => viewFeedback(s.id)}>
                                                        👁️ View
                                                    </button>
                                                ) : (
                                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Pending</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* AI Feedback Modal */}
            {feedbackModal.show && (
                <div className="modal-overlay" onClick={closeFeedback}>
                    <div className="feedback-modal animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>🤖 AI Feedback</h3>
                            <button className="modal-close" onClick={closeFeedback}>✕</button>
                        </div>
                        {feedbackModal.loading ? (
                            <div style={{ textAlign: 'center', padding: 40 }}>
                                <div className="spinner" style={{ margin: '0 auto' }}></div>
                                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading feedback...</p>
                            </div>
                        ) : feedbackModal.data ? (
                            <div className="feedback-content">
                                <div className="score-grid">
                                    <div className="score-card">
                                        <span className="score-value">{feedbackModal.data.grammarScore || 0}</span>
                                        <span className="score-label">Grammar</span>
                                    </div>
                                    <div className="score-card">
                                        <span className="score-value">{feedbackModal.data.relevanceScore || 0}</span>
                                        <span className="score-label">Relevance</span>
                                    </div>
                                    <div className="score-card">
                                        <span className="score-value">{feedbackModal.data.originalityScore || 0}</span>
                                        <span className="score-label">Originality</span>
                                    </div>
                                    <div className="score-card overall">
                                        <span className="score-value">{feedbackModal.data.overallScore || 0}</span>
                                        <span className="score-label">Overall</span>
                                    </div>
                                </div>
                                {feedbackModal.data.summary && (
                                    <div className="feedback-section">
                                        <h4>📋 Summary</h4>
                                        <p>{feedbackModal.data.summary}</p>
                                    </div>
                                )}
                                {feedbackModal.data.suggestions?.length > 0 && (
                                    <div className="feedback-section">
                                        <h4>💡 Suggestions</h4>
                                        <ul>
                                            {feedbackModal.data.suggestions.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="empty-state" style={{ padding: '2rem' }}>
                                <p>No AI feedback available for this submission.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
