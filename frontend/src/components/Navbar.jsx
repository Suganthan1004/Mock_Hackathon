import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container container">
                <button
                    className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                    <li>
                        <Link
                            to="/"
                            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/courses"
                            className={`navbar-link ${isActive('/courses') ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Courses
                        </Link>
                    </li>

                    {!user && (
                        <>
                            <li>
                                <Link
                                    to="/login/student"
                                    className={`navbar-link portal-link ${isActive('/login/student') ? 'active' : ''}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    🎓 Student Portal
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login/faculty"
                                    className={`navbar-link portal-link ${isActive('/login/faculty') ? 'active' : ''}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    🧑‍🏫 Faculty Portal
                                </Link>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <li>
                                <Link
                                    to={user.role === 'STUDENT' ? '/student/dashboard' : '/faculty/dashboard'}
                                    className={`navbar-link portal-link ${location.pathname.includes('/student/') || location.pathname.includes('/faculty/')
                                            ? 'active' : ''
                                        }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    📊 Dashboard
                                </Link>
                            </li>
                            <li>
                                <button className="navbar-link logout-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>

                {user && (
                    <div className="navbar-user">
                        <div className="navbar-avatar">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="navbar-username">{user.name}</span>
                    </div>
                )}
            </div>
        </nav>
    );
}
