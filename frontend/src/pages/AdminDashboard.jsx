import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import ConfirmDialog from '../components/ConfirmDialog';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('events');
    const [events, setEvents] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, title: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [eventsRes, newsRes] = await Promise.all([
                adminAPI.getEvents(),
                adminAPI.getNews()
            ]);
            setEvents(eventsRes.data);
            setNews(newsRes.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        }
        setLoading(false);
    };

    // ── Modal Handlers ──────────────────────────

    const openCreateModal = () => {
        setEditingItem(null);
        if (activeTab === 'events') {
            setFormData({ title: '', description: '', date: '', category: 'upcoming', tag: '', location: '' });
        } else {
            setFormData({ title: '', description: '', date: '', content: '' });
        }
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({ ...item });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ── CRUD Operations ─────────────────────────

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeTab === 'events') {
                if (editingItem) {
                    await adminAPI.updateEvent(editingItem.id, formData);
                } else {
                    await adminAPI.createEvent(formData);
                }
            } else {
                if (editingItem) {
                    await adminAPI.updateNews(editingItem.id, formData);
                } else {
                    await adminAPI.createNews(formData);
                }
            }
            closeModal();
            fetchData();
        } catch (err) {
            console.error('Save failed:', err);
            alert('Failed to save. Please try again.');
        }
    };

    const handleDelete = (id) => {
        const item = (activeTab === 'events' ? events : news).find(i => i.id === id);
        setDeleteConfirm({ show: true, id, title: item?.title || '' });
    };

    const confirmDelete = async () => {
        const { id } = deleteConfirm;
        setDeleteConfirm({ show: false, id: null, title: '' });
        try {
            if (activeTab === 'events') {
                await adminAPI.deleteEvent(id);
            } else {
                await adminAPI.deleteNews(id);
            }
            fetchData();
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete. Please try again.');
        }
    };

    // ── Render ───────────────────────────────────

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner"></div>
                <p>Loading admin panel...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="admin-header-text">
                    <h1>⚙️ Admin Panel</h1>
                    <p>Manage events and news for Vel Tech University</p>
                </div>
            </div>

            <div className="admin-container container">
                {/* Tab Navigation */}
                <div className="admin-tabs">
                    <button
                        className={`admin-tab ${activeTab === 'events' ? 'active' : ''}`}
                        onClick={() => setActiveTab('events')}
                    >
                        📅 Events ({events.length})
                    </button>
                    <button
                        className={`admin-tab ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={() => setActiveTab('news')}
                    >
                        📰 News ({news.length})
                    </button>
                </div>

                {/* Action Bar */}
                <div className="admin-action-bar">
                    <h2>{activeTab === 'events' ? 'Manage Events' : 'Manage News'}</h2>
                    <button className="btn btn-primary admin-add-btn" onClick={openCreateModal}>
                        ➕ Add {activeTab === 'events' ? 'Event' : 'News'}
                    </button>
                </div>

                {/* Data Table */}
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                {activeTab === 'events' && <th>Category</th>}
                                {activeTab === 'events' && <th>Tag</th>}
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(activeTab === 'events' ? events : news).map((item) => (
                                <tr key={item.id}>
                                    <td className="td-title">{item.title}</td>
                                    <td className="td-date">{item.date}</td>
                                    {activeTab === 'events' && (
                                        <td>
                                            <span className={`badge badge-${item.category}`}>
                                                {item.category}
                                            </span>
                                        </td>
                                    )}
                                    {activeTab === 'events' && <td className="td-tag">{item.tag}</td>}
                                    <td className="td-desc">{item.description?.substring(0, 80)}...</td>
                                    <td className="td-actions">
                                        <button className="action-btn edit-btn" onClick={() => openEditModal(item)}>
                                            ✏️ Edit
                                        </button>
                                        <button className="action-btn delete-btn" onClick={() => handleDelete(item.id)}>
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {(activeTab === 'events' ? events : news).length === 0 && (
                                <tr>
                                    <td colSpan={activeTab === 'events' ? 6 : 4} className="empty-row">
                                        No {activeTab} found. Click "Add" to create one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingItem ? 'Edit' : 'Create'} {activeTab === 'events' ? 'Event' : 'News'}</h3>
                            <button className="modal-close" onClick={closeModal}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input
                                    type="text" name="title" className="form-input"
                                    value={formData.title || ''} onChange={handleChange} required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Date</label>
                                    <input
                                        type="date" name="date" className="form-input"
                                        value={formData.date || ''} onChange={handleChange} required
                                    />
                                </div>

                                {activeTab === 'events' && (
                                    <div className="form-group">
                                        <label className="form-label">Category</label>
                                        <select name="category" className="form-input" value={formData.category || 'upcoming'} onChange={handleChange}>
                                            <option value="upcoming">Upcoming</option>
                                            <option value="ongoing">Ongoing</option>
                                            <option value="past">Past</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            {activeTab === 'events' && (
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Tag</label>
                                        <input
                                            type="text" name="tag" className="form-input"
                                            value={formData.tag || ''} onChange={handleChange}
                                            placeholder="e.g. Technology, Culture"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Location</label>
                                        <input
                                            type="text" name="location" className="form-input"
                                            value={formData.location || ''} onChange={handleChange}
                                            placeholder="e.g. Main Auditorium"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description" className="form-input form-textarea"
                                    value={formData.description || ''} onChange={handleChange}
                                    rows={3} required
                                />
                            </div>

                            {activeTab === 'news' && (
                                <div className="form-group">
                                    <label className="form-label">Full Content</label>
                                    <textarea
                                        name="content" className="form-input form-textarea"
                                        value={formData.content || ''} onChange={handleChange}
                                        rows={4}
                                    />
                                </div>
                            )}

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary">
                                    {editingItem ? '💾 Update' : '➕ Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                show={deleteConfirm.show}
                title={`Delete ${activeTab === 'events' ? 'Event' : 'News'}`}
                message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirm({ show: false, id: null, title: '' })}
            />
        </div>
    );
}
