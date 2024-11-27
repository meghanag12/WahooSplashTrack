import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

export function StartGraph() {
  const { name } = useParams();
  const [starts, setStarts] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStartData = async () => {
      try {
        const startsResponse = await axios.get(`http://3.81.17.35:8000/api/start/name/${name}/`);
        setStarts(startsResponse.data);

        const labels = startsResponse.data.map(start => {
          const date = new Date(start.date);
          return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        });

        const totalForceData = startsResponse.data.map(start => start.total_force);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Force (N)',
              data: totalForceData,
              borderColor: 'rgba(52, 152, 219, 1)',
              backgroundColor: 'rgba(229, 114, 0, 0.6)',
              fill: true,
              tension: 0.23,
              pointRadius: 6, 
              pointHoverRadius: 14, 
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
    <div className="start-graph-container">
      <h1>Start Graph</h1>
      {chartData ? (
        <div className="chart-container">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: `${name}'s Total Force Over Time` },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const start = starts[context.dataIndex];
                      const date = new Date(start.date);
                      const dateString = date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      });
                      const timeString = date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      });
                      return `Total Force: ${context.raw} N\nDate: ${dateString}\nTime: ${timeString}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  type: 'category',
                  labels: chartData.labels,
                  title: { display: true, text: 'Date' },
                  ticks: { maxRotation: 90, minRotation: 45 },
                  grid: { display: true, drawOnChartArea: true, drawBorder: true },
                },
                y: { 
                  title: { display: true, text: 'Total Force (N)' },
                },
              },
            }}
          />
        </div>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
