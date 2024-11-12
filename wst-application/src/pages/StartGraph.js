import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

export function StartGraph() {
  const { name } = useParams();
  const [starts, setStarts] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStartData = async () => {
      try {
        const startsResponse = await axios.get(`http://3.81.17.35:8000/api/start/${name}/`);
        setStarts(startsResponse.data);

        // Process data for the chart
        const labels = startsResponse.data.map(start => {
          // Get only the date part for major ticks (x-axis)
          const date = new Date(start.date);
          return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        });

        // Get time and total force for each entry
        const times = startsResponse.data.map(start => {
          // Get the time part for minor ticks (display times between dates)
          const date = new Date(start.date);
          return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
        });

        const totalForceData = startsResponse.data.map(start => start.total_force);

        setChartData({
          labels, // These will represent the dates on the x-axis
          datasets: [
            {
              label: 'Total Force (N)',
              data: totalForceData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching start data:", error);
      }
    };

    fetchStartData();
  }, [name]);

  return (
    <div>
      <h1>Start Graph</h1>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: `${name}'s Total Force Over Time` },
            },
            scales: {
              x: {
                type: 'category', // Use category scale for major ticks (dates)
                labels: chartData.labels,
                title: { display: true, text: 'Date' },
                ticks: {
                  maxRotation: 90,
                  minRotation: 45,
                },
                grid: {
                  display: true,
                  drawOnChartArea: true,
                  drawBorder: true,
                },
              },
              y: { 
                title: { display: true, text: 'Total Force (N)' } 
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
