import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 5,
        completedChallenges: 1,
        liveChallenges: 2,
        totalKMsHiked: 35,
    });

    useEffect(() => {
        // Fetch the data from an API or data source
        const fetchData = async () => {
            // Replace with your API endpoint
            const response = await fetch('/api/stats');
            const data = await response.json();
            setStats(data);
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="stats-container">
                <div className="stat-card">
                    <h3>{stats.users}</h3>
                    <p>Users</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.completedChallenges}</h3>
                    <p>Completed Challenges</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.liveChallenges}</h3>
                    <p>Live Challenges</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.totalKMsHiked}</h3>
                    <p>Total Miles Hiked</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
