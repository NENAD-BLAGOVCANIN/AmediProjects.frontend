// src/components/StatisticsProject/PlanningReports.jsx

import React from 'react';

function PlanningReports({ dashboardStats }) {
  return (
    <div className="bg-white rounded p-3 mt-3 shadow-sm">
      <h4>תכנון ומדידה</h4>
      <div className="row">
        <div className="col-md-6">
          <h5>כמות תכניות שהועברו לייצור</h5>
          <h2>{dashboardStats.finishedPlans || 0}</h2>
        </div>
        <div className="col-md-6">
          <h5>תכניות מעל 4 ימים בתכנון</h5>
          <h2>{dashboardStats.plansOverFourDays || 0}</h2>
        </div>
      </div>
    </div>
  );
}

export default PlanningReports;
