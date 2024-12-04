import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error

        // Frontend validation checks
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            // Verify the email
            

            // Proceed only if email is verified
         
                // Make the API call to login
                const response = await axios.post('https://066a-2600-6c50-6700-fdf9-983f-77ff-710c-a082.ngrok-free.app/v1/user/login', {
                    email,
                    password
        });

                // Assuming the API returns a success status on successful login
                if (response.data.success) {
                    // Redirect to Users page upon successful validation
                    navigate('/Dashboard');
                } else {
                    setError('Invalid email or password');
                }
          
        } catch (err) {
            // Handle error responses
            setError('Error during login: ' + (err.response?.data?.message || 'Please try again.'));
        }
    };

    // Email validation function
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        return regex.test(email);
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-danger mb-3">{error}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
