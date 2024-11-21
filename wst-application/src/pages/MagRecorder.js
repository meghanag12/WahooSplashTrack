import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../stylesheets/main_style.css';

export function MagRecorder() {
  const [total_force, set_total_force] = useState(null);
  const [swimmer_name, set_swimmer_name] = useState('');
  const [start_id, set_start_id] = useState('');
  const [date, set_date] = useState('');
  const [front_force, set_front_force] = useState(null);
  const [back_force, set_back_force] = useState(null);
  const [my_rio_data, set_my_rio_data] = useState({});
  const [show_button, set_show_button] = useState(false);
  const [status, set_status] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const [swimmers, setSwimmers] = useState([]);
  
  //variables for search bar 
  const [swimmerList, setSwimmerList ] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSwimmers, setFilteredSwimmers] = useState([]);
  const [showDrop, setShowDrop] = useState(true);
  const [dots, setDots] = useState('');
  const dropdownRef = useRef(null);
  // Endpoints
  const endpoint_start = 'http://3.81.17.35:8000/api/start/';
  const endpoint_pullstarts = 'http://3.81.17.35:5000/pullstarts';
  const endpoint_start_stop = 'http://3.81.17.35:5000/status';
  const endpoint_swimmers = 'http://3.81.17.35:8000/api/swimmer/';

// <<<<<<< HEAD
    //     try {
    //         const response = await axios.post(endpoint_start_stop, payload)
    //         console.log(response)
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
        
    // }
    
    // const handlePostStop = async() => { 
    //     const payload = {'status' : 'false'}
    //     try{
    //         const response = await axios.post(endpoint_start_stop, payload)
    //         console.log(response)
    //     } catch(error) {
    //         console.error("Error posting data: ", error)
    //     }
        
    //     let data_available = false; 
    //     const retries = 100; 
    //     const delay = 1000; 
    //     let attempts  = 0 
    //     let data; 
    //     while(data_available === false && attempts < retries)   {
    //         try {
    //             data = await fetchMagnitudeData()

    //             if(data && Object.keys(data).length > 0){
    //                 data_available = true; 
    //                 break; 
    //             }

    //         } catch(error) {
    //             console.error("Error Fetching Data: ", error)
    //         }
            
            
    //         await new Promise(resolve => setTimeout(resolve, delay));
    //         attempts += 1
    //     }
    //     //... add logic 
    // }
    
    // const fetchMagnitudeData = async() =>  {
    //     try {
    //         const response = await axios.get(endpoint_pullstarts); 
    //         set_my_rio_data(response.data)
    //         return response
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // }; 

    // useEffect(() => {
    //         set_total_force(my_rio_data.total_force); 
    //         set_front_force(my_rio_data.front_force); 
    //         set_back_force(my_rio_data.back_force); 
    //         set_date(my_rio_data.time_stamp); 
    // }, [my_rio_data])

    // const handleSendStartData = async() => {
    //     await postDataStart(); 
    //     resetValues(); 
    // }

    // const handleDiscardData = async() => {
    //     resetValues(); 
    // }

    // const postDataStart = async() => {
    //     const body = {swimmer_name, start_id, date, total_force, front_force, back_force}
    //     try {
    //         const response = await axios.post(endpoint_start, body)
    //         console.log(response)

    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // }

    // const resetValues = () => {
    //     set_swimmer_name('');
    //     set_start_id('');
    //     set_date('');
    //     set_total_force('');
    //     set_front_force('');
    //     set_back_force('');

  // Fetch all swimmers on component mount
//   useEffect(() => {
//     const fetchSwimmers = async () => {
//       try {
//         const response = await axios.get(endpoint_swimmers);
//         setSwimmers(response.data);
//       } catch (error) {
//         console.error('Error fetching swimmers:', error);
//       }

//     };
//     fetchSwimmers();
//   }, []);


    
  // Filter swimmers based on the search term
//   useEffect(() => {
//     const filtered = swimmers.filter(swimmer =>
//       swimmer.swimmer_name.toLowerCase().includes(swimmer_name.toLowerCase())

