import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function StartGraph() {
  const { name } = useParams();
  const [starts, setStarts] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStartData = async () => {
      try {
        const startsResponse = await axios.get(`http://3.81.17.35:8000/api/start/name/${name}/`);
        setStarts(startsResponse.data);

        // Process data for the chart
        const labels = startsResponse.data.map(start => new Date(start.date).toLocaleDateString());
        const totalForceData = startsResponse.data.map(start => start.total_force);

        setChartData({
          labels,
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
              x: { title: { display: true, text: 'Date' } },
              y: { title: { display: true, text: 'Total Force (N)' } },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
