import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { assignmentAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import { FiFileText, FiFilter, FiSearch } from 'react-icons/fi';
import './Dashboard.css';

const statusMap = {
    submitted: { label: 'Submitted', class: 'badge-warning' },
    pending: { label: 'Pending', class: 'badge-danger' },
    evaluated: { label: 'Evaluated', class: 'badge-success' },
    SUBMITTED: { label: 'Submitted', class: 'badge-warning' },
    PENDING: { label: 'Pending', class: 'badge-danger' },
    EVALUATED: { label: 'Evaluated', class: 'badge-success' },
};

// Fallback mock data matching StudentDashboard
const fallbackAssignments = [
    { id: 1, title: 'Data Structures Lab - Linked Lists', course: 'CS201', status: 'submitted', score: 85, dueDate: '2026-02-20' },
    { id: 2, title: 'Machine Learning Project Proposal', course: 'CS301', status: 'pending', score: null, dueDate: '2026-03-01' },
    { id: 3, title: 'Database Design - ER Diagrams', course: 'CS202', status: 'evaluated', score: 92, dueDate: '2026-02-15' },
    { id: 4, title: 'Web Development - React App', course: 'CS305', status: 'submitted', score: null, dueDate: '2026-02-25' },
    { id: 5, title: 'Computer Networks - TCP/IP', course: 'CS204', status: 'pending', score: null, dueDate: '2026-03-05' },
];

export default function StudentAssignments() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState(fallbackAssignments);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!user?.id) return;

        assignmentAPI.getByStudent(user.id)
            .then(res => {
                if (res.data && Array.isArray(res.data)) {
                    setAssignments(res.data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    const filteredAssignments = assignments.filter(a => {
        const status = (a.status || 'pending').toLowerCase();
        const matchesFilter = filter === 'all' || status === filter;
        const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
            (a.courseId || a.course || '').toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleAction = (assignment) => {
        const status = (assignment.status || 'pending').toLowerCase();

        if (status === 'pending') {
            // Navigate to submission with pre-filled data
            navigate('/student/assignments', {
                state: {
                    courseId: assignment.courseId || assignment.course,
                    assignmentId: assignment.assignmentId || assignment.id
                }
            });
        } else if (status === 'submitted') {
            // Check resilience - allow resubmit if due date is future
            const dueDate = assignment.dueDate ? new Date(assignment.dueDate) : null;
            const isLate = dueDate && new Date() > dueDate;

            if (!isLate) {
                navigate('/student/assignments', {
                    state: {
                        courseId: assignment.courseId || assignment.course,
                        assignmentId: assignment.assignmentId || assignment.id
                    }
                });
            }
        } else if (status === 'evaluated') {
            navigate(`/student/feedback/${assignment.submissionId || assignment.id}`);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main">
                <div className="dashboard-header animate-fade-in-up">
                    <div>
                        <h1><FiFileText size={22} style={{ marginRight: 6 }} /> All Assignments</h1>
                        <p className="dashboard-subtitle">Manage and track your coursework</p>
                    </div>
                </div>

                <div className="dashboard-section glass-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

                    {/* Filters */}
                    <div className="start-header-row" style={{ display: 'flex', gap: 15, marginBottom: 20, flexWrap: 'wrap' }}>
                        <div className="search-box" style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                            <FiSearch style={{ position: 'absolute', left: 10, top: 12, color: '#888' }} />
                            <input
                                type="text"
                                placeholder="Search assignments..."
                                className="form-input"
                                style={{ paddingLeft: 35 }}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="filter-box" style={{ width: 150 }}>
                            <select className="form-input" value={filter} onChange={e => setFilter(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="submitted">Submitted</option>
                                <option value="evaluated">Evaluated</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="spinner-container"><div className="spinner"></div></div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Assignment</th>
                                        <th>Course</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th>Score</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAssignments.length > 0 ? filteredAssignments.map((a) => {
                                        const st = statusMap[(a.status || '').toLowerCase()] || statusMap[(a.status || '').toUpperCase()] || { label: a.status, class: 'badge-info' };
                                        const dueDate = a.dueDate ? new Date(a.dueDate) : null;
                                        // Check if today is strictly after due date (ignoring time if needed, currently exact comparison)
                                        // To be safe and consistent with previous logic:
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        const isLate = dueDate && today > dueDate;

                                        return (
                                            <tr key={a.id}>
                                                <td><strong>{a.title}</strong></td>
                                                <td>{a.course || a.courseId}</td>
                                                <td>{dueDate ? dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</td>
                                                <td><span className={`badge ${st.class}`}>{st.label}</span></td>
                                                <td>{a.score != null ? `${a.score}%` : '—'}</td>
                                                <td>
                                                    {(a.status || '').toLowerCase() === 'pending' ? (
                                                        <button
                                                            onClick={() => handleAction(a)}
                                                            className="btn btn-accent"
                                                            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                                                        >
                                                            Submit
                                                        </button>
                                                    ) : (a.status || '').toLowerCase() === 'evaluated' ? (
                                                        <Link to={`/student/feedback/${a.submissionId || a.id}`} className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>View Feedback</Link>
                                                    ) : (
                                                        !isLate ? (
                                                            <button
                                                                onClick={() => handleAction(a)}
                                                                className="btn btn-primary"
                                                                style={{ padding: '6px 14px', fontSize: '0.8rem', background: 'transparent', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}
                                                            >
                                                                View / Resubmit
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleAction(a)}
                                                                className="btn btn-secondary"
                                                                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                                                            >
                                                                View Submission
                                                            </button>
                                                        )
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr><td colSpan="6" style={{ textAlign: 'center', padding: 20 }}>No assignments found matching your filters.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
