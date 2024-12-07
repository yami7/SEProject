// Sidebar.js
import React, { useState } from 'react';
import { FaBell, FaUsers, FaInfoCircle,FaFlag,FaMapMarkerAlt } from 'react-icons/fa';
import { GiTrail } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import LogoutModal from './Logout'; // Ensure this path is correct
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
            <h2 className={`sidebar-title ${isOpen ? 'visible' : 'hidden'}`}>Track The Trail</h2>
            <ul>
                <li>
                    <Link to="/Dashboard">
                        <FaMapMarkerAlt /> {isOpen && 'Dashboard'}
                    </Link>
                </li>
                <li>
                    <Link to="/trail">
                        <GiTrail /> {isOpen && 'Trails'}
                    </Link>
                </li>
                <li>
                    <Link to="/Users">
                        <FaUsers /> {isOpen && 'Users'}
                    </Link>
                </li>
                <li>
                    <Link to="/Notifications">
                        <FaBell /> {isOpen && 'Notifications'}
                    </Link>
                </li>
                <li>
                    <Link to="/InappInfo">
                        <FaInfoCircle /> {isOpen && 'InappInfo'}
                    </Link>
                </li>
                <li>
                    <Link to="/CountryManagement">
                        <FaFlag /> {isOpen && 'Country Management'}
                    </Link>
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
