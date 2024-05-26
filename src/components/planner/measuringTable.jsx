import React from 'react';
import { useTranslation } from 'react-i18next';

function MeasuringTable({ leads }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded p-3 shadow-sm">
      <h6 className="bold mb-3">פרוייקטים מדידה</h6>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>{t('leads.name')}</th>
            <th>{t('leads.status')}</th>

          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <td>{lead.name}</td>
              <td>{lead.status}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeasuringTable;
