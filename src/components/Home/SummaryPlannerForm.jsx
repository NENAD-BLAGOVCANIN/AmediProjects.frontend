import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getBonuses } from '../../api/bonuses';
import { getSummaryPlanners, saveSummaryPlanners, updateSummaryPlanners } from '../../api/summaryPlanners';

export default function SummaryPlannerForm() {
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const [date, setDate] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [bonuses, setBonuses] = useState([]);
  const [selectedBonuses, setSelectedBonuses] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [employeeComments, setEmployeeComments] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const data = await getBonuses();
        setBonuses(data);
      } catch (error) {
        console.error('Failed to fetch bonuses', error);
      }
    };

    fetchBonuses();
  }, []);

  const handleBonusChange = (bonusId, value) => {
    setSelectedBonuses({
      ...selectedBonuses,
      [bonusId]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await saveSummaryPlanners({
        project_name: projectName,
        date: date,
        worker_name: workerName,
        employee_comments: employeeComments,
        bonuses: JSON.stringify(selectedBonuses),
      });
      toast.success('הסיכום נשמר בהצלחה');
      navigate('/dashboard'); // Adjust the navigation as needed
    } catch (error) {
      setError('שמירת הסיכום נכשלה');
    }
  };

  const filteredBonuses = bonuses.filter(bonus =>
    bonus.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBonuses.length / itemsPerPage);
  const currentBonuses = filteredBonuses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div dir="rtl" className='main-auth-page-container' style={{ backgroundColor: '#F3F3F5' }}>
      <div className="card p-0 w-100 bg-transparent" style={{ maxWidth: 'unset', minHeight: '100vh' }}>
        <div className="row m-0">
          <div className="col-md-6 bg-white d-flex align-items-center" style={{ minHeight: '100vh' }}>
            <div className='w-100 px-4 m-auto d-block' style={{ maxWidth: 600 }}>
              <div className='pt-3 pb-5'>
                <span className='py-3 h3 bold'>סיכום יום מתכננים</span>
              </div>
              {error && <span className='text-danger small'>{error}</span>}
              <form onSubmit={handleSubmit} className='w-100'>
                <div className='py-2'>
                  <label className='mb-2'>שם הפרויקט</label>
                  <input
                    type="text"
                    name='projectName'
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                    placeholder='הוסף שם פרויקט'
                  />
                </div>
                <div className='py-2'>
                  <label className='mb-2'>תאריך</label>
                  <input
                    type="date"
                    name='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                  />
                </div>
                <div className='py-2'>
                  <label className='mb-2'>שם העובד</label>
                  <input
                    type="text"
                    name='workerName'
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                    placeholder='הוסף שם עובד'
                  />
                </div>
                <div className='py-2'>
                  <label className='mb-2'> הערות עובד</label>
                  <textarea
                    rows="3"
                    name='employee_comments'
                    value={employeeComments}
                    onChange={(e) => setEmployeeComments(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                    placeholder='הוסף שם עובד'
                  />
                </div>
                {/* Display selected bonuses */}
                <div className='py-2'>
                  <label className='mb-2'>בונוסים שנבחרו</label>
                  <ul>
                    {Object.entries(selectedBonuses).map(([bonusId, quantity]) => {
                      const bonus = bonuses.find(b => b.id === parseInt(bonusId));
                      return bonus ? (
                        <li key={bonusId}>{bonus.name}: {quantity}</li>
                      ) : null;
                    })}
                  </ul>
                </div>
                <div className='py-4'>
                  <button type="submit" className='btn btn-primary w-100 py-3 border-0 bold hover-lg' style={{ backgroundColor: '#EBE9F9' }}>
                    הוספת סיכום יום
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 px-0">
            <div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center'>
              {/* Bonuses table */}
              <div className='w-100 px-4 m-auto d-block' style={{ maxWidth: 600 }}>
                <div className='pt-3 pb-5'>
                  <span className='py-3 h3 bold'>בונוסים</span>
                </div>
                <div className='py-2'>
                  <input
                    type="text"
                    placeholder='חפש בונוס'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='form-control'
                  />
                </div>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>שם</th>
                      <th>כמות</th>
                      <th>הוסף</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBonuses.map(bonus => (
                      <tr key={bonus.id}>
                        <td>{bonus.name}</td>
                        <td>
                          <input
                            type="number"
                            value={selectedBonuses[bonus.id] || ''}
                            onChange={(e) => handleBonusChange(bonus.id, e.target.value)}
                            className='form-control'
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className='btn btn-primary'
                            onClick={() => handleBonusChange(bonus.id, selectedBonuses[bonus.id] || 1)}
                          >
                            הוסף
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                  <nav>
                    <ul className='pagination'>
                      {[...Array(totalPages).keys()].map(page => (
                        <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                          <button onClick={() => handlePageChange(page + 1)} className='page-link'>
                            {page + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
