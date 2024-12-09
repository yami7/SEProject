import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewChallenge.css';
import Map from './map'; // Importing the Map component from map.js
import { useLocation, useNavigate } from 'react-router-dom';

const EditChallenge = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Access initial data passed through the navigation state
    const initialData = location.state?.challenge;

    const [formData, setFormData] = useState({
        title: '',
        challengeName: '',
        elevation: '',
        difficulty: '',
        howItWorks: '',
        countryId: '',
        challengeType: 'Day Hike',
        distance: '',
        price: '',
        color1: '', // First color input for the gradient
        color2: '', 
        image: '',
        isHide: false,
        withRedemption: false,
        route: { coordinates: [] },
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);

    // Load initial data if provided
    useEffect(() => {
        console.log('Initial data received in EditChallenge:', initialData);
        if (initialData) {
            setFormData({ ...formData, ...initialData, color1:initialData.colorGradient[0], color2:initialData.colorGradient[1]});

            // Extract start and end points from route coordinates
            if (initialData.route?.coordinates?.length > 0) {
                setStartPoint(initialData.route.coordinates[0]);
                setEndPoint(
                    initialData.route.coordinates[initialData.route.coordinates.length - 1]
                );
            }
        }
    }, [initialData]);

    // Update form data on input change
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Update route data from the Map component
    const handleRouteUpdate = (newRouteData) => {
        const { start, end, waypoints } = newRouteData;

        const coordinates = [
            { latitude: start.lat, longitude: start.lng },
            ...waypoints.map((point) => ({ latitude: point.lat, longitude: point.lng })),
            { latitude: end.lat, longitude: end.lng },
        ];

        setStartPoint(coordinates[0]); // Update start point
        setEndPoint(coordinates[coordinates.length - 1]); // Update end point

        setFormData((prevState) => ({
            ...prevState,
            route: {
                ...prevState.route,
                coordinates,
            },
        }));
    };

    // Submit form data to the API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const color = [formData.color1, formData.color2].filter(Boolean); 
            const response = await axios.post(
                `https://e278-2600-6c50-6700-fdf9-ade5-d7a8-727b-194.ngrok-free.app/v1/challenge/admin/edit-challenge`,
                {...formData,_id: formData._id, color}
            );

            if (response.data) {
                setSuccess('Challenge updated successfully!');
                navigate('/trail'); // Redirect to the trails page
            } else {
                setError('Failed to update challenge: ' + (response.data.message || 'Unexpected error.'));
            }
        } catch (err) {
            console.error('Error updating challenge:', err.response?.data || err.message);
            setError('Error updating challenge: ' + (err.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <div>
            <h1>Edit Challenge</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
                {/* Form Fields */}
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Elevation Gain (ft)</label>
                    <input
                        type="number"
                        name="elevation"
                        className="form-control"
                        value={formData.elevation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Difficulty (1-10)</label>
                    <input
                        type="number"
                        name="difficulty"
                        className="form-control"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="howItWorks"
                        className="form-control"
                        rows="3"
                        value={formData.howItWorks}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Country ID</label>
                    <input
                        type="number"
                        name="countryId"
                        className="form-control"
                        value={formData.countryId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Distance (miles)</label>
                    <input
                        type="number"
                        name="distance"
                        className="form-control"
                        value={formData.distance}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">color 1 (Hex)</label>
                    <input
                        type="text"
                        name="color1"
                        className="form-control"
                        value={formData.color1}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">color 2 (Hex)</label>
                    <input
                        type="text"
                        name="color2"
                        className="form-control"
                        value={formData.color2}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        className="form-control"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Map */}
                <Map
                    onRouteUpdate={handleRouteUpdate}
                    startPoint={startPoint} // Pass starting point to the Map
                    endPoint={endPoint} // Pass ending point to the Map
                />

                {/* Error and Success Messages */}
                {error && <div className="text-danger mb-3">{error}</div>}
                {success && <div className="text-success mb-3">{success}</div>}

                {/* Submit Button */}
                <button type="submit" className="btn btn-success">
                    Update Challenge
                </button>
            </form>
        </div>
    );
};

export default EditChallenge;
