import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trail.css';
import { FaEdit } from 'react-icons/fa';
import './Country.css';

const Trail = () => {
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
                    `https://be05-2600-6c50-6700-fdf9-6559-352b-92dc-f4c8.ngrok-free.app/v1/challenge/admin/update-challenge/${editingChallenge._id}`,
                    formData
                );
                setSuccessMessage('Challenge updated successfully!');
            } else {
                // Add new challenge
                response = await axios.post(
                    'https://be05-2600-6c50-6700-fdf9-6559-352b-92dc-f4c8.ngrok-free.app/v1/challenge/admin/add-challenge',
                    formData
                );
                setSuccessMessage('Challenge added successfully!');
            }
            setChallenges(prevChallenges => [
                ...prevChallenges,
                response.data // Assuming the response contains the new or updated challenge
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
            const response = await axios.post('https://be05-2600-6c50-6700-fdf9-6559-352b-92dc-f4c8.ngrok-free.app/v1/challenge/get-challenges');
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

    // Handle editing of a challenge
    const handleEditClick = (challenge) => {
        setEditingChallenge(challenge);
        setFormData({
            title: challenge.title,
            distance: challenge.distance,
            image: challenge.image,
            price: challenge.price,
            withRedemption: challenge.withRedemption,
            isHide: challenge.isHide,
        });
        toggleForm();
    };

    

    return (
        <div className='trailpageonly'>
            <h2>Trails</h2>
            <div className='d-flex float-right'>
                <button onClick={toggleForm} className="add-btn">Add Trail</button>
            </div>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingChallenge ? 'Edit Trail' : 'Add Trail'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="distance" className="form-label">Distance</label>
                                <input
                                    type="number"
                                    id="distance"
                                    name="distance"
                                    className="form-control"
                                    value={formData.distance}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    id="withRedemption"
                                    name="withRedemption"
                                    className="form-check-input"
                                    checked={formData.withRedemption}
                                    onChange={handleChange}
                                />
                                <label htmlFor="withRedemption" className="form-check-label">With Redemption</label>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    id="isHide"
                                    name="isHide"
                                    className="form-check-input"
                                    checked={formData.isHide}
                                    onChange={handleChange}
                                />
                                <label htmlFor="isHide" className="form-check-label">Hide</label>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={toggleForm}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

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
                            {challenges.length > 0 && challenges.map((challenge) => (
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
                                        onClick={() => handleEditClick(challenge)} // Open modal for editing
                                        style={{ cursor: 'pointer', color: '#28a745', fontSize: '20px' }}
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
