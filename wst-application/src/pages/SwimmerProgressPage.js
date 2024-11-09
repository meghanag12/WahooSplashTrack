import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SwimmerProgressPage() {
  const { name } = useParams(); // Get the swimmer's name from the URL
  const [starts, setStarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartData = async () => {
      try {
        const startsResponse = await axios.get(`http://3.81.17.35:8000/api/start/name/${name}/`);
        setStarts(startsResponse.data);
      } catch (error) {
        console.error("Error fetching starts:", error);
      }
    };

    fetchStartData();
  }, [name]); // Re-run when the swimmer's name changes

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} @ ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
  };

  return (
    <div className="swimmer-progress">
      <h1>{name}'s Progress</h1>
      <div className="button-group">
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={() => navigate(`/start-graph/${name}`)}>Go to Graph</button>
      </div>
      <div className="starts-container">
        <h2>Starts</h2>
        {starts.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Force (N)</th>
                  <th>Front Force (N)</th>
                  <th>Back Force (N)</th>
                </tr>
              </thead>
              <tbody>
                {starts.map((start, index) => (
                  <tr key={index}>
                    <td>{formatDate(start.date)}</td>
                    <td>{start.total_force} N</td>
                    <td>{start.front_force} N</td>
                    <td>{start.back_force} N</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No starts found for this swimmer.</p>
        )}
      </div>
    </div>
  );
}
