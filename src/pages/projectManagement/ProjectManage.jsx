import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import mobileImgExample from '../../assets/img/amedi-logo.jpg';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addNotification } from '../../api/notifications'; // Ensure you have this API method set up

export default function ProjectManage() {
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [person, setPerson] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const newNotification = await addNotification({ projectName, date, amount, person });
      toast.success('ההודעה נשלחה בהצלחה');
      navigate('/dashboard'); // Adjust the navigation as needed
    } catch (error) {
      setError('ההודעה נכשלה');
    }
  };

  return (
    <div dir="rtl" className='main-auth-page-container' style={{ backgroundColor: '#F3F3F5' }}>
      <div className="card p-0 w-100 bg-transparent" style={{ maxWidth: 'unset', minHeight: '100vh' }}>
        <div className="row m-0">
          <div className="col-md-6 bg-white d-flex align-items-center" style={{ minHeight: '100vh' }}>
            <div className='w-100 px-4 m-auto d-block' style={{ maxWidth: 600 }}>
              <div className='pt-3 pb-5'>
                <span className='py-3 h3 bold'>מדידת פרויקט</span>
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
                    placeholder='בחר תאריך'
                  />
                </div>
                <div className='py-2'>
                  <label className='mb-2'>כמה נמדד</label>
                  <input
                    type="number"
                    name='amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                    placeholder='כמה נמדד'
                  />
                </div>
                <div className='py-2'>
                  <label className='mb-2'>שם מודד</label>
                  <input
                    type="text"
                    name='person'
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                    className='form-control bg-transparent py-3 border-0'
                    style={{ backgroundColor: '#EBE9F9' }}
                    placeholder='שם מודד'
                  />
                </div>
                <div className='py-4'>
                  <button type="submit" className='btn btn-primary w-100 py-3 border-0 bold hover-lg' style={{ backgroundColor: '#EBE9F9' }}>
                    הוסף ניהול פרויקט
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
