import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Pie, Doughnut, Line } from 'react-chartjs-2';

function Dashboard() {
  const [stats] = useState({
    contactCount: Math.floor(Math.random() * 100),
    leadCount: Math.floor(Math.random() * 100),
    taskCount: Math.floor(Math.random() * 100),
    todoTasksCount: Math.floor(Math.random() * 100),
    inProgressTasksCount: Math.floor(Math.random() * 100),
    doneTasksCount: Math.floor(Math.random() * 100),
  });

  const contactData = {
    labels: ['Contacts', 'Leads'],
    datasets: [
      {
        label: '',
        data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const taskCompletionData = {
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [
      {
        label: '',
        data: [
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
        ],
        backgroundColor: ['#B4EBFF', '#EBFFB4', '#B4FFD2'],
        borderColor: ['#246A84', '#98AC60', '#5EAB7D'],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Random Data',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (

    <>
      <div className="row">
        <div className="col-md-4 p-3">
          <div className="card">
            <span className="small">Projects Completed</span>
            <div className="d-flex align-items-center">
              <h2 className="m-0 pe-2">{stats.contactCount}</h2>
              <FontAwesomeIcon icon={faArrowTrendUp} className="text-success" />
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="card">
            <span className="small">Active Clients</span>
            <div className="d-flex align-items-center">
              <h2 className="m-0 pe-2">{stats.leadCount}</h2>
              <FontAwesomeIcon icon={faArrowTrendUp} className="text-success" />
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="card">
            <span className="small">Monthy Earnings</span>
            <div className="d-flex align-items-center">
              <h2 className="m-0 pe-2">${stats.taskCount}K</h2>
              <FontAwesomeIcon icon={faArrowTrendUp} className="text-success" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 p-3">
          <div className="card w-100">
            <h5 className="mb-4">Contact Management</h5>
            <div className="m-auto pb-3" style={{ maxWidth: 400 }}>
              <Pie data={contactData} />
            </div>
          </div>
        </div>
        <div className="col-md-6 p-3">
          <div className="card w-100">
            <h5 className="mb-4">Task Management</h5>
            <div className="m-auto pb-3" style={{ maxWidth: 400 }}>
              <Doughnut data={taskCompletionData} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 p-3">
          <div className="card w-100">
            <h5 className="mb-3">Monthly Earnings</h5>
            <div className="m-auto w-100 h-100 d-flex justify-content-center text-center" style={{ maxWidth: 1200 }}>
              <Line data={lineChartData} />
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Dashboard;
