// BillingDetailsPreview.js
import React from 'react';

const BillingDetailsPreview = ({ data }) => {
  const {
    clientName,
    projectName,
    retentionAmount,
    companyName,
    city,
    phone,
    emailSent,
    documentProducer,
    inspectionRetentionAmount,
    insuranceAmount,
    totalAfterDeductions,
    vat,
    billingData,
    totalWithVat,
    previousInvoices,
    totalPreviousInvoices,
    remainingBalance,
    insurancePercentage: INSURANCE_PERCENTAGE,
    inspectionRetentionPercentage: INSPECTION_RETENTION_PERCENTAGE,
    retentionPercentage: RETENTION_PERCENTAGE,
    subtotal,
  } = data;

  return (
    <div style={{ fontFamily: 'DejaVu Sans', direction: 'rtl', textAlign: 'right', padding: '20px' }}>
      <h1>פירוט חשבון</h1>
      <div>
        <p>לקוח: {clientName}</p>
        <p>פרויקט: {projectName}</p>
        <p>חברה: {companyName}</p>
        <p>עיר: {city}</p>
        <p>טלפון: {phone}</p>
        <p>נוצר על ידי: {documentProducer}</p>
        <p>אימייל: {emailSent}</p>
      </div>

      <h2>עבודות</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>חודש</th>
            <th style={tableHeaderStyle}>מוצר</th>
            <th style={tableHeaderStyle}>מקום התקנה</th>
            <th style={tableHeaderStyle}>יחידות מידה</th>
            <th style={tableHeaderStyle}>כמות</th>
            <th style={tableHeaderStyle}>מחיר ליחידה</th>
            <th style={tableHeaderStyle}>הערות</th>
            <th style={tableHeaderStyle}>סה"כ</th>
          </tr>
        </thead>
        <tbody>
          {billingData.map((item, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{item.month}</td>
              <td style={tableCellStyle}>{item.description}</td>
              <td style={tableCellStyle}>{item.location}</td>
              <td style={tableCellStyle}>{item.unit}</td>
              <td style={tableCellStyle}>{item.quantity}</td>
              <td style={tableCellStyle}>{item.unitPrice}</td>
              <td style={tableCellStyle}>{item.remarks}</td>
              <td style={tableCellStyle}>{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>חישובי ניכויים</h3>
      <table className="table">
        <tbody>
          <tr>
            <td>עכבון ({RETENTION_PERCENTAGE}%)</td>
            <td>₪ {retentionAmount.toFixed(2)}</td>
            <td>₪ {(subtotal - retentionAmount).toFixed(2)}</td>
          </tr>
          <tr>
            <td>עכבון בדק ({INSPECTION_RETENTION_PERCENTAGE}%)</td>
            <td>₪ {inspectionRetentionAmount.toFixed(2)}</td>
            <td>₪ {(subtotal - retentionAmount - inspectionRetentionAmount).toFixed(2)}</td>
          </tr>
          <tr>
            <td>ביטוח ({INSURANCE_PERCENTAGE}%)</td>
            <td>₪ {insuranceAmount.toFixed(2)}</td>
            <td>₪ {totalAfterDeductions.toFixed(2)}</td>
          </tr>
          <tr>
            <td>מע"מ 17%</td>
            <td></td>
            <td>₪ {vat.toFixed(2)}</td>
          </tr>
          <tr>
            <td>סה"כ כולל מע"מ</td>
            <td></td>
            <td>₪ {totalWithVat.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Previous Invoices Table */}
      <h3>חשבוניות קודמות</h3>
      <table className="table">
        <thead>
          <tr>
            <th>מס' חשבונית</th>
            <th>תאריך חשבונית</th>
            <th>סכום חשבונית</th>
            <th>מס' קבלה</th>
          </tr>
        </thead>
        <tbody>
          {previousInvoices.map((inv, index) => (
            <tr key={index}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.invoiceDate}</td>
              <td>₪ {inv.invoiceAmount.toFixed(2)}</td>
              <td>{inv.receiptNumber}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2">סה"כ חשבוניות שהופקו ושולמו</td>
            <td>₪ {totalPreviousInvoices.toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="2">יתרה להפקת חשבונית ותשלום</td>
            <td>₪ {remainingBalance.toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <h2>סיכום</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={tableCellStyle}>סה"כ לפני מע"מ</td>
            <td style={tableCellStyle}>₪ {subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}>מע"מ 17%</td>
            <td style={tableCellStyle}>₪ {vat.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}>סה"כ כולל מע"מ</td>
            <td style={tableCellStyle}>₪ {totalWithVat.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Additional sections if needed */}
      <div className="important-notice">
        <h3>הערה:</h3>
        <p>נא רשום המחאה לפקודת ניר אמידי פרוייקטים בע"מ</p>
        <p>תשלום לפי חוזה/הסכם</p>
        <p>בברכה,</p>
        <p>מאיר , מנהל גבייה</p>
        <p>055-6833244</p>
      </div>
    </div>
  );
};

// Styles for table cells
const tableHeaderStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'center',
  backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'center',
};

export default BillingDetailsPreview;
