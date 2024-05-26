import React from 'react'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Pie, Doughnut, Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

function EmployeePerformance() {


    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Performance points',
                data: [1, 3, 10, 7, 8, 12, 15, 20, 17, 18, 28, 28, 30, 28, 35],
                fill: true, // Enable fill below the line
                backgroundColor: 'rgba(0,158,253, 0.2)', // Background color with transparency
                borderColor: 'rgb(0,158,253)',
                tension: 0.4, // Increased tension for smoother curves
            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false, // Disable grid lines on x-axis
                },
            },
            y: {
                grid: {
                    display: false, // Disable grid lines on y-axis
                },
            },
        },
    };

  return (
    <Line data={lineChartData} options={options} />
  )
}

export default EmployeePerformance