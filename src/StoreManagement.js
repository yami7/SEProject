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
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    img: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(
          `${API_URL}/v1/product/admin/get-all-products`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('///', result);
        setResponse(result.data.data.productList.products); // Access the categories array
        console.log('result.data.data.productList.products')
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
      price: formData.price,
      img: formData.img,
    };

    try {
      // Always use add-country API since editing is removed
      const response = await axios.post(`${API_URL}/v1/product/admin/add-product`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Add the new country to the list
      setResponse((prevResponse) => [...prevResponse, response.data]);

      toggleModal(); // Close the modal after submission
      setFormData({ title: '', price: '', img: '' }); // Reset form data
    } catch (error) {
      setError('Error saving product');
    }
  };

  // Handle delete click - sends id to the backend for deletion
  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/v1/product/admin/delete-product/675741638aca1795373b2244`,
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

      {/* Add New Country Button */}
      <button onClick={toggleModal} className="add-btn" style={styles.addButton}>
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
                <td>{category.price}</td>
                <td>
                  <img
                    src={category.img}
                    alt={`Flag of ${category.title}`}
                    style={{ width: '50px', height: '30px' }}
                  />
                </td>
                <td>
                  <FaTrash
                    onClick={() => handleDeleteClick(category._id)} // Handle delete click
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
            <h2>Add Product</h2>
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
                <label htmlFor="price" className="form-label">Product Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="img" className="form-label">Product Image</label>
                <input
                  type="text"
                  id="img"
                  name="img"
                  className="form-control"
                  value={formData.img}
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
    borderRadius: '5px'  // Rounded corners for the button
  }
};

export default App;
