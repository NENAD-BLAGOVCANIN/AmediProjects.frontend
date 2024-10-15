import React, { useState , useEffect } from 'react';
import { toast } from 'react-toastify';
import { generateAccountDetailsPdf, fetchAccount, fetchAllAccounts , fetchAccountDetailsHtml} from '../../api/pdf'; // ייבוא הפונקציות המעודכנות
import BillingDetailsPreview  from './BillingDetailsPreview';
import * as XLSX from 'xlsx';

export default function BillingDetailsForm() {
  const [billingData, setBillingData] = useState([
    { id: 1, month: '', description: '', location: '', unit: '', quantity: 0, unitPrice: 0, total: 0 },
    { id: 2, month: '', description: '', location: '', unit: '', quantity: 0, unitPrice: 0, total: 0 },
    // Add more rows if needed
  ]);
  
  const [freeTextInput, setFreeTextInput] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [documentProducer, setDocumentProducer] = useState('מאיר');
  const [emailSent, setEmailSent] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [totalWithVat, setTotalWithVat] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
// State for importing existing account
const [selectedAccountId, setSelectedAccountId] = useState('');
const [existingAccounts, setExistingAccounts] = useState([]);
const [importedProducts, setImportedProducts] = useState([]);
const [showProductSelection, setShowProductSelection] = useState(false);
const [importedSections, setImportedSections] = useState([]);

// Deductions
const [retentionPercentage, setRetentionPercentage] = useState(5); // עכבון 5%
const [inspectionRetentionPercentage, setInspectionRetentionPercentage] = useState(5); // עכבון בדק 5%
const [insurancePercentage, setInsurancePercentage] = useState(0.8); // ביטוח 0.8%

const [retentionAmount, setRetentionAmount] = useState(0);
const [inspectionRetentionAmount, setInspectionRetentionAmount] = useState(0);
const [insuranceAmount, setInsuranceAmount] = useState(0);

// Previous Invoices
const [previousInvoices, setPreviousInvoices] = useState([
  // { invoiceNumber: '', invoiceDate: '', invoiceAmount: 0, receiptNumber: '' }
]);

const [totalPreviousInvoices, setTotalPreviousInvoices] = useState(0);
const [remainingBalance, setRemainingBalance] = useState(0);

// style
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 1000,
  overflowY: 'auto',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  margin: '5% auto',
  padding: '20px',
  width: '80%',
  maxWidth: '800px',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
};


// end style


useEffect(() => {
  // Fetch existing accounts when component mounts
  fetchExistingAccounts();
}, []);

const fetchExistingAccounts = async () => {
  try {
    // Replace with your actual API endpoint to fetch accounts
    const response = await fetch('/api/accounts');
    const data = await response.json();
    setExistingAccounts(data);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    toast.error('שגיאה בייבוא חשבונות קיימים');
  }
};

