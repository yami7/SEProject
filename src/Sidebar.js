// Sidebar.js
import React, { useState } from 'react';
import { FaInfoCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoutModal from './Logout';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        setModalOpen(true);
    };

    const confirmLogout = () => {
        setModalOpen(false);
        // Navigate to login or home page
        window.location.href = '/'; // Redirect to login page
    };

    const cancelLogout = () => {
        setModalOpen(false);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Open'}
            </button>
            <h2 className={`sidebar-title ${isOpen ? 'visible' : 'hidden'}`}>Dashboard</h2>
            <ul>
                <li><Link to="/about"><FaInfoCircle /> {isOpen && 'About'}</Link></li>
                <li><Link to="/Users"><FaEnvelope /> {isOpen && 'Users'}</Link></li>
                <li>
                    <button onClick={handleLogout} className="logout-btn">
                        <FaSignOutAlt /> {isOpen && 'Logout'}
                    </button>
                </li>
            </ul>
            <LogoutModal 
                isOpen={modalOpen} 
                onConfirm={confirmLogout} 
                onCancel={cancelLogout} 
            />
        </div>
    );
};

export default Sidebar;
