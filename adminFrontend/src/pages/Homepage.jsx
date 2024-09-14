import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { useAuth } from '../Context/Authcontext';
import { Chart as chartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Axios from 'Axios';

function Homepage() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const { currentUser } = useAuth();
  const [currentCreatedData, setCurrentCreatedData] = useState([]);
  const [currentDeletedData, setCurrentDeletedData] = useState([]);

  useEffect(() => {

    Axios.get("http://localhost:3000/artistStats").then((res) => {
      setCurrentCreatedData(res.data.createdCount);
      setCurrentDeletedData(res.data.deletedCount);
    });




  }, []);

  return (
    <>
      <div className='flex'>
        <Dashboard
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
          currentUser={currentUser}
        />
      </div>
      <div className='w-[50vw] h-[70vh]'>
        <Line
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Your X-axis labels
            datasets: [
              {
                label: 'Artists',
                data: currentCreatedData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              },
              {
                label: 'Artist Deletions',
                data: currentDeletedData,
                fill: false,
                borderColor: 'rgb(250,0,0)',
                tension: 0.1
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true, // Show legend
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time', // X-axis label
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Value', // Y-axis label
                },
                beginAtZero: true, // Start Y-axis at 0
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default Homepage;
