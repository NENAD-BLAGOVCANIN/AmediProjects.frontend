// AccountDetailsPreview.js
import React from 'react';

const AccountDetailsPreview = ({ data }) => {
  const {
    clientName,
    projectName,
    companyName,
    city,
    documentProducer,
    emailSent,
    billingData,
    subtotal,
    vat,
    totalWithVat,
  } = data;

  return (
    <div style={{ fontFamily: 'DejaVu Sans', direction: 'rtl', textAlign: 'right' }}>
      <div className="header">
        <h1>פירוט חשבון</h1>
        <p>לקוח: {clientName}</p>
        <p>פרויקט: {projectName}</p>
        <p>חברה: {companyName}</p>
        <p>עיר: {city}</p>
        <p>נוצר על ידי: {documentProducer}</p>
        <p>אימייל: {emailSent}</p>
      </div>

      <h2>מוצרים</h2>
      <table>
        <thead>
          <tr>
            <th>שם מוצר</th>
            <th>יחידות מידה</th>
            <th>כמות</th>
            <th>מחיר ליחידה</th>
            <th>סה"כ</th>
          </tr>
        </thead>
        <tbody>
          {billingData.map((product, index) => (
            <tr key={index}>
              <td>{product.description}</td>
              <td>{product.unit}</td>
              <td>{product.quantity}</td>
              <td>{product.unitPrice}</td>
              <td>{product.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>סיכום</h2>
      <table>
        <tbody>
          <tr>
            <td>סה"כ לפני מע"מ</td>
            <td>₪ {subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>מע"מ 17%</td>
            <td>₪ {vat.toFixed(2)}</td>
          </tr>
          <tr>
            <td>סה"כ כולל מע"מ</td>
            <td>₪ {totalWithVat.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Add any additional sections from your template */}
    </div>
  );
};

export default AccountDetailsPreview;
