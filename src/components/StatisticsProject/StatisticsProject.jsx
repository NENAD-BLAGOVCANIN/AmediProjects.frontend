// src/components/StatisticsProject/StatisticsProject.jsx

import React, { useState, useEffect } from 'react';
import {  getStats, getWeeklyPriceOffers, getWeeklyNewProjects, getPlansOverFourDays, getProjectsPerManager, getAccountsPerManager, getAmountSentDetails, getAccountDetailsSent } from '../../api/dashboard';
import { getUserInfo } from '../../api/user';
import { useTranslation } from 'react-i18next';
import SalesReports from './SalesReports';
import PlanningReports from './PlanningReports';
import ProjectsReports from './ProjectsReports';
import CollectionsFinanceReports from './CollectionsFinanceReports';
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
  const [collectedPerMonthData, setCollectedPerMonthData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [options, setOptions] = useState({
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchDashboardStats = async () => {
      try {
        const stats = await getStats();
        console.log('Dashboard Stats:', stats); // For debugging
        setDashboardStats(stats);

        // Prepare data for line chart (כמות הכסף שנגבה פר חודש)
        if (Array.isArray(stats.amountCollectedPerMonth) && stats.amountCollectedPerMonth.length > 0) {
          const months = [];
          const amounts = [];

          stats.amountCollectedPerMonth.forEach((item) => {
            const monthName = new Date(item.year, item.month - 1).toLocaleString('default', { month: 'long' });
            months.push(`${monthName} ${item.year}`);
            amounts.push(Number(item.amount_collected));
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

        // Prepare data for pie chart (גבייה לעומת חוב)
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

    const fetchAdditionalStats = async () => {
      try {
        const [weeklyPriceOffers, weeklyNewProjects, plansOverFourDays, projectsPerManager, accountsPerManager, amountSentDetails, accountDetailsSent] = await Promise.all([
          getWeeklyPriceOffers(),
          getWeeklyNewProjects(),
          getPlansOverFourDays(),
          getProjectsPerManager(),
          getAccountsPerManager(),
          getAmountSentDetails(),
          getAccountDetailsSent(),
        ]);

        setDashboardStats(prevStats => ({
          ...prevStats,
          weeklyPriceOffers,
          weeklyNewProjects,
          plansOverFourDays,
          projectsPerManager,
          accountsPerManager,
          amountSentDetails,
          accountDetailsSent,
        }));
      } catch (error) {
        console.error('Error fetching additional dashboard stats:', error);
      }
    };

    fetchUserInfo();
    fetchDashboardStats();
    fetchAdditionalStats();


  }, []);

  return (
    <div className="container-fluid" >
      <div className='pt-3'>
        <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
      </div>

      <div className="row pt-3">
        {/* מכירות */}
        <div className="col-md-12">
          <SalesReports dashboardStats={dashboardStats} />
        </div>

        {/* תכנון ומדידה */}
        <div className="col-md-12">
          <PlanningReports dashboardStats={dashboardStats} />
        </div>

        {/* פרויקטים */}
        <div className="col-md-12">
          <ProjectsReports dashboardStats={dashboardStats} />
        </div>

        {/* גביה וכספים */}
        <div className="col-md-12">
          <CollectionsFinanceReports
            dashboardStats={dashboardStats}
            collectedPerMonthData={collectedPerMonthData}
            pieChartData={pieChartData}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}

export default StatisticsProject;
