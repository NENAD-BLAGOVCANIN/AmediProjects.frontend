import React, { useState, useEffect } from 'react'
import { getUserInfo } from '../../api/user';
import { getProjectInfo } from '../../api/project';
import NewNotifications from '../../components/Home/NewNotifications';
import Calendar from 'react-calendar';
import EmployeePerformance from '../../components/Home/EmployeePerformance';
import PlaningTable from "../../components/planner/planingTable";
import AddNewMeasuring from '../../components/planner/addNewMeasuring'
import AddNewPlaning from '../../components/planner/addNewPlaning'
import MeasuringTable from '../../components/planner/measuringTable'
import { useTranslation } from 'react-i18next';
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



 

// fake data
const leadsData = [
    { name: 'הפרויקט של יוסי',  status: 'הסתיים',  },
    { name: 'הבית של רביב',  status: 'בבדיקה', },
    // Add more leads here
  ];


    return (
        <div dir="rtl" className="container">

            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>

            <div className="row pt-3">
           
            <div className="col-md-4">

                <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.late_tasks')}</h6>
                        <p className='py-5 text-center'>You have no late tasks 😊</p>
                    </div>

                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.my_calendar')}</h6>
                        <Calendar onChange={onChange} value={value} className="w-100 border-0 px-4 my-4" />
                    </div>
                </div>
                <div className="col-md-4">

                        <div className="bg-white rounded p-3 shadow-sm">
                        <AddNewMeasuring />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <AddNewPlaning />
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <PlaningTable leads={leadsData} />
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <MeasuringTable leads={leadsData} />
                    </div>

                </div>
              
            </div>

        </div>
    )
}

export default Home