import React, { useState } from 'react';
import logo from '../assets/img/logo.png'
import { register } from '../api/register';
import { useNavigate } from 'react-router-dom';


export default function Register({authenticated, setAuthenticated}) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { success, message } = await register(name, email, password);
      if (success) {
        setAuthenticated(true);
        navigate('/');
      } else {
        setError(message || 'Registration failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred while logging in.');
      console.error(error);
    }
  };


  return (
    <div className='main-auth-page-container'>

      <div className="card bg-white px-5 py-5 w-100" style={{ maxWidth: 540 }}>

        <div className='text-center'>
          <div className='py-3'>
            <img src={logo} alt="" className='auth-page-logo' />
          </div>

          <div className='py-3'>
            <span style={{ fontSize: '18pt' }} className='py-3 text-secondary'>Sign Up</span>
          </div>

        </div>

        {error && <span className='text-danger small'>{error}</span>} { }

        <form onSubmit={handleSubmit}>
          <div className='py-2'>
            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className='form-control py-3 border-0' style={{ backgroundColor: '#EBE9F9' }} placeholder='Your Name' />
          </div>
          <div className='py-2'> 
            <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control py-3 border-0' style={{ backgroundColor: '#EBE9F9' }} placeholder='Your email address' />
          </div>
          <div className='py-2'>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' className='form-control py-3 border-0' style={{ backgroundColor: '#EBE9F9' }} placeholder='Your password' />
          </div>
          <div className='py-2'>
            <button type="submit" className='btn btn-primary w-100 py-3 border-0 fw-500' style={{ backgroundColor: '#EBE9F9' }}>Sign Up</button>
          </div>

          <div className='d-flex justify-content-between py-2'>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label text-secondary" htmlFor="flexCheckDefault">
                Remember Me
              </label>
            </div>
          </div>

          <div className='d-flex justify-content-center py-4'>
            <span className='px-1 text-secondary'>Already have an account?</span>
            <a href="/login" className='px-1 text-primary'>Log In</a>
          </div>


        </form>

      </div>

    </div>
  )
}
