// src/components/StatisticsProject/ProjectsReports.jsx

import React from 'react';
import { formatNumberWithCommas } from '../../utils/helpers';

function ProjectsReports({ dashboardStats }) {
  return (
    <div className="bg-white rounded p-3 mt-3 shadow-sm">
      <h4>פרויקטים</h4>
      <div className="row">
        <div className="col-md-6">
          <h5>כמות פרויקטים שהועברו לגביה בשבוע</h5>
          <h2>{dashboardStats.weeklyCollections || 0}</h2>
        </div>
        <div className="col-md-6">
          <h5>כמות פרויקטים תחת כל מנהל פרויקט</h5>
          <table className="table">
            <thead>
              <tr>
                <th>מנהל פרויקט</th>
                <th>מספר פרויקטים</th>
              </tr>
            </thead>
            <tbody>
              {dashboardStats.projectsPerManager && dashboardStats.projectsPerManager.length > 0 ? (
                dashboardStats.projectsPerManager.map((manager, index) => (
                  <tr key={index}>
                    <td>{manager.manager_name}</td>
                    <td>{manager.project_count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">אין נתונים זמינים</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h5>סכום החשבונות שהוגשו לכל מנהל פרויקט</h5>
          <table className="table">
            <thead>
              <tr>
                <th>מנהל פרויקט</th>
                <th>סכום חשבונות</th>
              </tr>
            </thead>
            <tbody>
              {dashboardStats.accountsPerManager && dashboardStats.accountsPerManager.length > 0 ? (
                dashboardStats.accountsPerManager.map((manager, index) => (
                  <tr key={index}>
                    <td>{manager.manager_name}</td>
                    <td>{formatNumberWithCommas(manager.total_accounts)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">אין נתונים זמינים</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectsReports;
