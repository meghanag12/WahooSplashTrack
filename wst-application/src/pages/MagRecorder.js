// import { Link } from "react-router-dom"

//need to use React state when a value needs to be re-rendered
import React, { useEffect, useState } from 'react';
import { getCsrfToken } from '../utils/csrf';
import axios from 'axios' 
import '../stylesheets/main_style.css'


// function Record({onButtonClick}) {
//     return <button className = "record" onClick = {onButtonClick}>Record Magnitude</button>;
// }

//need to interact with myrio to test this 
export function MagRecorder() {
    const [total_force, set_total_force] = useState([])
    const [swimmer_name, set_swimmer_name] = useState([''])
    const[start_id, set_start_id] = useState([''])
    const[date, set_date] = useState([''])
    const[front_force, set_front_force] = useState([''])
    const[back_force, set_back_force] = useState([''])
    const[my_rio_data, set_my_rio_data] = useState([''])

   // const endpoint_swimmer = 'http://127.0.0.1:8000/api/swimmer/'
    const endpoint_start = 'http://127.0.0.1:8000/api/start/'
    //endpoint for fetching data from table that holds data from myRIO
    const endpoint_myrio = 'http://127.0.0.1:8000/api/myrio/'
    
    const fetchMagnitudeData = async() =>  {
        try {
            const response = axios.get(endpoint_myrio); 
            set_my_rio_data(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }; 

    useEffect(() => {
        fetchMagnitudeData(); 
    }, [])

    useEffect(() => {
        if(my_rio_data) {
            set_total_force(my_rio_data.total_force); 
            set_front_force(my_rio_data.front_force); 
            set_back_force(my_rio_data.back_force); 
            set_date(my_rio_data.time_stamp); 
        }
    }, [my_rio_data])

    const postDataStart = async() => {
        const body = {swimmer_name, start_id, date, front_force, back_force}
        const response = await axios.post(endpoint_start, body)
        console.log(response)
        return response.data 
    }

    const resetValues = () => {
        set_swimmer_name('');
        set_start_id('');
        set_date('');
        set_front_force('');
        set_back_force('');
    };

    const handleSendData = async() => {
        const newData = await postDataStart()
        //... add logic 
        resetValues(); 
        
    }
    
    
      return (
        <>
        <div className = "app-container">
            <h1>Magnitude Recorder</h1>

            <div className = "input-container">
                <input type = "text" placeholder = "Enter Swimmer Name" value = {swimmer_name} onChange={(e) => set_swimmer_name(e.target.value)}/>
            </div>

            <div className = "magnitude-display">
                <h1>Magnitude: {total_force !== null ? total_force : 'Loading...'}</h1>
                <p>Front Force: {front_force !== null ? front_force : 'Loading...'}</p>
                <p>Back Force: {back_force !== null ? back_force : 'Loading...'}</p>
            </div>

            
            <div className = "record-container">
                {/* need to have some kind of trigger to start the microcontroller  */}
                <button className = "record-button">Start Record</button>
            </div>
            
            <div className = "record-container">
                <button className = "record-button" onClick = {handleSendData}>Stop Record</button>
            </div>

        </div>
        </>
    );
};

export default MagRecorder; 