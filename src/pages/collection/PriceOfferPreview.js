// PriceOfferPreview.js
import React from 'react';

const PriceOfferPreview = ({ data }) => {
  const {
    clientName,
    projectName,
    company,
    city,
    phone,
    email,
    writtenBy,
    products,
  } = data;

  // Calculate totals
  const subtotal = products.reduce((sum, item) => sum + (parseFloat(item.price) * parseFloat(item.quantity) || 0), 0);
  const vat = subtotal * 0.17;
  const totalWithVat = subtotal + vat;

  return (
    <div style={{ fontFamily: 'DejaVu Sans', direction: 'rtl', textAlign: 'right', padding: '20px' }}>
      <h1>הצעת מחיר</h1>
      <div>
        <p>לקוח: {clientName}</p>
        <p>פרויקט: {projectName}</p>
        <p>חברה: {company}</p>
        <p>עיר: {city}</p>
        <p>טלפון: {phone}</p>
        <p>אימייל: {email}</p>
        <p>נכתב ע"י: {writtenBy}</p>
      </div>

      <h2>מוצרים</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>תיאור מוצר</th>
            <th style={tableHeaderStyle}>מחיר</th>
            <th style={tableHeaderStyle}>יחידות מידה</th>
            <th style={tableHeaderStyle}>כמות</th>
            <th style={tableHeaderStyle}>הערות</th>
            <th style={tableHeaderStyle}>סה"כ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const total = (parseFloat(product.price) || 0) * (parseFloat(product.quantity) || 0);
            return (
              <tr key={index}>
                <td style={tableCellStyle}>{product.description}</td>
                <td style={tableCellStyle}>{product.price}</td>
                <td style={tableCellStyle}>{product.unitOfMeasure}</td>
                <td style={tableCellStyle}>{product.quantity}</td>
                <td style={tableCellStyle}>{product.remarks}</td>
                <td style={tableCellStyle}>{total.toFixed(2)}</td>
              </tr>
            );
          })}
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

export default PriceOfferPreview;
