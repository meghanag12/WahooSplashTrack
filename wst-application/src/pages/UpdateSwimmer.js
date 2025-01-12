import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


export function UpdateSwimmer() {
  const [swimmers, setSwimmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [alphabetical_order, set_alphabetical_order] = useState([]);
  const [active_swimmers, set_active_swimmers] = useState([]);
  const navigate = useNavigate();
  const [bannerMessage, setBannerMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
    const fetchSwimmers = async () => {
      try {
        const response = await axios.get('http://34.207.224.1:8000/api/swimmer/');
        setSwimmers(response.data);
        const sortedSwimmers = response.data.sort((a, b) =>
          a.swimmer_name.localeCompare(b.swimmer_name)
        );
        set_alphabetical_order(sortedSwimmers); // Set sorted array
        // const a_s = swimmers.map(swimmer => swimmer.swimmer_name).sort();
        // set_alphabetical_order(a_s)
        console.log(alphabetical_order)
      } catch (error) {
        console.error("Error fetching swimmers:", error);
      }
    };

    fetchSwimmers();
  }, [swimmers]);
  const handleSubmit = async () => {
    setBannerMessage('Changes have been submitted!');
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
    resetValues();
  };

  const resetValues = () => {

  }
  const filteredSwimmers = swimmers.filter(swimmer =>
    swimmer.swimmer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="progress-tracker">
      <h1>Update Swimmer</h1>
      
      {/* Search bar input */}
      <input
        type="text"
        placeholder="Search swimmers..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="tracker-container">
      <div className="starts-container">
        {alphabetical_order.length > 0 ? (
          <div className="update-container">
            <table>
              <thead>
                <tr>
                  <th>Swimmer Name</th>
                  <th>Graduation Year</th>
                </tr>
              </thead>

              <tbody>
                {alphabetical_order.map((s) => (
                  <tr key={s.swimmer_name}
                        onClick={() => navigate(`/update/${s.swimmer_name}`)}
                        style={{ cursor: "pointer" }}
                   >
                    <td>{s.swimmer_name}</td>
                    <td>{s.year} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No starts found for this swimmer.</p>
        )}
      </div>
        {/* <ul className="swimmer-list scrollable-list">
          {filteredSwimmers.length > 0 ? (
            filteredSwimmers.map(swimmer => (
              <li key={swimmer.id} className="swimmer-item">
                <Link to={`/update/${swimmer.swimmer_name}`} className="swimmer-link">
                  {swimmer.swimmer_name}
                </Link>
              </li>
            ))
          ) : (
            <p>No swimmers found</p>
          )}
        </ul> */}
      </div>
    </div>
  );
}
