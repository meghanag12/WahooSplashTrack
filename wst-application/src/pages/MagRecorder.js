// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import '../stylesheets/mag_recorder.css';
// export function MagRecorder() {
//   const [total_force, set_total_force] = useState('0.0');
//   const [front_force, set_front_force] = useState('0.0');
//   const [back_force, set_back_force] = useState('0.0');
//   const [status, set_status] = useState(false);
//   const [showSubmitDelete, setShowSubmitDelete] = useState(false);
//   const [bannerMessage, setBannerMessage] = useState('');
//   const [showBanner, setShowBanner] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [swimmers, setSwimmers] = useState([]);
//   const [errorMessage, setErrorMessage] = useState([""]);
//   const [swimmerList, setSwimmerList] = useState([]);
//   const [filteredSwimmers, setFilteredSwimmers] = useState([]);
//   const [showDrop, setShowDrop] = useState(false);
//   const [waiting, setWaiting] = useState(true);
//   const [showSpinner, setShowSpinner] = useState(false);
  

  
//   const [swimmer_name, set_swimmer_name] = useState('');
//   const [start_id, set_start_id] = useState('');
//   const [date, set_date] = useState('');
 

//   const dropdownRef = useRef(null);
//   const endpoint_pullstarts = 'http://34.207.224.1:5000/pullstarts';
//   const endpoint_start_stop = 'http://34.207.224.1:5000/status';
//   const endpoint_swimmers = 'http://34.207.224.1:8000/api/swimmer/';
//   const endpoint_start = 'http://34.207.224.1:8000/api/start/';

//   const fetchMagnitudeData = async () => {
//     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//     try {
//       setShowSpinner(true)
//       await delay(5000);
//       const response = await axios.get(endpoint_pullstarts);
//       setShowSpinner(false)
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching magnitude data:', error);
//       return {};
//     }
//   };

//   const fetchSwimmerList = async () => {
//     try {
//       const response = await axios.get(endpoint_swimmers);
//       setSwimmerList(response.data);
//       setFilteredSwimmers(response.data); 
//     } catch (error) {
//       console.error('Error fetching swimmers:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSwimmerList();

//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDrop(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (status) {
//       const interval = setInterval(() => {}, 500); //Placeholder for dots logic
//       return () => clearInterval(interval);
//     }
//   }, [status]);

//   useEffect(() => {
//     if (!status) {
//       const fetchData = async () => {
//         const data = await fetchMagnitudeData();
//         set_total_force(data.total_force || '0.0');
//         set_front_force(data.front_force || '0.0');
//         set_back_force(data.back_force || '0.0');
//       };
//       fetchData();
//     }
//   }, [status]);

//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     setFilteredSwimmers(
//       query.length > 0
//         ? swimmerList.filter((swimmer) =>
//             swimmer.swimmer_name.toLowerCase().startsWith(query.toLowerCase())
//           )
//         : swimmerList
//     );
//     setShowDrop(true);
//   };

//   // const checkSwimmerName = () => {
//   //   if (swimmer_name === ""){
//   //     setBannerMessage('Enter Swimmer Name!')
//   //   }
    
//   // }

