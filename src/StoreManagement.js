import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStore,FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './Country.css';
import API_URL from './configapi.js';

const App = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if we're editing an existing country
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    image: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          `${API_URL}/v1/country/admin/get-country`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('///', result);
        setResponse(result.data.data.categories); // Access the categories array
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      title: formData.title,
      image: formData.image,
    };

    try {
      const apiUrl = isEditing
        ? `${API_URL}/v1/country/admin/edit-country`
        : `${API_URL}/v1/country/admin/add-country`;
        console.log()
      const response = await axios.post(apiUrl, {
        ...requestData,
        ...(isEditing && { _id: formData.id }), // Include ID if editing
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (isEditing) {
        // Update the existing country in the list
        setResponse((prevResponse) =>
          prevResponse.map((category) =>
            category._id === formData.id ? { ...category, title: formData.title, image: formData.image } : category
          )
        );
      } else {
        // Add the new country to the list
        setResponse((prevResponse) => [...prevResponse, response.data]);
      }

      toggleModal(); // Close the modal after submission
      setIsEditing(false); // Reset editing state
      window.location.reload(); 
    } catch (error) {
      setError('Error saving country');
    }
  };

  const handleEditClick = (category) => {
    setFormData({
      id: category._id,
      title: category.title,
      image: category.image,
    });
    setIsEditing(true); // Mark as editing
    toggleModal(); // Open the modal
  };
   // Handle delete click - sends id to the backend for deletion
   const handleDeleteClick = async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/v1/country/admin/delete-country`,
        { id }, // Send the id to delete
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Remove the deleted country from the list
      setResponse((prevResponse) =>
        prevResponse.filter((category) => category._id !== id)
      );

      // Optionally, set a success message here
      console.log('Country deleted successfully:', response.data);
    } catch (error) {
      setError('Error deleting country');
      console.error('Error deleting country:', error);
    }
  };

  

  return (
    <div className="container mt-5">
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-danger">Error: {error}</div>}

      <h2>Product List</h2>

      
      <button onClick={toggleModal} className=".add-btn" style={styles.addButton}>
        Add New Product
      </button>

      {response && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {response.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.title}</td>
                <td>{category.Price}</td>
                <td>
                  <img
                    src={category.image}
                    alt={`Product of ${category.title}`}
                    style={{ width: '50px', height: '30px' }}
                  />
                </td>
                <td>
                  <FaTrash
                    onClick={() => handleDeleteClick(category._id)} // Open modal for editing
                    style={{ cursor: 'pointer', color: '#28a745', fontSize: '20px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal-overlay" style={modalOverlayStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Product Name</label>
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
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Product Price</label>
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
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Upload Image</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const styles = {
  addButton: {
    position: 'fixed',   // Fixes the button to the screen, even when scrolling
    top: '10px',         // Adjust the distance from the top of the screen
    right: '10px',       // Adjust the distance from the right side of the screen
    zIndex: 1000,        // Ensure the button stays above other elements
    padding: '8px 15px', // Adds some padding for a better button size
    fontSize: '14px',    // Smaller font size for a more compact button
    borderRadius: '5px' // Rounded corners for the button
  }
};

export default App;
