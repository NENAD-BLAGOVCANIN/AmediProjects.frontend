import React from 'react';
import { useTranslation } from 'react-i18next';

function ShippingTable({ datas }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded p-3 shadow-sm">
      <h6 className="bold mb-3">פרוייקטים בשליחת סחורה</h6>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>{t('leads.name')}</th>
            <th>{t('leads.status')}</th>

          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.status}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShippingTable;