//   const handlePostStart = async () => {
//     if(swimmer_name === ""){
//       setErrorMessage("Swimmer name is required");
//       return; 
//     }
//     set_status(true);
//     setShowSubmitDelete(false);
//     setErrorMessage("");
//     const payload = { status: 'true' };
//     try {
//       await axios.post(endpoint_start_stop, payload);
//       console.log('Start recording');
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const handlePostStop = async () => {
//     set_status(false);
//     const payload = { status: 'false' };
//     try {
//       await axios.post(endpoint_start_stop, payload);
//       console.log('Stop recording');
//       setShowSubmitDelete(true);
//     } catch (error) {
//       console.error('Error stopping recording:', error);
//     }
//   };

//   const handleSendStartData = async () => {
//     setBannerMessage('Data successfully submitted!');
//     setShowBanner(true);
//     setTimeout(() => setShowBanner(false), 3000);
//     await postDataStart(); 
//     resetValues();
//   };

//   const handleDiscardData = () => {
//     setBannerMessage('Data discarded successfully!');
//     setShowBanner(true);
//     setTimeout(() => setShowBanner(false), 3000);
//     resetValues();
//   };

//   const postDataStart = async () => {
//     const body = { swimmer_name, start_id, date, total_force, front_force, back_force };
//     try {
//       const response = await axios.post(endpoint_start, body);
//       console.log(response);
//     } catch (error) {
//       console.error('Error posting start data:', error);
//     }
//   };

//   const resetValues = () => {
//     set_total_force('0.0');
//     set_front_force('0.0');
//     set_back_force('0.0');
//     setSearchQuery('');
//     set_swimmer_name("");
//     setShowSubmitDelete(false); 
//     setWaiting(true);
//     setShowSpinner(false);
//   };

  

//   return (
    
//     <div className="app-container vh-100">
//       <div className = "mag-title">Magnitude Recorder</div>
// <div className="search-container">
//   <input
//     type="text"
//     placeholder="Enter Swimmer Name"
//     value={searchQuery}
//     onChange={handleSearch}
//     className="search-input"
//     onFocus={() => setShowDrop(true)}
//   />
//     {showDrop && filteredSwimmers.length > 0 && (
//     <div className="dropdown-container" ref={dropdownRef}>
//       <ul className="dropdown-list">
//         {filteredSwimmers.map((swimmer) => (
//           <li
//             key={swimmer.id}
//             onClick={() => {
//               set_swimmer_name(swimmer.swimmer_name);
//               setSearchQuery(swimmer.swimmer_name);
//               setShowDrop(false);
//             }}
//             className="dropdown-item"
//           >
//             {swimmer.swimmer_name}
//           </li>
//         ))}
//       </ul>
//     </div>
//     )}
//     {errorMessage && <div className="error-message">{errorMessage}</div>}
//   </div>





//     <div className = "force-ball-container">      


//     {/* // <div className={`force-circle force-circle-total ${status ? "spinning" : ""}`}>
//     //     <div className="force-value">{(total_force == 0 & !status)? "0.0 lbs" : (status? "Recording":(total_force) + " lbs")}</div>
//     //   </div>
//     //   <p className="force-label">Total Force</p> */}

  
//       <div className ="lower-forces">  
//         <div className={`force-circle force-circle-total ${status ? "spinning" : ""}`}>
//           <div className="force-value">{(total_force == 0 & !status)? "0.0 lbs" : (status? "Recording":(total_force) + " lbs")}</div>
//         </div>
//         <p className="force-label">Total Force</p> 
        
//         <div className={`force-circle force-circle-front ${status ? "spinning" : ""}`}>
//           <div className="force-value">{(front_force == 0& !status)? "0.0 lbs" : (status ? "Recording":(front_force) + " lbs")}</div>
//         </div>
//         <p className="force-label">Front Force</p> 
        
//         <div className={`force-circle force-circle-back ${status ? "spinning" : ""}`}>
//           <div className="force-value">{(back_force == 0 &!status)? "0.0 lbs" : (status? "Recording":(back_force) + " lbs")} </div>
//         </div>
//         <p className="force-label">Back Force</p> 
    
//       </div>
//       <div className = "force-label-container">
     
       
//       </div>
    
      
//       {/* Buttons */}
//       {/* <div className="magnitude-button-container row align-items-center">
//         {status ? (
//           <button className={`start-pause-button ${status ? "pause" : "start"}`} onClick={handlePostStop}>
//             Stop Record
//           </button>
//         ) : showSubmitDelete ? (
//           <>
//           <div className = "start-pause-button">
//             <button className="submit-button col" onClick={handleSendStartData}>
//               Submit Data
//             </button>
//             <button className="delete-button col" onClick={handleDiscardData}>
//               Delete Data
//             </button>
//             </div>
//           </>
//         ) : (
//           <button className={`start-pause-button ${status ? "pause" : "start"}`} onClick={handlePostStart}>
//             Start Record
//           </button>
//         )}
//       </div> */}


 
//       <div className="magnitude-button-container">
//         {status ? (
//           <button className="stop-record-button" onClick={handlePostStop}>
//             Stop Record
//           </button>
//         ) : showSubmitDelete ? (
//           <>
//           <div className = "submit-delete-container">
//             <button className="submit-data-button" onClick={handleSendStartData}>
//               Submit Data
//             </button>
//             <button className="delete-data-button" onClick={handleDiscardData}>
//               Delete Data
//             </button>
//             </div>
//           </>
//         ) : (
//           <button className="start-button" onClick={handlePostStart}>
//             Start Record
//           </button>
//         )}
//       </div>
//     </div>
//   );

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../stylesheets/mag_recorder.css';

export function MagRecorder() {
  const [total_force, set_total_force] = useState('0.0');
  const [front_force, set_front_force] = useState('0.0');
  const [back_force, set_back_force] = useState('0.0');
  const [status, set_status] = useState(false);
  const [showSubmitDelete, setShowSubmitDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [swimmerList, setSwimmerList] = useState([]);
  const [filteredSwimmers, setFilteredSwimmers] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [swimmer_name, set_swimmer_name] = useState('');
  const [start_id, set_start_id] = useState('');
  const [date, set_date] = useState('');
  const [bannerMessage, setBannerMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [note, setNote] = useState('');
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef(null);
  const endpoint_pullstarts = 'https://wahooserver.com/apiflask/pullstarts';
  const endpoint_start_stop = 'https://wahooserver.com/apiflask/status';
  const endpoint_swimmers = 'https://wahooserver.com/api/swimmer/';
  const endpoint_start = 'https://wahooserver.com/api/start/';

  useEffect(() => {
    const fetchSwimmerList = async () => {
      try {
        const response = await axios.get(endpoint_swimmers);
        if (response.data.length > 0) {
          setSwimmerList(response.data);
          setFilteredSwimmers(response.data);
        }
      } catch (error) {
        console.error('Error fetching swimmers:', error);
      }
    };

    fetchSwimmerList();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setShowDrop(true);
    } else {
      setShowDrop(false);
    }

    setFilteredSwimmers(
      query.length > 0
        ? swimmerList.filter((swimmer) =>
            swimmer.swimmer_name.toLowerCase().startsWith(query.toLowerCase())
          )
        : swimmerList
    );
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setTimeout(() => setShowDrop(false), 200); // Prevents immediate closing
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePostStart = async () => {
    if (swimmer_name === "") {
      setErrorMessage("Swimmer name is required");
      return;
    }
    set_status(true);
    setShowSubmitDelete(false);
    setErrorMessage("");

    try {
      await axios.post(endpoint_start_stop, { status: 'true' });
      console.log('Start recording');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const handlePostStop = async () => {
    set_status(false);
    try {
      await axios.post(endpoint_start_stop, { status: 'false' });
      console.log('Stop recording');
      setShowModal(true);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const handleSendStartData = async () => {
    setBannerMessage('Data successfully submitted!');
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
    await postDataStart(); 
    setShowModal(false);
    resetValues();
  };

  const handleDiscardData = () => {
    setBannerMessage('Data discarded successfully!');
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
    setShowModal(false);
    resetValues();
  };

  const postDataStart = async () => {
    const body = { 
      swimmer_name, 
      start_id, 
      date, 
      total_force, 
      front_force, 
      back_force,
      notes: note
    };
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
    setNote('');
  };

  return (
    <div className="app-container vh-100">
      <div className="mag-title">Magnitude Recorder</div>
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
                  style={{ color: 'black', backgroundColor: 'white', padding: '10px' }}
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

      <div className="force-ball-container">
        <div className = "force-block">
          <div className={`force-circle ${status ? "spinning" : ""}`}>
            <div className="force-value">{total_force ? total_force + " lbs" : "0.0 lbs"}</div>
          </div>
        <p className="force-label">Total Force</p>
        </div>

        <div className = "force-block">
        <div className={`force-circle ${status ? "spinning" : ""}`}>
          <div className="force-value">{front_force ? front_force + " lbs" : "0.0 lbs"}</div>
        </div>
        <p className="force-label">Front Force</p>
        </div>
        
        <div className = "force-block">
          <div className={`force-circle ${status ? "spinning" : ""}`}>
            <div className="force-value">{back_force ? back_force + " lbs" : "0.0 lbs"}</div>
          </div>
          <p className="force-label">Back Force</p>
        </div>
      </div>

      <div className="magnitude-button-container">
        {status ? (
          <button className={`start-pause-button ${status ? "pause" : "start"}`} onClick={handlePostStop}>
            Stop
          </button>
        ) : (
          <button className={`start-pause-button ${status ? "pause" : "start"}`} onClick={handlePostStart}>
            Start
          </button>
        )}
      </div>

      {/* Modal for submit/delete recording */}
      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Record Force Measurement</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="force-readings mb-3">
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">Total Force:</div>
                    <div className="col-8">{total_force ? total_force + " lbs" : "0.0 lbs"}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">Front Force:</div>
                    <div className="col-8">{front_force ? front_force + " lbs" : "0.0 lbs"}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">Back Force:</div>
                    <div className="col-8">{back_force ? back_force + " lbs" : "0.0 lbs"}</div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="notes" className="form-label">Notes:</label>
                  <textarea
                    className="form-control"
                    id="notes"
                    rows="3"
                    placeholder="Add notes about this measurement..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleDiscardData}>Discard</button>
                <button type="button" className="btn btn-primary" onClick={handleSendStartData}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Banner message */}
      {showBanner && (
        <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x" style={{ zIndex: 1050 }}>
          {bannerMessage}
        </div>
      )}
    </div>
  );
}

