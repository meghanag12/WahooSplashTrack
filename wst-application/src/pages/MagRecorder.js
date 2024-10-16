// import { Link } from "react-router-dom"

//need to use React state when a value needs to be re-rendered
import { useEffect, useState } from 'react';
import { getCsrfToken } from '../utils/csrf';
import axios from 'axios' 

function Magnitude() {
    const [mag, setMag] = useState(0.0); //Initialize the magnitude value
    
    return <h1 className = "magnitude">{mag}</h1>;
}

// function Record({onButtonClick}) {
//     return <button className = "record" onClick = {onButtonClick}>Record Magnitude</button>;
// }
export function MagRecorder() {
    const [productsData, setProductsData] = useState([])
    const endpoint = 'http://127.0.0.1:8000/api/record/'
    
    // const [mag, setMag] = useState(1.0);
    
    const fetchData = async() => {
        console.log("fetching...")
        const response = await axios.get(endpoint)
        console.log(response)
        const {data} = response
        setProductsData(data)
        console.log(data)
        return data
    }

    useEffect(() => {
        fetchData()
    }, [])

    //what we are going to use to populated the data base based on the readings from the LabView
    const postData = async() => {
        const swimmer_name = 'test x'
        const magnitude = 0.5
        const body = {swimmer_name, magnitude}

        const response = await axios.post(endpoint, body)
        console.log(response)
        return response.data
    }

    const handleSendData = async() => {
        const newData = await postData()
        //... add logic 
    }
    
    // const csrfToken = getCsrfToken(); 
    
    // const [data, setData] = useState('');
    // function handleClick() {
    //     fetch('http://127.0.0.1:8000/api/save-raw-data/', {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': csrfToken, //Add the CSRF token to the headers
    //         },
    //         body: JSON.stringify({mag}), 
    //     })
    //      .then(response => response.json())
    //      .then(result => {
    //          console.log(result);
    //      })
    //      .catch(error => {
    //          console.error('Error:', error);
    //      });
    //   };
      return (
        <>
        <div className = "app-container">
            <h1>Magnitude Recorder</h1>

            <div className = "input-container">
                <button className = "input-button">Enter Swimmer Name</button>
            </div>

            <div className = "magnitude-display">
                <Magnitude/>
            </div>

            <div className = "record-container">
                <button className = "record-button" onClick = {handleSendData}>Record</button>
            </div>

        </div>
        </>
    )
}