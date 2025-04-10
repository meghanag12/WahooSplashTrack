import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/connection_status.css';

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const endpoint_pullstarts = 'http://34.207.224.1:5000/pullstarts';

  const checkConnection = async () => {
    try {
      const response = await axios.get(endpoint_pullstarts);
      const currentTime = new Date().getTime();
      const lastDataTime = new Date(response.data.timestamp).getTime();
      const timeDifference = currentTime - lastDataTime;
      
      // Consider connected if data is less than 30 seconds old
      setIsConnected(timeDifference < 30000);
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