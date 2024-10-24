import React from 'react';
import { useNavigate } from 'react-router-dom';


const Frontpage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Redirect to login page
    };

    const handleRegister = () => {
        navigate('/register'); // Redirect to register page
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center', // Center the text
            margin: 0 // Ensure no default margin
        }}>
            
            <h1 style={{ margin: '0 0' }}>Track The Trail</h1>
            <p style={{ margin: '0 0' }}>Admin Interface</p>
            <button onClick={handleLogin} className="btn btn-primary" style={{ margin: '10px' }}>
                Login
            </button>
            <button onClick={handleRegister} className="btn btn-secondary" style={{ margin: '10px' }}>
                Register
            </button>
        </div>
    );
};

export default Frontpage;
