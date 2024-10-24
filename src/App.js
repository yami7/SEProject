import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './Login'; // Login component
import Trail from './Trail';
import Users from './Users';
import Register from './Register';
import Frontpage from './Frontpage'; // Ensure correct import
import 'bootstrap/dist/css/bootstrap.min.css';
import Notifications from './Notifications';
import InappInfo from './InappInfo';
import Dashboard from './Dashboard';


const App = () => {
    const location = useLocation();

    // Check if the current route is the home page or register page
    const isFrontPage = location.pathname === '/';
    const isRegisterPage = location.pathname === '/register';
    const isLoginPage = location.pathname === '/login';


    return (
        <div style={{ display: 'flex' }}>
            {!isFrontPage && !isLoginPage && !isRegisterPage && <Sidebar />}
            <div style={{ marginLeft: isLoginPage || isRegisterPage ? '0' : '260px', padding: '20px', flexGrow: 1 }}>
                <Routes>
                    <Route path="/" element={<Frontpage />} /> {/* Set FrontPage as default */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/trail" element={<Trail />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Notifications" element={<Notifications />} />
                    <Route path="/InappInfo" element={<InappInfo />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
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
