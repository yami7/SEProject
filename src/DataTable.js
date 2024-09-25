// DataTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
            setData([...data, response.data]);
            setNewUser({ name: '', email: '', phone: '' }); // Clear the form
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">User Data</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleChange}
                    required
                    className="form-control mb-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleChange}
                    required
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newUser.phone}
                    onChange={handleChange}
                    required
                    className="form-control mb-2"
                />
                <button type="submit" className="btn btn-primary">Add User</button>
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
