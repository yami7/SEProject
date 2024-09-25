// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Home from './Login';
import About from './About';
import Users from './Users';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const location = useLocation();

    // Check if the current route is the home page
    const isHomePage = location.pathname === '/';

    return (
        <div style={{ display: 'flex' }}>
            {!isHomePage && <Sidebar />}
            <div style={{ marginLeft: isHomePage ? '0' : '260px', padding: '20px', flexGrow: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/Users" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
};

const MainApp = () => (
    <Router>
        <App />
    </Router>
);

export default MainApp;
