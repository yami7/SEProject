// Sidebar.js
import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Open'}
            </button>
            <h2 className={`sidebar-title ${isOpen ? 'visible' : 'hidden'}`}>Menu</h2>
            <ul>
                <li><a href="#home"><FaHome /> {isOpen && 'Home'}</a></li>
                <li><a href="#about"><FaInfoCircle /> {isOpen && 'About'}</a></li>
                <li><a href="#services"><FaServicestack /> {isOpen && 'Services'}</a></li>
                <li><a href="#contact"><FaEnvelope /> {isOpen && 'Contact'}</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
