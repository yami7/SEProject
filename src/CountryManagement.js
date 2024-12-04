import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Create a functional component
const App = () => {
  // Define state to hold API response
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true); // Start as loading true since the data will be fetched on mount
  const [error, setError] = useState(null);

  // State for modal and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    countryName: '',
    image: null,
  });

  // Fetch data automatically when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = 
        await axios.post('https://066a-2600-6c50-6700-fdf9-983f-77ff-710c-a082.ngrok-free.app/v1/country/admin/get-country', {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        console.log('///',result)
        setResponse(result.data.data.categories); // Access the categories array
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle form data changes (both text input and file input)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], // Store the image file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission to save the country
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const newFormData = new FormData();
    // newFormData.append('countryName', formData.title);
    // newFormData.append('image', formData.image); // Append image file
    let requestData = {
        title: formData.title,
        image: formData.image
    }
    try {
      const response = await axios.post(
        'https://066a-2600-6c50-6700-fdf9-983f-77ff-710c-a082.ngrok-free.app/v1/country/admin/add-country', // Your API URL
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // Add the new country to the list after successful submission
      setResponse((prevResponse) => [
        ...prevResponse,
        response.data, // Assuming the response contains the new country object
      ]);
      toggleModal(); // Close the modal after submission
    } catch (error) {
      setError('Error saving country');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Show loading spinner until data is fetched */}
      {loading && <div>Loading...</div>}

      {/* Show error message if there's an error */}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {/* If data is available, display the table */}
      {response && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Country</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {response.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.title}</td>
                <td>
                  <img 
                    src={category.image} 
                    alt={`Flag of ${category.title}`} 
                    style={styles.flagImage} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Top-right corner button to open the modal */}
      <button
        onClick={toggleModal}
        style={styles.addButton}
      >
        Add New Country
      </button>

      {/* Modal for adding a country */}
      {isModalOpen && (
        <div className="modal-overlay" style={modalOverlayStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h2>Add Country</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Country Name</label>
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
                <label htmlFor="image" className="form-label">Upload Flag</label>
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

// Inline CSS for table styling
const styles = {
  table: {
    marginTop: '20px',
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
    textAlign: 'left',
    padding: '10px',
  },
  tableCell: {
    padding: '8px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  flagImage: {
    width: '50px', // Adjust flag size as needed
    height: '30px',
  },
  addButton: {
    padding: '8px 16px', // Smaller padding for a smaller button
    backgroundColor: '#007bff', // Bootstrap primary color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px', // Smaller font size
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

// CSS for modal and button positioning
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

export default App;
