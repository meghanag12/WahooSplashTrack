import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"
import "../stylesheets/progress_tracker_styles.css";


export function SwimmerProgressPage() {
  const { name } = useParams(); // Get the swimmer's name from the URL
  const [starts, setStarts] = useState([]);
  const [best_start, set_best_start] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStartData = async () => {
      try {
        const startsResponse = await axios.get(`http://34.207.224.1:8000/api/start/name/${name}/`);
        setStarts(startsResponse.data);
      } catch (error) {
        console.error("Error fetching starts:", error);
      }
    };

    fetchStartData();
  }, [name]); // Re-run when the swimmer's name changes

  const find_best_start = () => {
    if (starts.length > 0) {
      const totalForces = starts.map(start => start.total_force); // Convert to numbers if necessary
      const max_total_force = Math.max(...totalForces); // Use spread operator
      const bestStartEntry = starts.find(start => Math.abs(parseFloat(start.total_force)) === max_total_force);
      set_best_start(bestStartEntry); // Set the best start in state
      console.log(bestStartEntry)
    } else {
      console.error("The starts array is empty.");
    }
  };
  
  useEffect(() => {
    if (starts && starts.length > 0) {
      find_best_start();
    }
  }, [starts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} @ ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
  };

  const exportToExcel = (data, fileName) => {
    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook to a binary string
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Save the Excel file
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, `${fileName}.xlsx`);
};

  return (
    <div className="swimmer-progress row-xl-3">
      <h1>{name}'s Progress</h1>

      <div className = "btn-group">
        <button class = "btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        <button class = "btn btn-secondary"onClick={() => navigate(`/manual-entry/${name}`)}>Manual Entry</button>
        <button class = "btn btn-secondary" onClick={() => navigate(`/start-graph/${name}`)}>Go to Graph</button>
        <button class = "btn btn-secondary" onClick = {() => exportToExcel(starts, `${name}_start_data`)}>Export to Excel</button>
      </div>

      <div className="table">
        <div className = "card">
        <div className = "card-header">Best Start for {name}</div>
        <table class = "table">
              <thead class = "thead-dark">
                <tr>
                  <th>Date</th>
                  <th>Total Force (lbs)</th>
                  <th>Front Force (lbs)</th>
                  <th>Back Force (lbs)</th>
                </tr>
              </thead>
              <tbody>
                <td>{formatDate(best_start.date)}</td>
                <td>{Number(best_start.total_force).toFixed(2)} lbs</td>
                <td>{Number(best_start.front_force).toFixed(2)} lbs</td>
                <td>{Number(best_start.back_force).toFixed(2)} lbs</td>
              </tbody>
        </table>
       <i> <footer class="card-footer text-muted"> {name}'s best start was on {formatDate(best_start.date)} with a total force 
        of {best_start.back_force} pounds</footer> </i>
        </div>
        <div className = "card">
        <div className = "card-header">All starts for {name}</div>
        {starts.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Force (lbs)</th>
                  <th>Front Force (lbs)</th>
                  <th>Back Force (lbs)</th>
                </tr>
              </thead>

              <tbody>
                {starts
                .slice()
                .sort((a,b) => new Date(b.date)- new Date(a.date))
                .map((start, index) => (
                  <tr key={index}>
                    <td>{formatDate(start.date)}</td>
                    <td>{Number(start.total_force).toFixed(2)} lbs</td>
                    <td>{Number(start.front_force).toFixed(2)} lbs</td>
                    <td>{Number(start.back_force).toFixed(2)} lbs</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        ) : (
          <p>No starts found for this swimmer.</p>
        )}
        </div>
        <footer className = "card-footer text-bold">Scroll through the above list to see all recorded starts for {name}. </footer>
      </div>
      
    </div>
  );
}
