import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

// Fallback data
const fallbackClasses = [
    { course: 'CS201', name: 'Data Structures', students: 45, todayAttendance: 38 },
    { course: 'CS202', name: 'Database Management', students: 52, todayAttendance: 48 },
    { course: 'CS301', name: 'Machine Learning', students: 40, todayAttendance: null },
];

const fallbackRecent = [
    { date: '2026-02-15', course: 'CS201', present: 42, total: 45 },
    { date: '2026-02-15', course: 'CS202', present: 50, total: 52 },
    { date: '2026-02-14', course: 'CS201', present: 40, total: 45 },
    { date: '2026-02-14', course: 'CS301', present: 38, total: 40 },
    { date: '2026-02-13', course: 'CS202', present: 49, total: 52 },
];

export default function FacultyDashboard() {
    const { user } = useAuth();
    const [classes, setClasses] = useState(fallbackClasses);
    const [recent, setRecent] = useState(fallbackRecent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) { setLoading(false); return; }

        // GET /api/dashboard/faculty/{facultyId}
        dashboardAPI.getFaculty(user.id)
            .then((res) => {
                if (res.data?.courses) setClasses(res.data.courses);
                if (res.data?.recentAttendance) setRecent(res.data.recentAttendance);
            })
            .catch(() => { /* use fallback */ })
            .finally(() => setLoading(false));
    }, [user]);

    const totalStudents = classes.reduce((a, c) => a + (c.students || 0), 0);
    const classesMarked = classes.filter(c => c.todayAttendance !== null && c.todayAttendance !== undefined).length;

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main">
                <div className="dashboard-header animate-fade-in-up">
                    <div>
                        <h1>Welcome, {user?.name?.split(' ').slice(0, 2).join(' ')}! 👋</h1>
                        <p className="dashboard-subtitle">Faculty Dashboard — {user?.department}</p>
                    </div>
                    <Link to="/faculty/attendance" className="btn btn-primary">✅ Mark Attendance</Link>
                </div>

                {/* Stats */}
                <div className="stats-grid animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-card glass-card">
                        <div className="stat-card-icon" style={{ background: 'rgba(240,192,64,0.15)' }}>📚</div>
                        <div>
                            <span className="stat-card-number">{classes.length}</span>
                            <span className="stat-card-label">Courses</span>
                        </div>
                    </div>
                    <div className="stat-card glass-card">
                        <div className="stat-card-icon" style={{ background: 'rgba(100,255,218,0.15)' }}>🎓</div>
                        <div>
                            <span className="stat-card-number">{totalStudents}</span>
                            <span className="stat-card-label">Total Students</span>
                        </div>
                    </div>
                    <div className="stat-card glass-card">
                        <div className="stat-card-icon" style={{ background: 'rgba(167,139,250,0.15)' }}>✅</div>
                        <div>
                            <span className="stat-card-number">{classesMarked}/{classes.length}</span>
                            <span className="stat-card-label">Marked Today</span>
                        </div>
                    </div>
                </div>

                {/* Classes Table */}
                <div className="dashboard-section glass-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="section-header">
                        <h3>📚 My Classes</h3>
                    </div>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }}></div></div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>Name</th>
                                        <th>Students</th>
                                        <th>Today's Attendance</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map((c) => (
                                        <tr key={c.course || c.courseId}>
                                            <td><strong>{c.course || c.courseId}</strong></td>
                                            <td>{c.name || c.courseName}</td>
                                            <td>{c.students}</td>
                                            <td>
                                                {c.todayAttendance != null ? (
                                                    <span className="badge badge-success">{c.todayAttendance}/{c.students} present</span>
                                                ) : (
                                                    <span className="badge badge-warning">Not marked</span>
                                                )}
                                            </td>
                                            <td>
                                                {c.todayAttendance == null ? (
                                                    <Link to="/faculty/attendance" className="btn btn-accent" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Mark Now</Link>
                                                ) : (
                                                    <Link to="/faculty/reports" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>View Report</Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Recent Attendance */}
                <div className="dashboard-section glass-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="section-header">
                        <h3>📋 Recent Attendance Records</h3>
                        <Link to="/faculty/reports" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Full Reports →</Link>
                    </div>
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Course</th>
                                    <th>Present</th>
                                    <th>Total</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent.map((r, i) => (
                                    <tr key={i}>
                                        <td>{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                        <td><strong>{r.course || r.courseId}</strong></td>
                                        <td>{r.present}</td>
                                        <td>{r.total}</td>
                                        <td>
                                            <span className={`badge ${Math.round((r.present / r.total) * 100) >= 80 ? 'badge-success' : 'badge-warning'}`}>
                                                {Math.round((r.present / r.total) * 100)}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
