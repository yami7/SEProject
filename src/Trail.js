import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trail.css';

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
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchChallenges();
        fetchCountries();
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
        console.log("Submitting Form Data: ", formData);
        try {
            const response = await axios.post('https://1177-2600-6c50-6700-fdf9-4d13-fd16-b4eb-4353.ngrok-free.app/v1/challenge/admin/add-challenge', formData);
            console.log('Success:', response.data);
            setChallenges(prevChallenges => [
                ...prevChallenges,
                {
                    id: response.data.id || prevChallenges.length + 1,
                    title: formData.title,
                    distance: formData.distance,
                    isHide: formData.isHide,
                }
            ]);
            setSuccessMessage('Trail added successfully!');
            setErrorMessage('');
            toggleForm();
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : error.message);
            setSuccessMessage('');
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const fetchChallenges = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.get('http://localhost:8000/v1/challenge/get-challenges', config);
            setChallenges(response.data?.data);
            setSuccessMessage('Challenges fetched successfully!');
            console.log('Fetched challenges:', response.data);
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : error.message);
            console.error('Error fetching challenges:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCountries = async () => {
        setLoadingCountries(true);
        try {
            const response = await axios.get('http://localhost:8000/v1/country/get-all-countries');
            setCountries(response.data?.data); // Adjust based on the response structure
            console.log('Fetched countries:', response.data);
        } catch (error) {
            console.error('Error fetching countries:', error.response ? error.response.data : error.message);
        } finally {
            setLoadingCountries(false);
        }
    };

    return (
        <div className='trailpageonly'>
            <h2>Trails</h2>
            <div className='d-flex float-right'>
                <button onClick={toggleForm} className="btn btn-primary col-2">Add Trail</button>
            </div>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add Trails</h2>
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
                            {/* <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    className="form-control"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div> */}
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
                    <h2>Active Trails</h2>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Distance</th>
                                <th>Hide</th>
                                <th>Create Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {challenges.length > 0 && challenges.map((challenge, index) => (
                                <tr key={challenge.id}>
                                    <td>{challenge.id}</td>
                                    <td>{challenge.title}</td>
                                    <td>{challenge.distance} Miles</td>
                                    <td>{challenge.isHide ? 'Yes' : 'No'}</td>
                                    <td>{Date(challenge.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Display the countries */}
            <div className='country-list'>
                <h2>Available Countries</h2>
                {loadingCountries ? (
                    <p>Loading countries...</p>
                ) : (
                    <ul>
                        {countries.categories && countries.categories.length > 0 && countries.categories.map((country, index) => (
                            <li key={index}>{country.title}</li> // Adjust based on the property names
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Trail;