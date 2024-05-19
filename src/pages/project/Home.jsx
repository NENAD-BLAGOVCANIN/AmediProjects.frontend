import React, { useState, useEffect } from 'react'
import { getUserInfo } from '../../api/user';
import { getProjectInfo } from '../../api/project';
import NewNotifications from '../../components/Home/NewNotifications';
import Calendar from 'react-calendar';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Pie, Doughnut, Line } from 'react-chartjs-2';

function Home() {

    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Smooth Data 1',
                data: [1, 3, 10, 7, 8, 12, 15, 20, 17, 18, 28, 28, 30, 28, 35],
                fill: true, // Enable fill below the line
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color with transparency
                borderColor: 'rgb(75, 192, 192)',
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

    const [projectInfo, setProjectInfo] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
                console.log(fetchedUserInfo);
            } catch (error) {
                console.error("Error fetching :", error);
            }
        }
        const fetchProjectInfo = async () => {
            try {
                const fetchedProjectInfo = await getProjectInfo();
                setProjectInfo(fetchedProjectInfo);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchUserInfo();
        fetchProjectInfo();

    }, []);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    return (
        <div className="container">

            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>Welcome, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>

            <div className="row pt-3">
                <div className="col-md-6">
                    <div className="bg-white rounded p-3 shadow-sm">
                        <h6 className='bold mb-3'>Employee performance</h6>

                        <Line data={lineChartData} options={options} />

                    </div>

                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>Late tasks</h6>

                        <p className='py-5 text-center'>You have no late tasks 😊</p>

                    </div>

                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>Today's meetings</h6>

                        <p className='py-5 text-center'>You have no meetings for today 😔</p>

                    </div>



                </div>
                <div className="col-md-6">

                    <NewNotifications userInfo={userInfo} />

                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>My calendar</h6>
                        <Calendar onChange={onChange} value={value} className="w-100 border-0 px-4 my-4" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home