//     );
//     setFilteredSwimmers(filtered);
//   }, [swimmer_name, swimmers]);

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
    if (status) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
      }, 500); // Update every 500ms
      return () => clearInterval(interval);
    }
  }, [status]);
  useEffect(() => {
    set_total_force(my_rio_data.total_force);
    set_front_force(my_rio_data.front_force);
    set_back_force(my_rio_data.back_force);
    set_date(my_rio_data.time_stamp);
  }, [my_rio_data]);

  // Handle start and stop button logic
  const handlePostStart = async () => {
    set_status(true)
    const payload = { status: 'true' };
    try {
      const response = await axios.post(endpoint_start_stop, payload);
      console.log(response);
    } catch (error) {
      console.error('Error posting start data:', error);
    }
  };

  const handlePostStop = async () => {
    set_status(false)
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
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 3000);
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
    set_total_force('0.0');
    set_front_force('0.0');
    set_back_force('0.0');
  };

  
  const handleShowButton = () => {
    set_show_button(true);
  };

  const handleStopShowButton = () => {
    set_show_button(false);
  };

  const handleShowDropDown = () => {
      setShowDrop(true)
  }

  const handleStopShowDropDown = () => {
      setShowDrop(false)
  }

  useEffect (() => {
  const fetchSwimmerList = async () => {
    try {
      const response = await axios.get(endpoint_swimmers);
      setSwimmerList(response.data);
      setFilteredSwimmers(swimmerList)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchSwimmerList(); 
}, []);

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
};


// Close dropdown on outside click
{showDrop && filteredSwimmers.length > 0 && (
  <ul className="dropdown-list" ref={dropdownRef}> {/* Attach ref here */}
    {filteredSwimmers.map((swimmerList) => (
      <p
        key={swimmerList.id}
        onClick={() => {
          setSearchQuery(swimmerList.swimmer_name);
          handleStopShowDropDown();
        }}
        className="dropdown-item"
      >
        {swimmerList.swimmer_name}
      </p>
    ))}
  </ul>
)}

  //swimmer_name.toLowerCase()
  return (
    <>
      <div className="app-container">
        <h1>Magnitude Recorder</h1>
      {/* Banner */}
      {showBanner && (
          <div className="banner">
            Data successfully submitted!
          </div>
        )}
        {/* Search Bar for Swimmer Name */}
        <div className="search-dropdown">
          <input
            type="text"
            placeholder="Enter Swimmer Name"
            value={searchQuery}
            onChange={(e) => {handleSearch(e); handleShowDropDown()}}
            className="search-input"
          />
          
          {showDrop && filteredSwimmers.length > 0 && (
            <ul className="dropdown-list">
              {filteredSwimmers.map((swimmerList) => (
                <p
                  key={swimmerList.id}
                  onClick={() =>  {setSearchQuery(swimmerList.swimmer_name); handleStopShowDropDown();}}
                  
                  className="dropdown-item"
                >
                  {swimmerList.swimmer_name}
                </p>
              ))}
            </ul>
          )}
        </div>

        {/* Magnitude Display */}
        <div className="magnitude-display">
          <div className="magnitude-display">
            {status ? (
              <>
                <div className="force-container">
                  Total Force: <b>Recording{dots}</b>
                </div>
                <div className="force-container">
                  Front Force: <b>Recording{dots}</b>
                </div>
                <div className="force-container">
                  Back Force: <b>Recording{dots}</b>
                </div>
              </>
            ) : (
              <>
                <div className="force-container">
                  Total Force: <b>{total_force}</b>
                </div>
                <div className="force-container">
                  Front Force: <b>{front_force}</b>
                </div>
                <div className="force-container">
                  Back Force: <b>{back_force}</b>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Record Buttons */}
        
        <div className = "button-container-top">
        {!show_button && (
            <>
            <div className="record-container">
          <button className="start-button" onClick={() => { handlePostStart(); handleStopShowButton(); }}>
            Start Record
          </button>
        </div>

        <div className="record-container">
          <button className="stop-record-button" onClick={() => { handlePostStop(); handleShowButton(); }}>
            Stop Record
          </button>
        </div>
               
            </>
        )}
        
        {/* Show Submit/Discard Buttons */}
        {show_button && (
          <>
            <div className="record-container">
              <button className="submit-data-button" onClick={ () => {handleSendStartData(); handleStopShowButton();}}>
                Submit Data
              </button>
            </div>

            <div className="record-container">
              <button className="delete-data-button" onClick={ () => {handleDiscardData();handleStopShowButton();}}>
                Delete Data
              </button>
            </div>
          </>
        )}
      </div>
      </div>
    </>
  );
}

export default MagRecorder;
