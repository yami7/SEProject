import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './Login'; // Login component
import Trail from './Trail';
import Users from './Users';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Notifications from './Notifications';
import InappInfo from './InappInfo';
import Dashboard from './Dashboard';
import CountryManagement from './CountryManagement';
import Challenge from './Challenge';
import EditChallenge from './EditChallenge';



const App = () => {
    const location = useLocation();

    // Check if the current route is the home page or register page
    
    const isRegisterPage = location.pathname === '/register';
    const isLoginPage = location.pathname === '/';


    return (
        <div style={{ display: 'flex' }}>
            {!isLoginPage && !isRegisterPage && <Sidebar />}
            <div style={{ marginLeft: isLoginPage || isRegisterPage ? '0' : '260px', padding: '20px', flexGrow: 1 }}>
                <Routes>
                    
                    <Route path="/" element={<Login />} />
                    <Route path="/trail" element={<Trail />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Notifications" element={<Notifications />} />
                    <Route path="/InappInfo" element={<InappInfo />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/CountryManagement" element={<CountryManagement />} />
                    <Route path="/Challenge" element={<Challenge />} /> {/* NewChallenge page */}
                    <Route path="/EditChallenge" element={<EditChallenge />} />
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
