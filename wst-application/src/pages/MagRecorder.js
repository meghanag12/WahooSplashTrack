import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../stylesheets/mag_recorder.css';
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
  const [waiting, setWaiting] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  

  
  const [swimmer_name, set_swimmer_name] = useState('');
  const [start_id, set_start_id] = useState('');
  const [date, set_date] = useState('');
 

  const dropdownRef = useRef(null);
  const endpoint_pullstarts = 'http://34.207.224.1:5000/pullstarts';
  const endpoint_start_stop = 'http://34.207.224.1:5000/status';
  const endpoint_swimmers = 'http://34.207.224.1:8000/api/swimmer/';
  const endpoint_start = 'http://34.207.224.1:8000/api/start/';

  const fetchMagnitudeData = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      setShowSpinner(true)
      await delay(5000);
      const response = await axios.get(endpoint_pullstarts);
      setShowSpinner(false)
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
      setFilteredSwimmers(response.data); 
    } catch (error) {
      console.error('Error fetching swimmers:', error);
    }
  };

  useEffect(() => {
    fetchSwimmerList();

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
      const interval = setInterval(() => {}, 500); //Placeholder for dots logic
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
    setShowSubmitDelete(false); 
    setWaiting(true);
    setShowSpinner(false);
  };

  

  return (
    <div className="app-container vh-100">

      {showSubmitDelete && (
        <div className="submit-delete-container">
          <button className="submit-button" onClick={handleSendStartData}>
            Submit
          </button>
          <button className="delete-button" onClick={handleDiscardData}>
            Delete
          </button>
        </div>
      )}


<div className="search-container">
  <input
    type="text"
    placeholder="Enter Swimmer Name"
    value={searchQuery}
    onChange={handleSearch}
    className="search-input"
    onFocus={() => setShowDrop(true)}
  />
    {showDrop && filteredSwimmers.length > 0 && (
    <div className="dropdown-container" ref={dropdownRef}>
      <ul className="dropdown-list">
        {filteredSwimmers.map((swimmer) => (
          <li
            key={swimmer.id}
            onClick={() => {
              set_swimmer_name(swimmer.swimmer_name);
              setSearchQuery(swimmer.swimmer_name);
              setShowDrop(false);
            }}
            className="dropdown-item"
          >
            {swimmer.swimmer_name}
          </li>
        ))}
      </ul>
    </div>
    )}
    {errorMessage && <div className="error-message">{errorMessage}</div>}
  </div>


    <div className = "force-ball-container">      

    <div className={`force-circle force-circle-total ${status ? "spinning" : ""}`}>
        <div className="force-value">{(total_force == 0)? "None!" : (total_force) + " lbs"}</div>
      </div>
      <p className="force-label">Total Force</p>
  
      <div className ="lower-forces">   
        <div className={`force-circle force-circle-back ${status ? "spinning" : ""}`}>
       
          <div className="force-value">{(back_force == 0)? "None!" : (back_force) + " lbs"} </div>
        </div>
      
        <div className={`force-circle force-circle-front ${status ? "spinning" : ""}`}>
          <div className="force-value">{(front_force == 0)? "None!" : (front_force) + " lbs"}</div>
        </div>
  

      </div>
      <div className = "force-label-container">
     
       
      </div>
   
      <button
        className={`start-pause-button ${status ? "pause" : "start"}`}
        onClick={status ? handlePostStop : handlePostStart}
      >
        {status ? "Pause" : "Start"}
      </button>
    </div>
      

     
      
  </div>
    
  );

}
