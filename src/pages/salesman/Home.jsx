import React, { useState, useEffect } from 'react'
import { getUserInfo } from '../../api/user';
import { getProjectInfo } from '../../api/project';
import NewNotifications from '../../components/Home/NewNotifications';
import Calendar from 'react-calendar';
import EmployeePerformance from '../../components/Home/EmployeePerformance';
import AddNewProject from '../../components/Home/addNewProject';
import LeadsTable from "../../components/Home/leadsTable";
import { useTranslation } from 'react-i18next';
import {  Line } from 'react-chartjs-2';
function Home() {

    const { t } = useTranslation();
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

    const lineChartData = {
        labels: ['ינואר', 'פרבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: [
          {
            label: 'כמות פרוייקטים פי חודשים',
            data: [1, 3, 10, 7, 8, 12, 15, 15, 13, 14, 12, 17, 21, 23, 18],
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

// fake data
const leadsData = [
    { name: 'John Doe', phone: '123-456-7890', status: 'Interested', companyName: 'ABC Corp', lastContact: '2024-05-20' },
    { name: 'Jane Smith', phone: '987-654-3210', status: 'Not Interested', companyName: 'XYZ Inc', lastContact: '2024-05-18' },
    // Add more leads here
  ];


    return (
        <div dir="rtl" className="container">

            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>

            <div className="row pt-3">
            <div className="col-md-12 p-3">
                    <div className="bg-white p-3 rounded d-flex justify-content-center flex-column w-100">
                        <h5 className="mb-3">{t('addNewProject.projectCreated')}</h5>
                        <div className="m-auto w-100 h-100 d-flex justify-content-center text-center">
                        <Line data={lineChartData} options={options} />
                        </div>
                    </div>
                </div>
            <div className="col-md-6">

                <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.late_tasks')}</h6>
                        <p className='py-5 text-center'>You have no late tasks 😊</p>
                    </div>

                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.my_calendar')}</h6>
                        <Calendar onChange={onChange} value={value} className="w-100 border-0 px-4 my-4" />
                    </div>
                </div>
                <div className="col-md-6">
                    {/* <div className="bg-white rounded p-3 shadow-sm"> */}
                        {/* <h6 className='bold mb-3'>{t('card_title.employee_performance')}</h6> */}

                        {/* <EmployeePerformance /> */}

                    {/* </div> */}
                        <div className="bg-white rounded p-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.current_project')}</h6>

                        {/* <EmployeePerformance /> */}

                    </div>
                    {/* <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <NewNotifications userInfo={userInfo} />

                    </div> */}
                    

                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <AddNewProject />
                    </div>
                </div>
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                    <LeadsTable leads={leadsData} />
                    </div>



              
            </div>

        </div>
    )
}

export default Home