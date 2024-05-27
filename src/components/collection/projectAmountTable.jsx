import React from 'react';
import { useTranslation } from 'react-i18next';

function ProjectAmountTable({ projects }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded p-3 shadow-sm">
      <h6 className="bold mb-3">{t('projects.delivered_projects')}</h6>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>{t('projects.name')}</th>
            <th>{t('projects.status')}</th>
            <th>{t('projects.amount')}</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.status}</td>
              <td>{project.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectAmountTable;
