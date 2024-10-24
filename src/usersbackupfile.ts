//Users.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Set the number of items per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setData([{
                    id: 1,
                    name: 'yamini',
                    email: "yamini@gmail.com",
                    phone: "+1 3233175840"
                },
                {
                    id: 2,
                    name: 'Kinnari',
                    email: "kinnari@gmail.com",
                    phone: "+1 6263920348"
                }, {
                    id: 3,
                    name: 'Parth',
                    email: "parth@gmail.com",
                    phone: "+1 3344383949"
                }, {
                    id: 4,
                    name: 'Jatin',
                    email: "jatin@gmail.com",
                    phone: "+1 6784762526"
                }, {
                    id: 5,
                    name: 'Nikhil',
                    email: "nikhil@gmail.com",
                    phone: "+1 7676465253"
                }]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate the index of the last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate the index of the first item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Get the current items
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

    return (
        <div className="background-container">
            <div className="container mt-5">
                <h2>User Data</h2>

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
                        {currentItems.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                <button className="page-link" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Users;
