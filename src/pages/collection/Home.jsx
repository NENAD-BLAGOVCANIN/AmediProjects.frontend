import React, { useState, useEffect } from 'react'
import { getUserInfo } from '../../api/user';
import { getProjectInfo } from '../../api/project';
import Calendar from 'react-calendar';
import {  Line } from 'react-chartjs-2';
import ProjectAmountTable from '../../components/collection/projectAmountTable'
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

    const lineChartData = {
        labels: ['ינואר', 'פרבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: [
          {
            label: 'סכום הגבייה לפי חודש',
            data: [1, 3, 10, 7, 8, 12, 15, 15, 13, 14, 12, 17, 21, 23, 18],
            fill: true,
            backgroundColor: 'rgba(0,110,220, 0.2)',
            borderColor: 'rgb(0,110,220)',
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
    { name: 'הפרויקט של יוסי',  status: 'הסתיים',  },
    { name: 'הבית של רביב',  status: 'בבדיקה', },
    // Add more leads here
  ];
  const projectData = [
    { name: 'פרוייקט אלפא', status: 'ממתין לתשלום', amount: '$5000' },
    { name: 'פרוייקט בטא', status: 'נשלחה בקשה לתשלום', amount: '$3000' },
    // Add more projects here
  ];

    return (
        <div dir="rtl" className="container">

            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>

            <div className="row pt-3">
           <div className="col-md-4">
                <div className="bg-white rounded p-3 mt-3 shadow-sm">
                    <h6 className='bold mb-3'>{t('card_title.my_calendar')}</h6>
                    <Calendar onChange={onChange} value={value} className="w-100 border-0 px-4 my-4" />
                </div>
           </div>
            <div className="col-md-4">

                <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.late_tasks')}</h6>
                        <p className='py-5 text-center'>You have no late tasks 😊</p>
                    </div>

                   
                </div>

                <div className="col-md-4">

                        <div className="bg-white rounded p-3 shadow-sm">
                        {/* <AddNewMeasuring /> */}
                        <h5>סה"כ הכסף שיש לגבות</h5>
                        <h6>15,000</h6>
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        {/* <AddNewPlaning /> */}
                        <h5>הכסף שנגבה</h5>
                        <h6>23,481</h6>
                    </div>
                </div>
     
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <ProjectAmountTable projects={projectData} />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <Line data={lineChartData} options={options} />
                    </div>
                </div>
              
            </div>

        </div>
    )
}

export default Home