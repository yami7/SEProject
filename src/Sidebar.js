// Sidebar.js
import React, { useState } from 'react';
<<<<<<< HEAD
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from 'react-icons/fa';
=======
import { FaInfoCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoutModal from './Logout';
>>>>>>> AppTestingCMS
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
<<<<<<< HEAD
=======
    const [modalOpen, setModalOpen] = useState(false);
>>>>>>> AppTestingCMS

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

<<<<<<< HEAD
=======
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

>>>>>>> AppTestingCMS
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Open'}
            </button>
<<<<<<< HEAD
            <h2 className={`sidebar-title ${isOpen ? 'visible' : 'hidden'}`}>Menu</h2>
            <ul>
                <li><a href="#home"><FaHome /> {isOpen && 'Home'}</a></li>
                <li><a href="#about"><FaInfoCircle /> {isOpen && 'About'}</a></li>
                <li><a href="#services"><FaServicestack /> {isOpen && 'Services'}</a></li>
                <li><a href="#contact"><FaEnvelope /> {isOpen && 'Contact'}</a></li>
            </ul>
=======
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
>>>>>>> AppTestingCMS
        </div>
    );
};

export default Sidebar;
