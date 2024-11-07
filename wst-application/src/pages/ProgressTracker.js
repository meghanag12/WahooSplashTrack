import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function ProgressTracker() {
  const [swimmers, setSwimmers] = useState([]);

  useEffect(() => {
    const fetchSwimmers = async () => {
      try {
        const response = await axios.get('http://3.81.17.35:8000/api/swimmer/');
        setSwimmers(response.data);
      } catch (error) {
        console.error("Error fetching swimmers:", error);
      }
    };

    fetchSwimmers();
  }, []);

  return (
    <div className="progress-tracker">
      <h1>Progress Tracker</h1>
      <div className="tracker-container">
        <ul className="swimmer-list">
          {swimmers.map((swimmer) => (
            <li key={swimmer.id} className="swimmer-item">
              {/* Each swimmer item is a link to the SwimmerProgressPage */}
              <Link to={`/swimmer/${swimmer.id}`} className="swimmer-link">
                {swimmer.swimmer_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
