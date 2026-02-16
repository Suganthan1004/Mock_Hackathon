import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { universityAPI } from '../services/api';
import './Home.css';

// Fallback mock data if backend is unavailable
const fallbackEvents = [
    { id: 1, title: 'Annual Tech Symposium 2026', description: 'Join us for three days of cutting-edge technology presentations, workshops, and networking with industry leaders.', date: '2026-03-15', category: 'upcoming', tag: 'Technology' },
    { id: 2, title: 'International Research Conference', description: 'Present your research papers and collaborate with scholars from across the globe.', date: '2026-04-20', category: 'upcoming', tag: 'Research' },
    { id: 3, title: 'Spring Semester Hackathon', description: '48-hour coding challenge to build innovative solutions. Open to all departments.', date: '2026-03-01', category: 'ongoing', tag: 'Hackathon' },
    { id: 4, title: 'Cultural Fest – Harmony 2026', description: 'A celebration of arts, music, and diversity. Performances, exhibitions, and food stalls.', date: '2026-04-05', category: 'upcoming', tag: 'Culture' },
];

const fallbackNews = [
    { id: 1, title: 'University Ranked #5 Nationally', description: 'Vel Tech University climbs to 5th position in national rankings.', date: '2026-02-10' },
    { id: 2, title: 'New AI Research Lab Inaugurated', description: 'State-of-the-art AI and Machine Learning research lab now open.', date: '2026-02-08' },
    { id: 3, title: 'Placement Record: 95% Students Placed', description: 'This year\'s placement drive achieves a record 95% placement rate.', date: '2026-02-05' },
];

const announcements = [
    'Mid-semester examinations begin March 20, 2026',
    'Last date for scholarship applications: March 10, 2026',
    'Library will remain open 24/7 during exam season',
    'New elective courses available for next semester registration',
];

export default function Home() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
    const [events, setEvents] = useState(fallbackEvents);
    const [news, setNews] = useState(fallbackNews);

    useEffect(() => {
        // GET /api/university/events
        universityAPI.getEvents()
            .then((res) => {
                if (res.data?.events) setEvents(res.data.events);
                if (res.data?.news) setNews(res.data.news);
            })
            .catch(() => {
                // Use fallback data
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const filteredEvents = events.filter((e) => e.category === activeTab);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg"></div>
                <div className="hero-content container">
                    <div className="hero-text animate-fade-in-up">
                        <span className="hero-badge">🏛️ Welcome to</span>
                        <h1 className="hero-title">Vel Tech University</h1>
                        <p className="hero-subtitle">
                            Empowering the next generation of leaders through world-class education,
                            groundbreaking research, and innovative thinking.
                        </p>
                        <div className="hero-actions">
                            <Link to="/login/student" className="btn btn-primary">
                                🎓 Student Portal
                            </Link>
                            <Link to="/login/faculty" className="btn btn-secondary">
                                🧑‍🏫 Faculty Portal
                            </Link>
                        </div>
                    </div>

                    <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="stat-item">
                            <span className="stat-number">15K+</span>
                            <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">800+</span>
                            <span className="stat-label">Faculty</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Programs</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">95%</span>
                            <span className="stat-label">Placement</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Announcements Ticker */}
            <section className="announcements-bar">
                <div className="container announcements-content">
                    <span className="announcement-label">📢 Announcement</span>
                    <p className="announcement-text" key={currentAnnouncement}>
                        {announcements[currentAnnouncement]}
                    </p>
                </div>
            </section>

            {/* Events Section */}
            <section className="section events-section">
                <div className="container">
                    <h2 className="section-title">Campus Events</h2>
                    <p className="section-subtitle">Stay updated with what's happening around campus</p>

                    <div className="event-tabs">
                        <button className={`event-tab ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming Events</button>
                        <button className={`event-tab ${activeTab === 'ongoing' ? 'active' : ''}`} onClick={() => setActiveTab('ongoing')}>Ongoing Events</button>
                    </div>

                    <div className="events-grid">
                        {filteredEvents.map((event, index) => (
                            <div className="event-card glass-card animate-fade-in-up" key={event.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="event-card-top">
                                    <span className="event-tag">{event.tag}</span>
                                    <span className="event-date">
                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-desc">{event.description}</p>
                                <button className="btn btn-secondary" style={{ marginTop: 'auto', width: '100%' }}>Learn More →</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section className="section news-section">
                <div className="container">
                    <h2 className="section-title">Latest News</h2>
                    <p className="section-subtitle">What's new at Vel Tech University</p>
                    <div className="news-grid">
                        {news.map((item, index) => (
                            <div className="news-card glass-card animate-fade-in-up" key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="news-date">
                                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                                <h3 className="news-title">{item.title}</h3>
                                <p className="news-desc">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container cta-content">
                    <h2>Ready to Begin Your Journey?</h2>
                    <p>Join thousands of students who are shaping their future at Vel Tech University</p>
                    <div className="cta-actions">
                        <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
                        <Link to="/about" className="btn btn-secondary">Learn More</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
