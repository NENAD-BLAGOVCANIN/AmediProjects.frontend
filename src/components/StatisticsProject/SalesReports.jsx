// src/components/StatisticsProject/SalesReports.jsx

import React from 'react';
import { formatNumberWithCommas } from '../../utils/helpers'; // פונקציה לעיצוב מספרים

function SalesReports({ dashboardStats }) {
  return (
    <div className="bg-white rounded p-3 mt-3 shadow-sm">
      <h4>מכירות</h4>
      <div className="row">
        <div className="col-md-6">
          <h5>כמות הצעות מחיר שנשלחו בשבוע</h5>
          <h2>{dashboardStats.weeklyPriceOffers || 0}</h2>
        </div>
        <div className="col-md-6">
          <h5>כמות פרויקטים חדשים בשבוע</h5>
          <h2>{dashboardStats.weeklyNewProjects || 0}</h2>
        </div>
      </div>
    </div>
  );
}

export default SalesReports;
