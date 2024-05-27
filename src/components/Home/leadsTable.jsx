import React from 'react';
import { useTranslation } from 'react-i18next';

function LeadsTable({ leads }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded p-3 shadow-sm">
      <h6 className="bold mb-3">{t('leads.title')}</h6>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>{t('leads.name')}</th>
            <th>{t('leads.phone')}</th>
            <th>{t('leads.status')}</th>
            <th>{t('leads.company_name')}</th>
            <th>{t('leads.last_contact')}</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>{lead.status}</td>
              <td>{lead.companyName}</td>
              <td>{lead.lastContact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;
