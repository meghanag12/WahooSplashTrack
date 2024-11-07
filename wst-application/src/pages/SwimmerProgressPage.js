// src/pages/SwimmerProgressPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function SwimmerProgressPage() {
  const { id } = useParams();
  const [swimmer, setSwimmer] = useState(null);
  const [starts, setStarts] = useState([]);

  useEffect(() => {
    const fetchSwimmerData = async () => {
      try {
        const swimmerResponse = await axios.get(`http://3.81.17.35:8000/api/swimmer/${id}/`);
        setSwimmer(swimmerResponse.data);

        const startsResponse = await axios.get(`http://3.81.17.35:8000/api/start/?swimmer_id=${id}`);
        setStarts(startsResponse.data);
      } catch (error) {
        console.error("Error fetching swimmer or starts:", error);
      }
    };

    fetchSwimmerData();
  }, [id]);

  if (!swimmer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="swimmer-progress">
      <h1>{swimmer.swimmer_name}'s Progress</h1>
      <div className="starts-container">
        <h2>Starts</h2>
        {starts.length > 0 ? (
          <ul>
            {starts.map((start, index) => (
              <li key={index}>
                <p>{start.event_name} - {start.date}</p>
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
