import React, { useState } from 'react';
import { saveContact } from '../../api/contacts'; // Ensure this path is correct
import { useTranslation } from 'react-i18next';

function AddContactModal({ contacts, setContacts, showAddContactModal, setShowAddContactModal }) {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [organization, setOrganization] = useState('');
    const [errors, setErrors] = useState([]);

    const handleCloseAddContactModal = () => {
        setShowAddContactModal(false);
    };

    const handleSubmit = async () => {
        const contact = {
            name,
            email,
            title,
            city,
            address,
            phone,
            organization,
        };

        try {
            const newContact = await saveContact(contact);
            setContacts([newContact, ...contacts]);
            setShowAddContactModal(false);

            setName('');
            setEmail('');
            setTitle('');
            setCity('');
            setAddress('');
            setPhone('');
            setOrganization('');
            setErrors([]);
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <>
            <div className={`modal fade ${showAddContactModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h4 className="modal-title bold m-0">{t('Add Contact')}</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseAddContactModal} style={{ fontSize: '25pt', fontWeight: '300' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder={t('Name')} value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="email" className='form-control' placeholder={t('Email')} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder={t('Title')} value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder={t('City')} value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder={t('Address')} value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder={t('Phone')} value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <input type="text" className='form-control' placeholder={t('Organization')} value={organization} onChange={(e) => setOrganization(e.target.value)} />
                                </div>
                                {errors && (
                                    <div className="text-danger small">
                                        {errors.map((errorMessage, index) => (
                                            <span key={index}>{errorMessage}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='modal-footer border-0'>
                            <button className='btn btn-primary rounded' onClick={handleSubmit}>{t('Save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddContactModal;
