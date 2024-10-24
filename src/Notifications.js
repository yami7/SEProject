import React, { useState } from 'react';
import './Notifications.css';

const Notifications = () => {
  const [text, setText] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleAddNotification = () => {
    if (text.trim()) {
      setNotifications([...notifications, text]);
      setText(''); // Clear the input field
    }
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Type a new notification..."
          className="notification-input"
        />
        <button onClick={handleAddNotification} className="send-button">
          Send
        </button>
      </div>
      <h2>Notification List</h2>
      <ul className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))
        ) : (
          <li className="no-notifications">No notifications yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
