import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trail.css';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Trail = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        distance: 0,
        image: '',
        price: 0,
        title: '',
        withRedemption: true,
        isHide: false,
    });
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingChallenge, setEditingChallenge] = useState(null);

    // Fetch challenges from API
    useEffect(() => {
        fetchChallenges();
    }, []);

    const toggleForm = () => setIsOpen(!isOpen);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingChallenge) {
                // Edit existing challenge
                response = await axios.put(
                    `https://e278-2600-6c50-6700-fdf9-ade5-d7a8-727b-194.ngrok-free.app/v1/challenge/admin/update-challenge/${editingChallenge._id}`,
                    formData
                );
                setSuccessMessage('Challenge updated successfully!');
            } else {
                // Add new challenge
                response = await axios.post(
                    'https://e278-2600-6c50-6700-fdf9-ade5-d7a8-727b-194.ngrok-free.app/v1/challenge/admin/add-challenge',
                    formData
                );
                setSuccessMessage('Challenge added successfully!');
            }
            setChallenges((prevChallenges) => [
                ...prevChallenges,
                response.data, // Assuming the response contains the new or updated challenge
            ]);
            setErrorMessage('');
            toggleForm();
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : error.message);
            setSuccessMessage('');
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    // Fetch challenges from the API
    const fetchChallenges = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const response = await axios.post(
                'https://e278-2600-6c50-6700-fdf9-ade5-d7a8-727b-194.ngrok-free.app/v1/challenge/get-challenges'
            );
            const challenges = Object.values(response.data?.data || {}).flat(); // Flatten the categories into a single array
            setChallenges(challenges);
            setSuccessMessage('Challenges fetched successfully!');
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : error.message);
            console.error('Error fetching challenges:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTrailClick = () => {
        navigate('/Challenge'); // Ensure this route is set up in your router configuration
    };

    // Updated handleEditClick function
    const handleEditClick = (challenge) => {
        console.log('Challenge data being passed:', challenge);
        navigate('/EditChallenge', { state: { challenge } });
    };
    

    return (
        <div className="trailpageonly">
            <h2>Trails</h2>
            <div className="d-flex float-right">
                <button onClick={handleAddTrailClick} className="add-btn">
                    Add Trail
                </button>
            </div>

            {loading ? (
                <p>Loading challenges...</p>
            ) : (
                <div>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Distance</th>
                                <th>Challenge Type</th>
                                <th>Elevation</th>
                                <th>Difficulty level</th>
                                <th>Created Date</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {challenges.length > 0 &&
                                challenges.map((challenge) => (
                                    <tr key={challenge._id}>
                                        <td>{challenge._id}</td>
                                        <td>{challenge.title}</td>
                                        <td>{challenge.distance}</td>
                                        <td>{challenge.challengeType || 'N/A'}</td>
                                        <td>{challenge.elevation}</td>
                                        <td>{challenge.difficulty}</td>
                                        <td>{new Date(challenge.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <FaEdit
                                                onClick={() => handleEditClick(challenge)}
                                                style={{
                                                    cursor: 'pointer',
                                                    color: '#28a745',
                                                    fontSize: '20px',
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Trail;
