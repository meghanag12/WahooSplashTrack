import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/connection_status.css';

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const connection = 'http://34.207.224.1:5000/connectionStatus';

  const checkConnection = async () => {
    try {
      const response = await axios.get(connection);
      const statusStr = response.data.status;
      const status = statusStr === 'true';
      
      setIsConnected(status);
      await axios.post(connection, { status: 'false' });

    } catch (error) {
      console.error('Error checking connection:', error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    // Check connection immediately
    checkConnection();

    // Set up interval to check every 5 seconds
    const interval = setInterval(checkConnection, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="connection-status">
      <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
        <span className="status-dot"></span>
        <span className="status-text">{isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>
    </div>
  );
} 