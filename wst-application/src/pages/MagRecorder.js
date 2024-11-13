import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylesheets/main_style.css';

export function MagRecorder() {
  const [total_force, set_total_force] = useState('');
  const [swimmer_name, set_swimmer_name] = useState('');
  const [start_id, set_start_id] = useState('');
  const [date, set_date] = useState('');
  const [front_force, set_front_force] = useState('');
  const [back_force, set_back_force] = useState('');
  const [my_rio_data, set_my_rio_data] = useState({});
  const [show_button, set_show_button] = useState(false);

  const [swimmers, setSwimmers] = useState([]);
  const [filteredSwimmers, setFilteredSwimmers] = useState([]);

  // Endpoints
  const endpoint_start = 'http://3.81.17.35:8000/api/start/';
  const endpoint_pullstarts = 'http://3.81.17.35:5000/pullstarts';
  const endpoint_start_stop = 'http://3.81.17.35:5000/status';
  const endpoint_swimmers = 'http://3.81.17.35:8000/api/swimmer/';

  // Fetch all swimmers on component mount
  useEffect(() => {
    const fetchSwimmers = async () => {
      try {
        const response = await axios.get(endpoint_swimmers);
        setSwimmers(response.data);
      } catch (error) {
        console.error('Error fetching swimmers:', error);
      }
    };
    fetchSwimmers();
  }, []);

  // Filter swimmers based on the search term
  useEffect(() => {
    const filtered = swimmers.filter(swimmer =>
      swimmer.swimmer_name.toLowerCase().includes(swimmer_name.toLowerCase())
    );
    setFilteredSwimmers(filtered);
  }, [swimmer_name, swimmers]);

  // Fetch magnitude data from the myRIO endpoint
  const fetchMagnitudeData = async () => {
    try {
      const response = await axios.get(endpoint_pullstarts);
      set_my_rio_data(response.data);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    set_total_force(my_rio_data.total_force);
    set_front_force(my_rio_data.front_force);
    set_back_force(my_rio_data.back_force);
    set_date(my_rio_data.time_stamp);
  }, [my_rio_data]);

  // Handle start and stop button logic
  const handlePostStart = async () => {
    const payload = { status: 'true' };
    try {
      const response = await axios.post(endpoint_start_stop, payload);
      console.log(response);
    } catch (error) {
      console.error('Error posting start data:', error);
    }
  };

  const handlePostStop = async () => {
    const payload = { status: 'false' };
    try {
      const response = await axios.post(endpoint_start_stop, payload);
      console.log(response);
    } catch (error) {
      console.error('Error posting stop data:', error);
    }

    let data_available = false;
    const retries = 100;
    const delay = 1000;
    let attempts = 0;
    let data;
    while (!data_available && attempts < retries) {
      try {
        data = await fetchMagnitudeData();
        if (data && Object.keys(data).length > 0) {
          data_available = true;
          break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      attempts += 1;
    }
  };

  const handleSendStartData = async () => {
    await postDataStart();
    resetValues();
  };

  const handleDiscardData = async () => {
    resetValues();
  };

  const postDataStart = async () => {
    const body = { swimmer_name, start_id, date, total_force, front_force, back_force };
    try {
      const response = await axios.post(endpoint_start, body);
      console.log(response);
    } catch (error) {
      console.error('Error posting start data:', error);
    }
  };

  const resetValues = () => {
    set_swimmer_name('');
    set_start_id('');
    set_date('');
    set_total_force('');
    set_front_force('');
    set_back_force('');
  };

  const handleShowButton = () => {
    set_show_button(true);
  };

  const handleStopShowButton = () => {
    set_show_button(false);
  };

  return (
    <>
      <div className="app-container">
        <h1>Magnitude Recorder</h1>

        {/* Search Bar for Swimmer Name */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Swimmer Name"
            value={swimmer_name}
            onChange={e => set_swimmer_name(e.target.value)}
            className="search-bar"
          />
          {filteredSwimmers.length > 0 && (
            <ul className="dropdown-list">
              {filteredSwimmers.map((swimmer, index) => (
                <li
                  key={index}
                  onClick={() => set_swimmer_name(swimmer.swimmer_name)}
                  className="dropdown-item"
                >
                  {swimmer.swimmer_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Magnitude Display */}
        <div className="magnitude-display">
          <p>Magnitude: {total_force !== null ? total_force : 'Loading...'}</p>
          <p>Front Force: {front_force !== null ? front_force : 'Loading...'}</p>
          <p>Back Force: {back_force !== null ? back_force : 'Loading...'}</p>
        </div>

        {/* Record Buttons */}
        <div className="record-container">
          <button className="record-button" onClick={() => { handlePostStart(); handleStopShowButton(); }}>
            Start Record
          </button>
        </div>

        <div className="record-container">
          <button className="record-button" onClick={() => { handlePostStop(); handleShowButton(); }}>
            Stop Record
          </button>
        </div>

        {/* Show Submit/Discard Buttons */}
        {show_button && (
          <>
            <div className="record-container">
              <button className="record-button" onClick={handleSendStartData}>
                Submit Data
              </button>
            </div>

            <div className="record-container">
              <button className="record-button" onClick={handleDiscardData}>
                Delete Data
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MagRecorder;
