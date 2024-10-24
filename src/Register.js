import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error
        setSuccess(''); // Clear previous success message

        // Frontend validation checks
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            // Make the API call to register
            const response = await axios.post('https://1177-2600-6c50-6700-fdf9-4d13-fd16-b4eb-4353.ngrok-free.app/v1/user/register', {
                email,
                password,
            });

            // Assuming the API returns a success status on successful registration
            if (response.data.success) {
                setSuccess('Registration successful! Please log in.');
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            } else {
                setError('Registration failed: ' + response.data.message);
            }
        } catch (err) {
            // Handle error responses
            setError('Error during registration: ' + (err.response?.data?.message || 'Please try again.'));
        }
    };

    // Email validation function
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        return regex.test(email);
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
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
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-danger mb-3">{error}</div>}
                {success && <div className="text-success mb-3">{success}</div>}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
