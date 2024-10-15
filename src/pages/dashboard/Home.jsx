import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../api/user';
import { getProjectInfo, getProjectsStartedPerMonth } from '../../api/project';
import { getActivePlanningProductions } from '../../api/production';
import { getAmountCollectedThisMonth } from '../../api/MonthlyCollections';
import { getCollectionSummary } from '../../api/summaryDay';
import { getStats } from '../../api/dashboard'; // Import the new function
import Calendar from 'react-calendar';
import MonthlyCollectionTable from '../../components/collection/MonthlyCollectionTable';
import UserTasksTable from '../../components/Dashboard/UserTasksTable';
import SummaryTable from '../../components/Dashboard/SummaryTable'; // Import the new SummaryTable component
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';

// Utility function to format number with commas
const formatNumberWithCommas = (number) => {
    if (typeof number !== 'number') {
        return '0'; // Return '0' or some other fallback value if number is undefined or not a number
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function DashboardProject() {
    const { t } = useTranslation();
    const [projectInfo, setProjectInfo] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [projectsStarted, setProjectsStarted] = useState([]); // State for projects started per month
    const [amountCollectedThisMonth, setAmountCollectedThisMonth] = useState(0); // State for amount collected this month
    const [collectionSummary, setCollectionSummary] = useState([]); // State for collection summary
    const [activePlannings, setActivePlannings] = useState(0); // State for active planning items
    const [summaryDays, setSummaryDays] = useState([]); // State for summary days
    const [summaryInstallations, setSummaryInstallations] = useState([]); // State for summary installations
    const [summaryPlanners, setSummaryPlanners] = useState([]); // State for summary planners
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        const fetchProjectInfo = async () => {
            try {
                const fetchedProjectInfo = await getProjectInfo();
                setProjectInfo(fetchedProjectInfo);
            } catch (error) {
                console.error('Error fetching project info:', error);
            }
        };

        const fetchProjectsStartedPerMonth = async () => {
            try {
                const data = await getProjectsStartedPerMonth();
                setProjectsStarted(data);
            } catch (error) {
                console.error('Error fetching projects started per month:', error);
            }
        };

        const fetchAmountCollectedThisMonth = async () => {
            try {
                const amount = await getAmountCollectedThisMonth();
                setAmountCollectedThisMonth(amount);
                console.log('amount ------------------------>',amount)
            } catch (error) {
                console.error('Error fetching amount collected this month:', error);
            }
        };

        const fetchCollectionSummary = async () => {
            try {
                const summary = await getCollectionSummary();
                setCollectionSummary(summary);
            } catch (error) {
                console.error('Error fetching collection summary:', error);
            }
        };

        const fetchActivePlannings = async () => {
            try {
                const activeCount = await getActivePlanningProductions();
                setActivePlannings(activeCount);
            } catch (error) {
                console.error('Error fetching active planning items:', error);
            }
        };

        const fetchDashboardStats = async () => {
            try {
                const stats = await getStats();
                setSummaryDays(stats.summaryDays);
                setSummaryInstallations(stats.summaryInstallations);
                setSummaryPlanners(stats.summaryPlanners);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchProjectsStartedPerMonth();
        fetchUserInfo();
        fetchProjectInfo();
        fetchAmountCollectedThisMonth();
        fetchCollectionSummary();
        fetchActivePlannings();
        fetchDashboardStats();

        const isRTL = i18n.language === 'he';
        document.body.dir = isRTL ? 'rtl' : 'ltr';
    }, [i18n.language]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    const lineChartData = {
        labels: ['ינואר', 'פרבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: [
            {
                label: 'פרוייקטים שהסתיימו',
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

    return (
        <div className="container-fluid" dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>

            <div className="row pt-3">
                <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h5>סה"כ גבייה החודש</h5>
                        <h6>{formatNumberWithCommas(Number(amountCollectedThisMonth))}</h6> {/* Display the collected amount this month */}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h5>פרוייקטים שהתחילו החודש</h5>
                        <h6>{projectsStarted.length}</h6> {/* Display the number of projects started */}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h5>פרויקטים בתכנון</h5>
                        <h6>{activePlannings}</h6> {/* Display the number of active planning items */}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>משימות עובדים</h6>
                        <UserTasksTable />
                    </div>
                </div>
                {/* <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.ceo_tasks')}</h6>
                        <p className='py-5 text-center'>You have no late tasks 😊</p>
                    </div>
                </div> */}
                {/* <div className="col-md-8">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <Line data={lineChartData} options={options} />
                    </div>
                </div> */}
                <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.my_calendar')}</h6>
                        <Calendar onChange={onChange} value={value} className="w-100 border-0 px-4 my-4" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>סיכום גביות</h6>
                        <MonthlyCollectionTable  /> {/* Summary of collections */}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <SummaryTable
                            summaryDays={summaryDays}
                            summaryInstallations={summaryInstallations}
                            summaryPlanners={summaryPlanners}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardProject;
