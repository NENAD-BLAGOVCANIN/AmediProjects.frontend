// src/components/StatisticsProject/CollectionsFinanceReports.jsx

import React, { useEffect, useState } from 'react';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import { getAmountCollectedPerMonth, getAmountSentDetails, getAccountDetailsSent, getCollectionTrends, getCollectionBreakdown } from '../../api/dashboard';
import { formatNumberWithCommas } from '../../utils/helpers';

function CollectionsFinanceReports({ dashboardStats, collectedPerMonthData, pieChartData, options }) {
  const [trendData, setTrendData] = useState({});
  const [breakdownData, setBreakdownData] = useState({});
  const [barChartData, setBarChartData] = useState({});

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        // Fetch מגמת הגבייה
        const trends = await getCollectionTrends();
        const trendLabels = trends.map(item => item.date);
        const trendAmounts = trends.map(item => Number(item.total_collected));

        setTrendData({
          labels: trendLabels,
          datasets: [
            {
              label: 'סכום שנגבה',
              data: trendAmounts,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        });

        // Fetch פירוט הגבייה
        const breakdown = await getCollectionBreakdown();
        const breakdownLabels = breakdown.map(item => item.payment_status);
        const breakdownCounts = breakdown.map(item => item.count);

        setBreakdownData({
          labels: breakdownLabels,
          datasets: [
            {
              label: 'פירוט גבייה',
              data: breakdownCounts,
              backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
          ],
        });

        // נתונים לגרף בר: כמות הכסף שנגבה ופירוט חשבונות שנשלחו
        const accountsSent = await getAmountSentDetails();
        const accountDetailsSent = await getAccountDetailsSent();

        setBarChartData({
          labels: ['סכום שנגבה', 'פירוט חשבונות שנשלחו'],
          datasets: [
            {
              label: 'כמות',
              data: [Number(accountsSent), Number(accountDetailsSent)],
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        });

      } catch (error) {
        console.error('Error fetching additional collection data:', error);
      }
    };

    fetchAdditionalData();
  }, []);

  return (
    <div className="bg-white rounded p-3 mt-3 shadow-sm">
      <h4>גביה וכספים</h4>
      <div className="row">
        {/* כמות הכסף שנגבה החודש */}
        <div className="col-md-6">
          <h5>כמות הכסף שנגבה החודש</h5>
          <h2>{dashboardStats.amountCollectedThisMonth || 0}</h2>
        </div>
        {/* כמות הכסף שיש לגבות */}
        <div className="col-md-6">
          <h5>כמות הכסף שיש לגבות</h5>
          <h2>{dashboardStats.totalDebt || 0}</h2>
        </div>
        {/* כמות הכסף שנגבה פר חודש - Line Chart */}
        <div className="col-md-12 mt-4">
          <h5>כמות הכסף שנגבה פר חודש</h5>
          {collectedPerMonthData.labels ? (
            <Line data={collectedPerMonthData} options={options} />
          ) : (
            <p>אין נתונים זמינים עבור תרשים הקו.</p>
          )}
        </div>
        {/* גבייה לעומת חוב - Pie Chart */}
        <div className="col-md-6 mt-4">
          <h5>גבייה לעומת חוב</h5>
          {pieChartData.labels ? (
            <Pie data={pieChartData} />
          ) : (
            <p>אין נתונים זמינים עבור תרשים העוגה.</p>
          )}
        </div>
        {/* כמות הכסף שנשלחו בפירוט חשבון - Bar Chart */}
        <div className="col-md-6 mt-4">
          <h5>כמות הכסף שנשלחו בפירוט חשבון</h5>
          {barChartData.labels ? (
            <Bar data={barChartData} />
          ) : (
            <p>אין נתונים זמינים עבור תרשים הבר.</p>
          )}
        </div>
        {/* מגמת הגבייה - Line Chart */}
        <div className="col-md-12 mt-4">
          <h5>מגמת הגבייה</h5>
          {trendData.labels ? (
            <Line data={trendData} options={options} />
          ) : (
            <p>אין נתונים זמינים עבור תרשים המגמה.</p>
          )}
        </div>
        {/* פירוט גבייה - Doughnut Chart */}
        <div className="col-md-6 mt-4">
          <h5>פירוט גבייה</h5>
          {breakdownData.labels ? (
            <Doughnut data={breakdownData} />
          ) : (
            <p>אין נתונים זמינים עבור תרשים הדונאט.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollectionsFinanceReports;
