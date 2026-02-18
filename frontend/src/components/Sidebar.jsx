import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

export default function Sidebar() {
    const { user } = useAuth();

    const studentLinks = [
        { to: '/student/dashboard', icon: '📊', label: 'Dashboard' },
        { to: '/student/assignments', icon: '📝', label: 'Assignments' },
    ];

    const facultyLinks = [
        { to: '/faculty/dashboard', icon: '📊', label: 'Dashboard' },
        { to: '/faculty/submissions', icon: '📝', label: 'Submissions' },
        { to: '/faculty/attendance', icon: '✅', label: 'Mark Attendance' },
        { to: '/faculty/reports', icon: '📋', label: 'Reports' },
    ];

    const links = user?.role === 'STUDENT' ? studentLinks : facultyLinks;

    return (
        <aside className="sidebar">
            <div className="sidebar-profile">
                <div className="sidebar-avatar">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="sidebar-info">
                    <h4 className="sidebar-name">{user?.name || 'User'}</h4>
                    <span className="sidebar-role">
                        {user?.role === 'STUDENT' ? '🎓 Student' : '🧑‍🏫 Faculty'}
                    </span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    >
                        <span className="sidebar-icon">{link.icon}</span>
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <p className="sidebar-id">ID: {user?.id || 'N/A'}</p>
            </div>
        </aside>
    );
}
