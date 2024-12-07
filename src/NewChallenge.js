// "coordinates": [
//     {
//         "longitude": 114.1386328374189,
//         "latitude": 22.27983241126931
//     },
//     {
//         "longitude": 114.135657598874,
//         "latitude": 22.27934880963214
//     },
//     {
//         "longitude": 114.1375258816053,
//         "latitude": 22.27599517911032
//     },
//     {
//         "longitude": 114.149515705349,
//         "latitude": 22.27118410260248
//     }
// ]

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewChallenge.css';

const NewChallenge = ({ initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        challengeName: '',
        elevationGain: '',
        difficulty: '',
        description: '',
        countryId: '',
        challengeType: 'Day Hike',
        distance: '',
        price: '',
        colorGradient: [],
        image: '', // Add the image field
        isHide: false,
        withRedemption: false,
        route: {
            coordinates: [
                {"longitude" : 114.1386328374189, "latitude" : 22.27983241126931},
                {"longitude" : 114.135657598874, "latitude" : 22.27934880963214},
                {"longitude": 114.1375258816053, "latitude": 22.27599517911032},
                {"longitude": 114.149515705349,"latitude": 22.27118410260248}
            ],
        },
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                challengeName: initialData.challengeName || '',
                elevationGain: initialData.elevation || '',
                difficulty: initialData.difficulty || '',
                description: initialData.howItWorks || '',
                countryId: initialData.countryId || '',
                challengeType: 'Day Hike',
                distance: initialData.distance || '',
                price: initialData.price || '',
                colorGradient: initialData.colorGradient || [],
                image: initialData.image || '',
                isHide:false,
                withRedemption: false,
                route: initialData.route || {
                    coordinates: [
                        { latitude: "22.27983241126931", longitude: "114.1386328374189" },
                        { latitude: "22.27934880963214", longitude: "114.135657598874" },
                    ],
                },
            });
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(
                'https://be05-2600-6c50-6700-fdf9-6559-352b-92dc-f4c8.ngrok-free.app/v1/challenge/admin/add-challenge',
                formData
            );

            console.log('API Response:', response.data);

            if (response.data) {
                setSuccess('Challenge created successfully!');
                setFormData(response.data);
                // setFormData({
                //     title: '',
                //     challengeName: '',
                //     elevationGain: '',
                //     difficulty: '',
                //     description: '',
                //     countryId: '',
                //     challengeType: '',
                //     distance: '',
                //     price: '',
                //     colorGradient: [],
                //     image: '',
                //     isHide: false,
                //     withRedemption: false,
                //     route: {
                //         coordinates: [
                //             { latitude: "22.27983241126931", longitude: "114.1386328374189" },
                //             { latitude: "22.27934880963214", longitude: "114.135657598874" },
                //         ],
                //     },
                // });
            } else {
                setError('Failed to create challenge: ' + (response.data.message || 'Unexpected error.'));
            }
        } catch (err) {
            console.error('Error creating challenge:', err.response?.data || err.message);
            setError('Error creating challenge: ' + (err.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <div>
            <h1>Create New Challenge</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
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
                    <label className="form-label">Challenge Name</label>
                    <input
                        type="text"
                        name="challengeName"
                        className="form-control"
                        value={formData.challengeName}
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
                        name="description"
                        className="form-control"
                        rows="3"
                        value={formData.description}
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
                    <label className="form-label">Challenge Type</label>
                    <input
                        type="text"
                        name="challengeType"
                        className="form-control"
                        disabled={true}
                        value={formData.challengeType}
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
                {/* <div className="mb-3">
                    <label className="form-label">Hide Challenge</label>
                    <input
                        type="checkbox"
                        name="isHide"
                        className="form-check-input"
                        checked={formData.isHide}
                        onChange={handleInputChange}
                    />
                </div> */}
                {/* <div className="mb-3">
                    <label className="form-label">With Redemption</label>
                    <input
                        type="checkbox"
                        name="withRedemption"
                        className="form-check-input"
                        checked={formData.withRedemption}
                        onChange={handleInputChange}
                    />
                </div> */}
                {error && <div className="text-danger mb-3">{error}</div>}
                {success && <div className="text-success mb-3">{success}</div>}
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
};

export default NewChallenge;
