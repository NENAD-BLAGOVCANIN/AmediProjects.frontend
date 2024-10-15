import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../api/user';
import { getStats } from '../../api/dashboard';
import Calendar from 'react-calendar';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { Line, Pie } from 'react-chartjs-2';
import { getAccountsSummary } from '../../api/accounts';
import Chart from 'chart.js/auto';

const formatNumberWithCommas = (number) => {
  if (isNaN(number)) {
    return '0';
  }
  return Number(number).toLocaleString();
};

function StatisticsProject() {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({});
  const [value, onChange] = useState(new Date());
  const [collectedPerMonthData, setCollectedPerMonthData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [accountsData, setAccountsData] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchAccountsData = async () => {
      try {
        const data = await getAccountsSummary();
        setAccountsData(data);
      } catch (error) {
        console.error('Error fetching accounts data:', error);
      }
    }; 

    const fetchDashboardStats = async () => {
      try {
        const stats = await getStats();
        console.log('Dashboard Stats:', stats); // For debugging
        setDashboardStats(stats);

        // Prepare data for line chart
        if (Array.isArray(stats.amountCollectedPerMonth) && stats.amountCollectedPerMonth.length > 0) {
          const months = [];
          const amounts = [];

          stats.amountCollectedPerMonth.forEach((item) => {
            const monthName = new Date(item.year, item.month - 1).toLocaleString('default', { month: 'long' });
            months.push(`${monthName} ${item.year}`);
            amounts.push(Number(item.total_collected));
          });

          setCollectedPerMonthData({
            labels: months,
            datasets: [
              {
                label: 'סכום שנגבה',
                data: amounts,
                fill: true,
                backgroundColor: 'rgba(0,158,253, 0.2)',
                borderColor: 'rgb(0,158,253)',
                tension: 0.4,
              },
            ],
          });
        } else {
          console.log('No data for amountCollectedPerMonth');
        }

        // Prepare data for pie chart
        if (stats.amountCollectedThisMonth && stats.totalDebt) {
          setPieChartData({
            labels: ['גבייה החודש', 'חוב שנותר'],
            datasets: [
              {
                data: [
                  Number(stats.amountCollectedThisMonth),
                  Number(stats.totalDebt) - Number(stats.amountCollectedThisMonth),
                ],
                backgroundColor: ['#00aaff', '#ff6384'],
                hoverBackgroundColor: ['#00aaff', '#ff6384'],
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchAccountsData();
    fetchUserInfo();
    fetchDashboardStats();

    const isRTL = i18n.language === 'he';
    document.body.dir = isRTL ? 'rtl' : 'ltr';
  }, [i18n.language]);

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
        {/* Cards */}
        <div className="col-md-3">
          <div className="bg-white rounded p-3 mt-3 shadow-sm text-center">
            <h5>פרויקטים חדשים השבוע</h5>
            <h2>{dashboardStats.projectsThisWeek || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-white rounded p-3 mt-3 shadow-sm text-center">
            <h5>תוכניות שהועברו לייצור</h5>
            <h2>{dashboardStats.finishedPlans || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-white rounded p-3 mt-3 shadow-sm text-center">
            <h5>תוכניות בתכנון</h5>
            <h2>{dashboardStats.planningPlans || 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-white rounded p-3 mt-3 shadow-sm text-center">
            <h5>סה"כ חוב לגבייה</h5>
            <h2>{formatNumberWithCommas(dashboardStats.totalDebt)}</h2>
          </div>
        </div>

        {/* Line Chart and Pie Chart */}
        <div className="col-md-8">
          <div className="bg-white rounded p-3 mt-3 shadow-sm">
            <h6 className='bold mb-3'>סכום שנגבה פר חודש</h6>
            {collectedPerMonthData.labels ? (
              <Line data={collectedPerMonthData} options={options} />
            ) : (
              <p>אין נתונים זמינים עבור תרשים הקו.</p>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="bg-white rounded p-3 mt-3 shadow-sm">
            <h6 className='bold mb-3'>גבייה לעומת חוב</h6>
            {pieChartData.labels ? (
              <Pie data={pieChartData} />
            ) : (
              <p>אין נתונים זמינים עבור תרשים העוגה.</p>
            )}
          </div>
        </div>

        {/* Custom Monthly Collection Table */}
        <div className="col-md-12">
          <div className="bg-white rounded p-3 mt-3 shadow-sm">
            <h6 className='bold mb-3'>סכום שנגבה פר חודש</h6>
            {Array.isArray(dashboardStats.amountCollectedPerMonth) && dashboardStats.amountCollectedPerMonth.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>שנה</th>
                    <th>חודש</th>
                    <th>סכום שנגבה</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardStats.amountCollectedPerMonth.map((item, index) => (
                    <tr key={index}>
                      <td>{item.year}</td>
                      <td>{new Date(item.year, item.month - 1).toLocaleString('default', { month: 'long' })}</td>
                      <td>{formatNumberWithCommas(item.total_collected)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>אין נתונים זמינים עבור טבלת הגבייה החודשית.</p>
            )}
          </div>
        </div>


        {/* Additional Summary Tables */}
        {/* Since you asked not to use external components, we'll create custom tables here as well */}
        {/* SummaryDays Table */}
        {dashboardStats.summaryDays && dashboardStats.summaryDays.length > 0 && (
          <div className="col-md-12">
            <div className="bg-white rounded p-3 mt-3 shadow-sm">
              <h6 className='bold mb-3'>Summary Days</h6>
              <table className="table">
                <thead>
                  <tr>
                    {/* Adjust the headers based on the data structure */}
                    <th>ID</th>
                    <th>Details</th>
                    {/* Add other relevant headers */}
                  </tr>
                </thead>
                <tbody>
                  {dashboardStats.summaryDays.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.details}</td>
                      {/* Add other relevant data */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Similarly, create tables for summaryInstallations and summaryPlanners if needed */}
      </div>
    </div>
  );
}

export default StatisticsProject;
