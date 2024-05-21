import React, { useState } from 'react'
import { register } from '../api/register';
import { useTranslation } from 'react-i18next';

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
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 650, padding: '1.7rem' }}>
                <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 650, overflow: 'auto' }}>
                    <div className="modal-header pb-0 border-0 d-flex align-items-center">
                        <div>
                            <h5 className="modal-title bold m-0">Create new user</h5>
                        </div>
                        <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseRegistrationModal} style={{ fontSize: '23pt', fontWeight: '300' }}>
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className='modal-body'>
                        {error && <span className='text-danger small'>{error}</span>} { }

                        <form onSubmit={handleSubmit}>

                            <div className='py-2'>
                                <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className='form-control py-3 border-0' style={{ backgroundColor: '#EBE9F9' }} placeholder='Persons Name' />
                            </div>
                            <div className='py-2'>
                                <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control py-3 border-0' style={{ backgroundColor: '#EBE9F9' }} placeholder='Persons Email Address' />
                            </div>
                            <div className='py-2'>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' className='form-control py-3 border-0' style={{ backgroundColor: '#EBE9F9' }} placeholder='Initial password' />
                            </div>
                            <div className='py-2'>
                                <button type="submit" className='btn btn-primary w-100 py-3 border-0 fw-500' style={{ backgroundColor: '#EBE9F9' }}>Create</button>
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