import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewChallenge.css';
import Map from './map'; // Importing the Map component from map.js
import { useNavigate } from 'react-router-dom';

const NewChallenge = ({ initialData }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        challengeName: '',
        elevationGain: '',
        difficulty: '',
        howItWorks: '',
        countryId: '',
        challengeType: 'Day Hike',
        distance: '',
        price: '',
        color1: '', // First color input for the gradient
        color2: '', // Second color input for the gradient
        image: '',
        isHide: false,
        withRedemption: false,
        route: { coordinates: [] }, // Route coordinates
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Load initial data if provided
    useEffect(() => {
        if (initialData) {
            setFormData({ ...formData, ...initialData });
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
   const handleRouteUpdate = (routeData) => {
    // routeData should contain { start, end, waypoints }
    const coordinates = [
        { "latitude": routeData.start.lat, "longitude": routeData.start.lng },
        ...routeData.waypoints.map(point => ({ "latitude": point.lat, "longitude": point.lng })),
        { "latitude": routeData.end.lat, "longitude": routeData.end.lng },
    ];

    setFormData(prevState => ({
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
            // Combine the two color gradients into one array
            const combinedcolor = [formData.color1, formData.color2].filter(Boolean); // Filters out empty strings

            const sanitizedData = {
                ...formData,
                color: combinedcolor, // Combined color gradient
                route: {
                    coordinates: formData.route.coordinates, // Include full coordinates
                },
            };

            console.log('Sending data to API:', sanitizedData); // Debug log

            const response = await axios.post(
                'https://e278-2600-6c50-6700-fdf9-ade5-d7a8-727b-194.ngrok-free.app/v1/challenge/admin/add-challenge',
                sanitizedData
            );

            if (response.data) {
                setSuccess('Challenge added successfully!');
                console.log('Challenge added successfully:', response.data); // Debug log
                navigate('/trail');
                // Optionally reset the form here
                setFormData({
                    title: '',
                    challengeName: '',
                    elevationGain: '',
                    difficulty: '',
                    howItWorks: '',
                    countryId: '',
                    challengeType: 'Day Hike',
                    distance: '',
                    price: '',
                    color1: '',
                    color2: '',
                    image: '',
                    isHide: false,
                    withRedemption: false,
                    route: { coordinates: [] },
                });
            } else {
                setError('Failed to add challenge: ' + (response.data.message || 'Unexpected error.'));
            }
        } catch (err) {
            console.error('Error adding challenge:', err.response?.data || err.message); // Debug log
            setError('Error adding challenge: ' + (err.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <div>
            <h1>Add New Challenge</h1>
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
                        name="elevationGain"
                        className="form-control"
                        value={formData.elevationGain}
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
                        placeholder="#000000"
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
                        placeholder="#FFFFFF"
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
                <Map onRouteUpdate={handleRouteUpdate} />

                {/* Error and Success Messages */}
                {error && <div className="text-danger mb-3">{error}</div>}
                {success && <div className="text-success mb-3">{success}</div>}

                {/* Submit Button */}
                <button type="submit" className="btn btn-success">
                    Add Challenge
                </button>
            </form>
        </div>
    );
};

export default NewChallenge;
