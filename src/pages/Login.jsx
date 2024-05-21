import React, { useState } from 'react';
import logo from '../assets/img/logo.png'
import { login } from '../api/login';
import { useNavigate } from 'react-router-dom';
import mobileImgExample from '../assets/img/mobile-img-example.png'
import { useTranslation } from 'react-i18next';

export default function Login({ authenticated, setAuthenticated }) {

    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { success, message } = await login(email, password);
            if (success) {
                setAuthenticated(true);
                navigate('/projects');
            } else {
                setError(message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Wrong email or password');
            console.error(error);
        }
    };


    return (
        <div className='main-auth-page-container' style={{ backgroundColor: '#F3F3F5' }}>

            <div className="card p-0 w-100 bg-transparent" style={{ maxWidth: 'unset', minHeight: '100vh' }}>

                <div className="row m-0">
                    <div className="col-md-6 bg-white d-flex align-items-center" style={{ minHeight: '100vh' }}>
                        <div className='w-100 px-4 m-auto d-block' style={{ maxWidth: 600 }}>


                            <div className='pt-3 pb-5'>
                                <span className='py-3 h3 bold'>{t('greeting.welcome_back')}!</span>
                            </div>


                            {error && <span className='text-danger small'>{error}</span>} { }

                            <form onSubmit={handleSubmit} className='w-100'>
                                <div className='py-2'>
                                    <label className='mb-2'>{t('login.email')}</label>
                                    <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control bg-transparent py-3 border-0' style={{ backgroundColor: '#EBE9F9' }} placeholder='example@company.com' />
                                </div>
                                <div className='py-2'>
                                    <label className='mb-2'>{t('login.password')}</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' className='form-control bg-transparent py-3 border-0' style={{ backgroundColor: '#EBE9F9' }} placeholder='••••••••' />
                                </div>
                                <div className='py-4'>
                                    <button type="submit" className='btn btn-primary w-100 py-3 border-0 bold hover-lg' style={{ backgroundColor: '#EBE9F9' }}>{t('login.login')}</button>
                                </div>

                                <div className='d-flex justify-content-between py-2'>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label text-secondary small" htmlFor="flexCheckDefault">
                                            {t('login.remember_me')}
                                        </label>
                                    </div>
                                    <a href="" className='text-muted small fw-500 text-decoration-none'>{t('login.trouble_logging_in')}</a>
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
    )
}
