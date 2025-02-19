import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/progress_tracker_styles.css';

export function ProgressTracker() {
  const [swimmers, setSwimmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [bannerMessage, setBannerMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
    const fetchSwimmers = async () => {
      try {
        const response = await axios.get('http://34.207.224.1:8000/api/swimmer/');
        setSwimmers(response.data);
      } catch (error) {
        console.error("Error fetching swimmers:", error);
      }
    };

    fetchSwimmers();
  }, []);

  const filteredSwimmers = swimmers.filter(swimmer =>
    swimmer.swimmer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className = "container-fluid progress-background">
    <div className="progress-tracker">
      <h1>Progress Tracker</h1>
      {showBanner && <div className="banner">{bannerMessage}</div>}
      {/* Search bar input */}
      
      <input
        type="text"
        placeholder="Search swimmers..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />
    
<div className="tracker-container">
  {filteredSwimmers.length > 0 ? (
    <div className="update-container">
      <table class ="table-striped table-bordered table-hover table-responsive-sm">
        <caption> End of List of all Swimmers </caption>
        <thead>
          <tr class = "table-primary">
            <th>Swimmer Name</th>
            <th>Graduation Year</th>
          </tr>
        </thead>
        <tbody>
          {filteredSwimmers.map(swimmer => (
            <tr 
              key={swimmer.id}
              onClick={() => navigate(`/swimmer/${swimmer.swimmer_name}`)}
              style={{ cursor: "pointer" }}
            >
              <strong><td>{swimmer.swimmer_name}</td></strong>
              <td><strong>{swimmer.year}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  ) : (
    <p>No swimmers found</p>
  )}
</div>

    </div>
    </div>
  );
}
