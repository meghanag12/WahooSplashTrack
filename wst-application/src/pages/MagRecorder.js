// import { Link } from "react-router-dom"

//need to use React state when a value needs to be re-rendered
import { useState } from 'react';

function Magnitude() {
    const [mag, setMag] = useState(1.0); //Initialize the magnitude value
    
    return <h1 className = "magnitude">{mag}</h1>;
}

// function Record({onButtonClick}) {
//     return <button className = "record" onClick = {onButtonClick}>Record Magnitude</button>;
// }
export function MagRecorder() {
    const [mag, setMag] = useState(1.0);
    // const [data, setData] = useState('');
    function handleClick() {
        fetch('http://127.0.0.1:8000/api/save-raw-data', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mag}), 
        })
         .then(response => response.json())
         .then(result => {
             console.log(result);
         })
         .catch(error => {
             console.error('Error:', error);
         });
      };
    return (
        <>
            <h1>Magnitude Recorder</h1>
            <Magnitude/>
            <button onClick = {handleClick}>Record Magnitude</button>
        </>
    )
}