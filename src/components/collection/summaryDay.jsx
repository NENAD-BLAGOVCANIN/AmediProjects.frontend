import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import mobileImgExample from '../../assets/img/amedi-logo.jpg';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { saveSummaryDay } from '../../api/summaryDay'; // Ensure you have this API method set up

export default function SummaryDay() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [collectedToday, setCollectedToday] = useState(''); // New state for 'מה נגבה היום'
  const [futureCollection, setFutureCollection] = useState(''); // New state for 'כמה עתיד להגבות'
  const [problems, setProblems] = useState(''); // New state for 'בעיות'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const newSummaryDay = await saveSummaryDay({ title, body, collected_today: collectedToday, future_collection: futureCollection, problems });
      toast.success('הסיכום נשמר בהצלחה');
      navigate('/dashboard'); // Adjust the navigation as needed
    } catch (error) {
      setError('שמירת הסיכום נכשלה');
    }
  };

  return (
    <div dir="rtl" className='main-auth-page-container' style={{ backgroundColor: '#F3F3F5' }}>
      <div className="card p-0 w-100 bg-transparent" style={{ maxWidth: 'unset', minHeight: '100vh' }}>
        <div className="row m-0">
          <div className="col-md-6 bg-white d-flex align-items-center" style={{ minHeight: '100vh' }}>
            <div className='w-100 px-4 m-auto d-block' style={{ maxWidth: 600 }}>
              <div className='pt-3 pb-5'>
                <span className='py-3 h3 bold'>הוסף סיכום יום</span>
              </div>
              {error && <span className='text-danger small'>{error}</span>}
              <form onSubmit={handleSubmit} className='w-100'>
                <div className='py-2'>
                  <label className='mb-2'>כותרת</label>
                  <input
                    type="text"
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                    placeholder='הוסף כותרת ותאריך'
                  />
                </div>
                <div className='py-2'>
                  <label className='mb-2'>גוף ההודעה</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    name='body'
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                    placeholder='כמה נגבה, לקוחות בעתיים, בעיות בגבייה'
                  />
                </div>
                {/* more */}
                <div className='py-2'>
                  <label className='mb-2'>מה נגבה היום</label>
                  <input
                    type="text"
                    name='collectedToday'
                    value={collectedToday}
                    onChange={(e) => setCollectedToday(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                  />
                </div>
                <div className='py-2'>
                  <label className='mb-2'>כמה עתיד להגבות</label>
                  <input
                    type="text"
                    name='futureCollection'
                    value={futureCollection}
                    onChange={(e) => setFutureCollection(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                  />
                </div>
                <div className='py-2'>
                  <label className='mb-2'>בעיות</label>
                  <input
                    type="text"
                    name='problems'
                    value={problems}
                    onChange={(e) => setProblems(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                  />
                </div>

                {/* more */}
                
                <div className='py-4'>
                  <button type="submit" className='btn btn-primary w-100 py-3 border-0 bold hover-lg' style={{ backgroundColor: '#EBE9F9' }}>
                    הוסף סיכום יום
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 px-0">
            <div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center'>
              <img src={mobileImgExample} className='w-100 h-100' style={{ objectFit: 'cover', maxWidth: 800 }} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
