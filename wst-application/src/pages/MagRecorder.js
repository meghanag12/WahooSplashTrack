import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../stylesheets/main_style.css';

export function MagRecorder() {
  const [total_force, set_total_force] = useState('0.0');
  const [front_force, set_front_force] = useState('0.0');
  const [back_force, set_back_force] = useState('0.0');
  const [status, set_status] = useState(false);
  const [showSubmitDelete, setShowSubmitDelete] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [swimmers, setSwimmers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([""]);
  const [swimmerList, setSwimmerList] = useState([]);
  const [filteredSwimmers, setFilteredSwimmers] = useState([]);
  const [showDrop, setShowDrop] = useState(false);

  
  const [swimmer_name, set_swimmer_name] = useState('');
  const [start_id, set_start_id] = useState('');
  const [date, set_date] = useState('');
 

  const dropdownRef = useRef(null);
  const endpoint_pullstarts = 'http://3.81.17.35:5000/pullstarts';
  const endpoint_start_stop = 'http://3.81.17.35:5000/status';
  const endpoint_swimmers = 'http://3.81.17.35:8000/api/swimmer/';
  const endpoint_start = 'http://3.81.17.35:8000/api/start/';

  const fetchMagnitudeData = async () => {
    try {
      const response = await axios.get(endpoint_pullstarts);
      return response.data;
    } catch (error) {
      console.error('Error fetching magnitude data:', error);
      return {};
    }
  };

  const fetchSwimmerList = async () => {
    try {
      const response = await axios.get(endpoint_swimmers);
      setSwimmerList(response.data);
      setFilteredSwimmers(response.data); // Initialize filtered list
    } catch (error) {
      console.error('Error fetching swimmers:', error);
    }
  };

  useEffect(() => {
    fetchSwimmerList();

    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDrop(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (status) {
      const interval = setInterval(() => {}, 500); // Placeholder for dots logic
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    if (!status) {
      const fetchData = async () => {
        const data = await fetchMagnitudeData();
        set_total_force(data.total_force || '0.0');
        set_front_force(data.front_force || '0.0');
        set_back_force(data.back_force || '0.0');
      };
      fetchData();
    }
  }, [status]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredSwimmers(
      query.length > 0
        ? swimmerList.filter((swimmer) =>
            swimmer.swimmer_name.toLowerCase().startsWith(query.toLowerCase())
          )
        : swimmerList
    );
    setShowDrop(true);
  };

  // const checkSwimmerName = () => {
  //   if (swimmer_name === ""){
  //     setBannerMessage('Enter Swimmer Name!')
  //   }
    
  // }

  const handlePostStart = async () => {
    if(swimmer_name === ""){
      setErrorMessage("Swimmer name is required");
      return; 
    }
    set_status(true);
    setShowSubmitDelete(false);
    setErrorMessage("");
    const payload = { status: 'true' };
    try {
      await axios.post(endpoint_start_stop, payload);
      console.log('Start recording');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const handlePostStop = async () => {
    set_status(false);
    const payload = { status: 'false' };
    try {
      await axios.post(endpoint_start_stop, payload);
      console.log('Stop recording');
      setShowSubmitDelete(true);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const handleSendStartData = async () => {
    setBannerMessage('Data successfully submitted!');
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
    await postDataStart(); 
    resetValues();
  };

  const handleDiscardData = () => {
    setBannerMessage('Data discarded successfully!');
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
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
    set_total_force('0.0');
    set_front_force('0.0');
    set_back_force('0.0');
    setSearchQuery('');
    set_swimmer_name("");
    setShowSubmitDelete(false); // Reset button visibility
  };

  const RecordingDots = ({ status }) => {
    const [dots, setDots] = useState('');
    useEffect(() => {
      if (status) {
        const interval = setInterval(() => {
          setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
      }
    }, [status]);
    return <>{dots}</>;
  };

  return (
    <div className="app-container">
      <h1>Magnitude Recorder</h1>

      {/* Banner */}
      {showBanner && <div className="banner">{bannerMessage}</div>}
      {/* Search Bar */}
      <div className="search-dropdown">
        <input
          type="text"
          placeholder="Enter Swimmer Name"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        {showDrop && filteredSwimmers.length > 0 && (
          <ul className="dropdown-list" ref={dropdownRef}>
            {filteredSwimmers.map((swimmer) => (
              <p
                key={swimmer.id}
                onClick={() => {
                  set_swimmer_name(swimmer.swimmer_name);
                  setSearchQuery(swimmer.swimmer_name);
                  setShowDrop(false);
                }}
                className="dropdown-item"
              >
                {swimmer.swimmer_name}
              </p>
            ))}
          </ul>
        )}
        {<div className="error">{errorMessage}</div>}
      </div>

      {/* Magnitude Display */}
      <div className="magnitude-display">
        {status ? (
          <>
            <div className="force-container">
            <b>Total Force: Recording<RecordingDots status={status} /></b>
            </div>
            <div className="force-container">
            <b>Front Force: Recording<RecordingDots status={status} /></b>
            </div>
            <div className="force-container">
            <b>Back Force: Recording<RecordingDots status={status} /></b>
            </div>
          </>
        ) : (
          <>
            <div className="force-container"><b>Total Force: {back_force} N</b> </div>
            <div className="force-container"><b>Front Force: 0.0 N</b></div>
            <div className="force-container"><b>Back Force: {back_force} N</b></div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="magnitude-button-container">
        {status ? (
          <button className="stop-record-button" onClick={handlePostStop}>
            Stop Record
          </button>
        ) : showSubmitDelete ? (
          <>
          <div className = "submit-delete-container">
            <button className="submit-data-button" onClick={handleSendStartData}>
              Submit Data
            </button>
            <button className="delete-data-button" onClick={handleDiscardData}>
              Delete Data
            </button>
            </div>
          </>
        ) : (
          <button className="start-button" onClick={handlePostStart}>
            Start Record
          </button>
        )}
      </div>
    </div>
  );
}
