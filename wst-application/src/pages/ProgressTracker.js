import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/progress_tracker_styles.css';

export function ProgressTracker() {
  const [swimmers, setSwimmers] = useState([]);
  const [swimmer_start, set_swimmer_start] = useState([]);
  const [best_start, set_best_start] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [bannerMessage, setBannerMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
    const fetchSwimmers = async () => {
      try {
        const response = await axios.get('https://wahooserver.com/api/swimmer/');
        setSwimmers(response.data);
        // const startResponse = await axios.get(`http://34.207.224.1:8000/api/start/name`);
        // set_swimmer_start(startResponse)
        // console.log(swimmer_start)
      } catch (error) {
        console.error("Error fetching swimmers:", error);
      }
    };

    fetchSwimmers();
  }, []);

  const filteredSwimmers = swimmers.filter(swimmer =>
    swimmer.swimmer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const find_best_dive =  async (name) => {
  //   console.log(name)
  //   const encodedName = encodeURIComponent(name.trim());
  //   console.log(encodedName)
  //   // http://34.207.224.1:8000/api/start/name/${encodedName}/
  //   const start_response = await axios.get(`http://34.207.224.1:8000/api/start/name/Preston%20Borden/`)
  //   const data = start_response.data
  //   if (data.length > 0) {
  //     const totalForces = data.map(start => start.total_force); // Convert to numbers if necessary
  //     const max_total_force = Math.max(...totalForces); // Use spread operator
  //     const bestStartEntry = data.find(start => Math.abs(parseFloat(start.total_force)) === max_total_force);

  //     // Save this swimmer's best dive under their name
  //     set_best_starts(prev => ({
  //       ...prev,
  //       [name]: bestStartEntry,
  //     }));
  //   } else {
  //     console.error(`No dive data found for ${name}`);
  //   }
  // }
  
  // };

  const find_best_dive = async (name) => {
    const encodedName = encodeURIComponent(name.trim());
    try {
      const start_response = await axios.get(`https://wahooserver.com/api/start/name/${encodedName}/`);
      const data = start_response.data;
  
      if (data.length > 0) {
        const totalForces = data.map(start => parseFloat(start.total_force));
        const max_total_force = Math.max(...totalForces);
        const bestStartEntry = data.find(
          start => Math.abs(parseFloat(start.total_force)) === max_total_force
        );
  
        // Save this swimmer's best dive under their name
        set_best_start(prev => ({
          ...prev,
          [name]: bestStartEntry,
        }));
      } else {
        set_best_start(prev => ({
          ...prev,
          [name]: "No Dives Found",
        }));
      }
    } catch (error) {
      console.error(`Error fetching dive for ${name}:`, error);
    }
  };
  

  useEffect(() => {
    if (swimmers && swimmers.length > 0) {
      swimmers.forEach(swimmer => {
        if (swimmer.swimmer_name) {
          find_best_dive(swimmer.swimmer_name);
        }
      });
    }
  }, [swimmers]);

  return (

      
    <div className = "container-fluid progress-background">
    <div className="progress-tracker">
      <h1 className="progress_title">Progress Tracker</h1>
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
      {/* Optional Table version (commented out) */}
      {/* <table className="table table-striped table-bordered table-hover table-responsive-sm">
        <caption>End of List of all Swimmers</caption>
        <thead>
          <tr className="table-primary">
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
              <td><strong>{swimmer.swimmer_name}</strong></td>
              <td><strong>{swimmer.year}</strong></td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* Bootstrap Cards Version */}
      
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-1 g-4 d-flex justify-content-center">
          
          {filteredSwimmers.map((swimmer, index) => (
            <div
              className="col"
              key={swimmer.id}
              onClick={() => navigate(`/swimmer/${swimmer.swimmer_name}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card w-100" style = {{backgroundColor: index%2 === 0 ? "#3B4A88" : "#E57200", width: "300px", height: "110px" }}>
                <div className="card-body">
                  <h3 className="card-title text-light text-start "><strong>{swimmer.swimmer_name}</strong></h3>
                  <div className="d-flex justify-content-between">
                    <p className="card-text text-light mb-0 text-start ps-3">Class of {swimmer.year}</p>
                    <p className="card-text text-light mb-0 text-end pe-4">Best Start: {best_start[swimmer.swimmer_name]?.total_force}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>No swimmers found</p>
  )}
</div>


    </div>
    </div>

  );
}
