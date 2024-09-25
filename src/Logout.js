// LogoutModal.js
import React from 'react';
import './Logout.css'; // Add CSS styles for the modal

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Logout Confirmation</h2>
                <p>Are you sure you want to log out?</p>
                <button className="btn btn-danger" onClick={onConfirm}>Yes</button>
                <button className="btn btn-secondary" onClick={onCancel}>No</button>
            </div>
        </div>
    );
};

export default LogoutModal;
