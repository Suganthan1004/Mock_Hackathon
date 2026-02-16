import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header-container container">
                <Link to="/" className="header-brand">
                    <div className="header-logo">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="12" fill="url(#logo-gradient)" />
                            <path d="M24 8L38 16V32L24 40L10 32V16L24 8Z" stroke="#f0c040" strokeWidth="2" fill="none" />
                            <path d="M24 14L32 18.5V27.5L24 32L16 27.5V18.5L24 14Z" fill="#f0c040" fillOpacity="0.3" />
                            <circle cx="24" cy="22" r="4" fill="#f0c040" />
                            <path d="M18 30C18 27 21 25 24 25C27 25 30 27 30 30" stroke="#f0c040" strokeWidth="1.5" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48">
                                    <stop stopColor="#112240" />
                                    <stop offset="1" stopColor="#1e3a5f" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="header-text">
                        <h1 className="header-title">Prestige University</h1>
                        <p className="header-motto">Excellence in Education, Innovation in Research</p>
                    </div>
                </Link>
            </div>
        </header>
    );
}
