import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function SwimmerProgressPage() {
  const { name } = useParams(); // Get the swimmer's name from the URL
  const [starts, setStarts] = useState([]);

  useEffect(() => {
    const fetchStartData = async () => {
      try {
        // Fetch the start data for this swimmer using their name
        const startsResponse = await axios.get(`http://3.81.17.35:8000/api/start/name/${name}/`);
        setStarts(startsResponse.data);
      } catch (error) {
        console.error("Error fetching starts:", error);
      }
    };

    fetchStartData();
  }, [name]); // Re-run when the swimmer's name changes

  return (
    <div className="swimmer-progress">
      <h1>{name}'s Progress</h1>
      <div className="starts-container">
        <h2>Starts</h2>
        {starts.length > 0 ? (
          <ul>
            {starts.map((start, index) => (
              <li key={index}>
                <p>{start.event_name} - {start.date}</p>
                <p>Total Force: {start.total_force}</p>
                <p>Front Force: {start.front_force}</p>
                <p>Back Force: {start.back_force}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No starts found for this swimmer.</p>
        )}
      </div>
    </div>
  );
}
