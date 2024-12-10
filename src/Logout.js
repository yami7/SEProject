import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for redirection

const Logout = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Are you sure you want to logout?</h2>
        <button onClick={onConfirm} style={buttonStyle}>Yes</button>
        <button onClick={onClose} style={buttonStyle}>No</button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  minWidth: '300px',
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default Logout;
