import React, { useState } from 'react'
import { register } from '../api/register';

function RegistrationModal({ showRegistrationModal, setShowRegistrationModal, users, setUsers }) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await register(name, email, password);
            console.log(response);
            const user = response.user;
            console.log(user);
            setUsers([user, ...users]);
            setShowRegistrationModal(false);
        } catch (error) {
        setError('An error occurred while registering an account.');
        console.error(error);
    }
};

const handleCloseRegistrationModal = () => {
    setShowRegistrationModal(false);
};

return (
    <>
        <div className={`modal fade ${showRegistrationModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                    <div className="modal-header pb-0 border-0 d-flex align-items-center">
                        <div>
                            <h4 className="modal-title bold m-0">Register An Account</h4>
                        </div>
                        <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseRegistrationModal} style={{ fontSize: '25pt', fontWeight: '100' }}>
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className='modal-body'>
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
                                <a href="/login" className='px-1 text-muted fw-500 text-decoration-none'>Log In</a>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </>
)
}

export default RegistrationModal