const RETENTION_PERCENTAGE = 5; // עכבון 5%
const INSPECTION_RETENTION_PERCENTAGE = 5; // עכבון בדק 5%
const INSURANCE_PERCENTAGE = 0.8; // ביטוח 0.8%
const VAT_PERCENTAGE = 0.17; // מע"מ 17%
const [totalAfterDeductions, setTotalAfterDeductions] = useState(0);
  const handleInputChange = (id, field, value) => {
    setBillingData(prevData =>
      prevData.map(item =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              total: field === 'quantity' || field === 'unitPrice'
                ? value * (item[field === 'quantity' ? 'unitPrice' : 'quantity'])
                : item.total,
            }
          : item
      )
    );
  };
  const addNewRow = () => {
    const newId = billingData.length > 0 ? billingData[billingData.length - 1].id + 1 : 1;
    setBillingData([...billingData, { id: newId, month: '', description: '', location: '', unit: '', quantity: 0, unitPrice: 0, total: 0, remarks: '' }]);
  };

  const removeRow = (id) => {
    setBillingData(billingData.filter(item => item.id !== id));
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    try {
      calculateTotals();
  
      const data = {
        clientName,
        projectName,
        companyName,
        city,
        phone,
        documentProducer,
        emailSent,
        billingData,
        subtotal,
        vat,
        totalWithVat,
      };
  
      const htmlContent = await fetchAccountDetailsHtml(data);
  
      // Set the HTML content to state
      setPreviewHtml(htmlContent);
      setShowPreview(true);
    } catch (error) {
      console.error(error);
      toast.error('הצגה מקדימה נכשלה');
    }
  };
  

  // import xslx
  const handleExcelImport = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('נא לבחור קובץ אקסל.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Assuming the first sheet contains the data
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
  
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
  
      // Process jsonData to extract sections
      const sections = [];
      let currentSection = null;
      let columnHeaders = [];
  
      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];
        const firstCell = row[0] ? row[0].toString().trim() : '';
  
        if (firstCell && /^\d+$/.test(firstCell)) {
          // New section detected
          if (currentSection) {
            sections.push(currentSection);
          }
          currentSection = {
            id: firstCell,
            header: row[1] ? row[1].toString().trim() : '',
            items: [],
          };
          // Column headers are in the same row, starting from column C
          columnHeaders = row.slice(2).map((header) => (header ? header.toString().trim() : ''));
        } else if (currentSection && (row[1] && row[1].toString().trim() !== '')) {
          // Data row
          const itemData = row.slice(1); // Exclude column A
          const item = {};
          item['תיאור'] = itemData[0] ? itemData[0].toString().trim() : ''; // Column B
          for (let j = 1; j < itemData.length; j++) {
            const header = columnHeaders[j - 1]; // Adjust index
            if (header) {
              item[header] = itemData[j] ? itemData[j].toString().trim() : '';
            }
          }
          currentSection.items.push(item);
        }
      }
  
      // Add the last section
      if (currentSection) {
        sections.push(currentSection);
      }
  
      // Remove empty sections
      const nonEmptySections = sections.filter((section) => section.items.length > 0);
  
      // Debugging: Log the parsed sections
      console.log('Imported Sections:', nonEmptySections);
  
      setImportedSections(nonEmptySections);
      setShowProductSelection(true);
    };
  
    reader.readAsArrayBuffer(file);
  };
  
  

  const handleAddSelectedProducts = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedValues = formData.getAll('selectedProducts');
  
    const selectedItems = selectedValues.map((value) => {
      const [sectionIndex, itemIndex] = value.split('-').map(Number);
      const section = importedSections[sectionIndex];
      const item = section.items[itemIndex];
      // Map item to the format used in billingData
      return {
        id: Date.now() + Math.random(),
        month: '', // You can assign the month if available
        description: item['תיאור'] || '',
        location: '', // If location is available, use item['מקום'] or similar
        unit: item['סוג יחידת מידה'] || '',
        quantity: parseFloat(item['כמות']) || 0,
        unitPrice: parseFloat(item['מחיר']) || 0,
        total: (parseFloat(item['כמות']) || 0) * (parseFloat(item['מחיר']) || 0),
        remarks: '', // Add remarks if available
        sectionHeader: section.header || 'ללא כותרת',
      };
    });
  
    setBillingData((prevData) => [...prevData, ...selectedItems]);
    setShowProductSelection(false);
    calculateTotals();
    toast.success('מוצרים נוספו בהצלחה.');
  };
  
  

  // end

  // Calculate Totals
  const calculateTotals = () => {
    const subtotal = billingData.reduce((sum, item) => sum + item.total, 0);

    // Deductions
    const retentionAmount = subtotal * (RETENTION_PERCENTAGE / 100);
    const afterRetention = subtotal - retentionAmount;
    
    const inspectionRetentionAmount = afterRetention * (INSPECTION_RETENTION_PERCENTAGE / 100);
    const afterInspectionRetention = afterRetention - inspectionRetentionAmount;
    
    const insuranceAmount = afterInspectionRetention * (INSURANCE_PERCENTAGE / 100);
    const totalAfterDeductions = afterInspectionRetention - insuranceAmount;
    
    const vatAmount = totalAfterDeductions * VAT_PERCENTAGE;
    const totalWithVat = totalAfterDeductions + vatAmount;
    

    const totalPreviousInvoices = previousInvoices.reduce((sum, inv) => sum + (inv.invoiceAmount || 0), 0);
    const remainingBalance = totalWithVat - totalPreviousInvoices;

    // Update State
    setSubtotal(subtotal);
    setRetentionAmount(retentionAmount);
    setInspectionRetentionAmount(inspectionRetentionAmount);
    setInsuranceAmount(insuranceAmount);
    setTotalAfterDeductions(totalAfterDeductions);
    setVat(vatAmount);
    setTotalWithVat(totalWithVat);
    setTotalPreviousInvoices(totalPreviousInvoices);
    setRemainingBalance(remainingBalance);
  };

  // Previous Invoices Functions
  const handleInvoiceChange = (index, field, value) => {
    setPreviousInvoices(prevInvoices => {
      const newInvoices = [...prevInvoices];
      newInvoices[index][field] = value;
      return newInvoices;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      calculateTotals();

      // Create the data object to send to the server
      const data = {
        clientName,
        projectName,
        companyName,
        city,
        phone,
        documentProducer,
        emailSent,
        billingData,
        subtotal,
        vat,
        totalWithVat,
      };

      // Send the data to the backend
      await generateAccountDetailsPdf(data);
      toast.success('הנתונים הוגשו בהצלחה!');
    } catch (error) {
      toast.error('הגשה נכשלה');
    }
  };

  const handleImportAccount = async (accountId) => {
    try {
      if (!accountId) return;

      const response = await fetchAccount(accountId);
      const account = response.data;

      setClientName(account.client_name);
      setProjectName(account.project_name);
      setCompanyName(account.company);
      setCity(account.city);
      setPhone(account.phone);
      setDocumentProducer(account.created_by);
      setEmailSent(account.email);

      // Map existing account details to billingData
      const importedBillingData = account.accountDetails.map(detail => ({
        id: detail.id,
        month: detail.month || '',
        description: detail.product_name || '',
        location: detail.location || '',
        unit: detail.unit_of_measure || '',
        quantity: detail.quantity || 0,
        unitPrice: detail.unit_price || 0,
        total: detail.total || 0,
        remarks: detail.remarks || '',
      }));

      setBillingData(importedBillingData);
      calculateTotals();
      toast.success('חשבונך יובא בהצלחה!');
    } catch (error) {
      console.error('Error importing account:', error);
      toast.error('שגיאה בייבוא חשבון');
    }
  };

  const addInvoice = () => {
    setPreviousInvoices(prevInvoices => [...prevInvoices, {
      invoiceNumber: '',
      invoiceDate: '',
      invoiceAmount: 0,
      receiptNumber: ''
    }]);
  };

  const removeInvoice = (index) => {
    setPreviousInvoices(prevInvoices => {
      const newInvoices = [...prevInvoices];
      newInvoices.splice(index, 1);
      return newInvoices;
    });
  };




  

  // סוף
  return (
    <div dir="rtl" className='container-fluid' style={{ backgroundColor: '#F3F3F5' }}>
      <div className="card p-0 w-100 bg-transparent" style={{ maxWidth: 'unset', minHeight: '100vh' }}>
        <div className="row m-0">
          <div className="col-md-12 px-0">
            <div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center'>
              <div className='w-100 px-4 m-auto d-block' style={{ maxWidth: 800 }}>
                <div className='pt-3 pb-5'>
                  <span className='py-3 h3 bold'>פירוט חשבון עריכה</span>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* Customer Information side by side */}
                  <div className="row">
                    <div className="col-md-6">
                      <label>לקוח</label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className='form-control'
                        placeholder="הכנס שם לקוח"
                        
                      />
                    </div>
                    <div className="col-md-6">
                      <label>פרוייקט</label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className='form-control'
                        placeholder="הכנס שם פרוייקט"
                    
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>חברת</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className='form-control'
                        placeholder="הכנס שם חברה"
                       
                      />
                    </div>
                    <div className="col-md-6">
                      <label>עיר</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className='form-control'
                        placeholder="הכנס עיר"
                    
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>טלפון</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='form-control'
                        placeholder="הכנס טלפון"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>מפיק מסמך</label>
                      <input
                        type="text"
                        value={documentProducer}
                        onChange={(e) => setDocumentProducer(e.target.value)}
                        className='form-control'
                        placeholder="הכנס מפיק מסמך"
                   
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>נשלח למייל</label>
                      <input
                        type="email"
                        value={emailSent}
                        onChange={(e) => setEmailSent(e.target.value)}
                        className='form-control'
                        placeholder="הכנס מייל"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>ייבא חשבון קיים</label>
                      <select
                        value={selectedAccountId}
                        onChange={(e) => setSelectedAccountId(e.target.value)}
                        className='form-control'
                      >
                        <option value="">בחר חשבון</option>
                        {existingAccounts.map(account => (
                          <option key={account.id} value={account.id}>
                            {account.client_name} - {account.project_name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className='btn btn-secondary mt-2'
                        onClick={() => handleImportAccount(selectedAccountId)}
                        disabled={!selectedAccountId}
                      >
                        ייבא חשבון
                      </button>
                    </div>
                  </div>

                  {/* Billing Table */}
                  <table className='table mt-5'>
                    <thead>
                      <tr>
                        <th>חודש</th>
                        <th>מוצר/תיאור פרט</th>
                        <th>מקום התקנה</th>
                        <th>יחידת מידה</th>
                        <th>כמות</th>
                        <th>מחיר ליחידה</th>
                        <th>הערות</th>
                        <th>סה"כ</th>
                        <th>פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingData.map(item => (
                        <tr key={item.id}>
                          <td>
                            <input
                              type="text"
                              value={item.month}
                              onChange={(e) => handleInputChange(item.id, 'month', e.target.value)}
                              className='form-control'
                              
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handleInputChange(item.id, 'description', e.target.value)}
                              className='form-control'
                              
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.location}
                              onChange={(e) => handleInputChange(item.id, 'location', e.target.value)}
                              className='form-control'
                              
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) => handleInputChange(item.id, 'unit', e.target.value)}
                              className='form-control'
                              
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.quantity}
                              onChange={(e) => handleInputChange(item.id, 'quantity', parseFloat(e.target.value))}
                              className='form-control'
                              min="0"
                              
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.unitPrice}
                              onChange={(e) => handleInputChange(item.id, 'unitPrice', parseFloat(e.target.value))}
                              className='form-control'
                              min="0"
                         
                              
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.remarks}
                              onChange={(e) => handleInputChange(item.id, 'remarks', e.target.value)}
                              className='form-control'
                            />
                          </td>
                          <td>{item.total.toFixed(2)}</td>
                          <td>
                            {billingData.length > 1 && (
                              <button type="button" className='btn btn-danger btn-sm' onClick={() => removeRow(item.id)}>
                                מחק
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" className='btn btn-secondary mt-3' onClick={addNewRow}>
                    הוסף שורה חדשה
                  </button>
                  <div className="form-group mt-3">
                    <label>חשבוניות קודמות</label>
                    {previousInvoices.map((invoice, index) => (
                      <div key={index} className="row mt-2">
                        <div className="col-md-3">
                          <input
                            type="text"
                            value={invoice.invoiceNumber}
                            onChange={(e) => handleInvoiceChange(index, 'invoiceNumber', e.target.value)}
                            className='form-control'
                            placeholder="מס' חשבונית"
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="date"
                            value={invoice.invoiceDate}
                            onChange={(e) => handleInvoiceChange(index, 'invoiceDate', e.target.value)}
                            className='form-control'
                            placeholder="תאריך חשבונית"
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="number"
                            value={invoice.invoiceAmount}
                            onChange={(e) => handleInvoiceChange(index, 'invoiceAmount', parseFloat(e.target.value))}
                            className='form-control'
                            placeholder="סכום חשבונית"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            type="text"
                            value={invoice.receiptNumber}
                            onChange={(e) => handleInvoiceChange(index, 'receiptNumber', e.target.value)}
                            className='form-control'
                            placeholder="מס' קבלה"
                          />
                        </div>
                        <div className="col-md-1">
                          <button type="button" className='btn btn-danger' onClick={() => removeInvoice(index)}>מחק</button>
                        </div>
                      </div>
                    ))}
                    <button type="button" className='btn btn-secondary mt-2' onClick={addInvoice}>הוסף חשבונית</button>
                  </div>
                  {/* Totals */}
                  <div className='py-4'>
                    <div>סה"כ לפני ניכויים: ₪{subtotal.toFixed(2)}</div>
                    <div>עכבון ({RETENTION_PERCENTAGE}%): ₪{retentionAmount.toFixed(2)}</div>
                    <div>עכבון בדק ({INSPECTION_RETENTION_PERCENTAGE}%): ₪{inspectionRetentionAmount.toFixed(2)}</div>
                    <div>ביטוח ({INSURANCE_PERCENTAGE}%): ₪{insuranceAmount.toFixed(2)}</div>
                    <div>סה"כ לאחר ניכויים: ₪{totalAfterDeductions.toFixed(2)}</div>
                    <div>מע"מ {VAT_PERCENTAGE * 100}%: ₪{vat.toFixed(2)}</div>
                    <div>סה"כ כולל מע"מ: ₪{totalWithVat.toFixed(2)}</div>
                    <div>סה"כ חשבוניות קודמות: ₪{totalPreviousInvoices.toFixed(2)}</div>
                    <div>יתרה לתשלום: ₪{remainingBalance.toFixed(2)}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className='py-4 d-flex justify-content-between'>
                    <button type="button" className='btn btn-info w-48 py-3 border-0 bold hover-lg' onClick={handlePreview}>
                      תצוגה מקדימה
                    </button>
                    <button type="submit" className='btn btn-primary w-48 py-3 border-0 bold hover-lg'>
                      הגשת טופס
                    </button>
                  </div>
                </form>
                <div className="form-group mt-3">
                  <label>ייבא מוצרים מאקסל</label>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelImport}
                    className='form-control'
                  />
                </div>
                {showProductSelection && (
  <div className="product-selection-modal">
    <h3>בחר מוצרים להוספה</h3>
    <form onSubmit={handleAddSelectedProducts}>
      {importedSections.map((section, sectionIndex) => (
        <div key={section.id}>
          <h4>{section.header}</h4>
          {section.items.length === 0 ? (
            <p>אין מוצרים זמינים בסעיף זה.</p>
          ) : (
            section.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                <input
                  type="checkbox"
                  id={`product-${sectionIndex}-${itemIndex}`}
                  name="selectedProducts"
                  value={`${sectionIndex}-${itemIndex}`}
                />
                <label htmlFor={`product-${sectionIndex}-${itemIndex}`}>
                  {item['תיאור']} - {item['כמות']} x {item['מחיר']}
                </label>
              </div>
            ))
          )}
        </div>
      ))}
      <button type="submit" className='btn btn-primary mt-2'>הוסף מוצרים נבחרים</button>
      <button type="button" className='btn btn-secondary mt-2' onClick={() => setShowProductSelection(false)}>ביטול</button>
    </form>
  </div>
)}


                {/* Additional section */}
                {/* <table className='table mt-5'>
                  <thead>
                    <tr>
                      <th>סה"כ לחודש כולל מע"מ</th>
                      <th>מאזן</th>
                      <th>מס' חשבונית</th>
                      <th>מס' קבלה</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>₪ 0.00</td>
                      <td>₪ 0.00</td>
                      <td>₪ 0.00</td>
                      <td>₪ 0.00</td>
                    </tr>
                    <tr>
                      <td>סה"כ לפני מע"מ</td>
                      <td colSpan="3">₪ 0.00</td>
                    </tr>
                    <tr>
                      <td>מע"מ 17%</td>
                      <td colSpan="3">₪ 0.00</td>
                    </tr>
                    <tr>
                      <td>סה"כ כולל מע"מ</td>
                      <td colSpan="3">₪ 0.00</td>
                    </tr>
                    <tr>
                      <td>מאזן</td>
                      <td>מס' חשבונית</td>
                      <td>מס' קבלה</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>₪ 0.00</td>
                      <td>₪ 0.00</td>
                      <td>₪ 0.00</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>סה"כ חשבוניות שהופקו ושולמו</td>
                      <td colSpan="3">₪ 0.00</td>
                    </tr>
                    <tr>
                      <td>יתרה להפקת חשבונית ותשלום</td>
                      <td colSpan="3">₪ 0.00</td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPreview && (
  <div className="preview-modal" style={modalStyle}>
    <div className="preview-content" style={modalContentStyle}>
      <button onClick={() => setShowPreview(false)} style={closeButtonStyle}>
        סגור תצוגה מקדימה
      </button>
      <BillingDetailsPreview
            data={{
              clientName,
              projectName,
              retentionAmount,
              companyName,
              city,
              phone,
              emailSent,
              documentProducer,
              billingData,
              subtotal,
              retentionAmount,
              inspectionRetentionAmount,
              insuranceAmount,
              totalAfterDeductions,
              vat,
              totalWithVat,
              previousInvoices,
              totalPreviousInvoices,
              remainingBalance,
              
            }}
      />
    </div>
    {showProductSelection && (
      <div className="product-selection-modal">
        <h3>בחר מוצרים להוספה</h3>
        <form onSubmit={handleAddSelectedProducts}>
          {importedSections.map((section, sectionIndex) => (
            <div key={section.id}>
              <h4>{section.header}</h4>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <input
                    type="checkbox"
                    id={`product-${sectionIndex}-${itemIndex}`}
                    name="selectedProducts"
                    value={`${sectionIndex}-${itemIndex}`}
                  />
                  <label htmlFor={`product-${sectionIndex}-${itemIndex}`}>
                    {item['תיאור']} - {item['כמות']} x {item['מחיר']}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit" className='btn btn-primary mt-2'>הוסף מוצרים נבחרים</button>
          <button type="button" className='btn btn-secondary mt-2' onClick={() => setShowProductSelection(false)}>ביטול</button>
        </form>
      </div>
    )}
  </div>
)}


    </div>
    
  );
}