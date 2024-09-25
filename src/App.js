// App.js
import React from 'react';
import Sidebar from './Sidebar';
import DataTable from './DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <div>
            <Sidebar />
            <div style={{ marginLeft: '260px', padding: '20px' }}>
                <DataTable />
            </div>
        </div>
    );
};

export default App;
