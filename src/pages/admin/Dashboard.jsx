import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Pie, Doughnut, Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

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


  function generateSmoothData(base, variation) {
    return Array.from({ length: 12 }, (_, i) => base + (Math.sin(i) * variation));
  }

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Smooth Data 1',
        data: [1, 3, 10, 7, 8, 12, 15, 20, 17, 18, 28, 28, 30, 28, 35],
        fill: true,
        backgroundColor: 'rgba(0,158,253, 0.2)',
        borderColor: 'rgb(0,158,253)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  useEffect(() => {
    const isRTL = i18n.language === 'he';
    document.body.dir = isRTL ? 'rtl' : 'ltr';
}, [i18n.language]);

  return (

    <>
    <div className="container">

      <div className="row" dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
        <div className="col-md-4 p-3">
          <div className="bg-white p-3 rounded">
            <span className="small">Projects Completed</span>
            <div className="d-flex align-items-center">
              <h2 className="m-0 pe-2">{stats.contactCount}</h2>
              <FontAwesomeIcon icon={faArrowTrendUp} className="text-success" />
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="bg-white p-3 rounded">
            <span className="small">Active Clients</span>
            <div className="d-flex align-items-center">
              <h2 className="m-0 pe-2">{stats.leadCount}</h2>
              <FontAwesomeIcon icon={faArrowTrendUp} className="text-success" />
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="bg-white p-3 rounded">
            <span className="small">Monthy Earnings</span>
            <div className="d-flex align-items-center">
              <h2 className="m-0 pe-2">${stats.taskCount}K</h2>
              <FontAwesomeIcon icon={faArrowTrendUp} className="text-success" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 p-3">
          <div className="bg-white p-3 rounded d-flex justify-content-center flex-column w-100">
            <h5 className="mb-3">Monthly Earnings</h5>
            <div className="m-auto w-100 h-100 d-flex justify-content-center text-center">
              <Line data={lineChartData} options={options} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 p-3">
          <div className="bg-white p-3 rounded d-flex justify-content-center flex-column w-100">
            <h5 className="mb-4">Contact Management</h5>
            <div className="m-auto pb-3" style={{ maxWidth: 400 }}>
              <Pie data={contactData} />
            </div>
          </div>
        </div>
        <div className="col-md-6 p-3">
          <div className="bg-white p-3 rounded d-flex justify-content-center flex-column w-100">
            <h5 className="mb-4">Task Management</h5>
            <div className="m-auto pb-3" style={{ maxWidth: 400 }}>
              <Doughnut data={taskCompletionData} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 p-3">
          <div className="bg-white p-3 rounded d-flex justify-content-center flex-column w-100">
            <h5 className="mb-3">Monthly Earnings</h5>
            <div className="m-auto w-100 h-100 d-flex justify-content-center text-center">
              <Line data={lineChartData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}

export default Dashboard;
