import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import API_URL from './configapi.js';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        userCount: 0,
        completedCount: 0,
        activeCount: 0,
        totalDuration: 0, // Default value
    });
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch data from the given API URL
        const fetchData = async () => {
            try {
                // Use axios to fetch data, assuming it's a GET request
                const response = await axios.post(`${API_URL}/v1/user/admin/dashboard`);

                // Check if the response is successful
                if (response.status === 200) {
                    const data = response.data;

                    // Update the stats with the fetched data
                    setStats({
                        userCount: data.data.userCount, // Fetch userCount from API
                        completedCount: data.data.completedCount, // Fetch completedCount from API
                        activeCount: data.data.activeCount, // Fetch activeCount from API
                        totalDuration: data.data.totalDuration, // Fetch totalDuration from API
                    });
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                setError(error.message); // Set error if fetch fails
            } finally {
                setLoading(false); // Set loading to false once the fetch is complete
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect once when the component mounts

    if (loading) {
        return (
            <div className="loading">
                <h3>Loading...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h3>Error: {error}</h3>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="stats-container">
                <div className="stat-card">
                    <h3>{stats.userCount}</h3>
                    <p>User</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.completedCount}</h3>
                    <p>Completed Challenges</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.totalDuration}</h3>
                    <p>Total Miles Hiked</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.activeCount}</h3>
                    <p>Live Challenges</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
