import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStore } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './Country.css';
import API_URL from './configapi.js';

const App = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setResponse(result.data.data && result.data.data.productList && result.data.data.productList[0].products); // Access the product list
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-danger">Error: {error}</div>}

      <h2>Product List</h2>

      {/* Product List Table */}
      {response && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>User Id</th>
              <th>User Name</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Image</th>
              <th>User Address</th>
            </tr>
          </thead>
          <tbody>
            {response.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.}</td>
                <td>{product.}</td>
                <td>{product.}</td>
                <td>{product.}</td>
                <td>
                  <img
                    src={product.immmage}
                    alt={`Product ${product.title}`}
                    style={{ width: '50px', height: '30px' }}
                  />
                </td>
                <td>{product.addr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
