import React, { useState } from 'react';
import axios from 'axios'; // If you want to use axios for API calls

// Create a functional component
const App = () => {
  // Define state to hold API response
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle button click, which makes the API call
  const handleButtonClick = async () => {
    setLoading(true);
    setError(null); // Reset the error state before API call

    try {
      // Make an API call using axios (replace with your API endpoint)
      const result = await axios.get('https://jsonplaceholder.typicode.com/users'); // Example API for countries
      setResponse(result.data); // Set the API response data in state
    } catch (err) {
      setError('Error fetching data'); // Set error message if API call fails
    } finally {
      setLoading(false); // Turn off loading spinner
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Button styled to be at the top-right corner */}
      <button
        style={styles.button}
        onClick={handleButtonClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Country List'}
      </button>

      {/* Error message */}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {/* If data is available, display the table */}
      {response && (
        <table style={styles.table}>
          <thead>
            <tr>
            <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {response.map((user) => (
              <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Inline CSS for button and table styling
const styles = {
  button: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    marginTop: '80px', // Add space between the button and the table
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
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
};

export default App;
