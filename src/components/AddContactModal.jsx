import React, { useState } from 'react';
import { saveContact } from '../api/contacts';

function AddContactModal({ contacts, setContacts, showAddContactsModal, setShowAddContactsModal }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [organization, setOrganization] = useState('');
    const [description, setDescription] = useState('');
    const [pastClient, setPastClient] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleCloseAddContactsModal = () => {
        setShowAddContactsModal(false);
    };

    const handleSubmit = async () => {
        const contact = {
            "name": name,
            "email": email,
            "title": title,
            "city": city,
            "address": address,
            "organization": organization,
            "description": description,
            "pastClient": pastClient
        };

        try {
            const newContact = await saveContact(contact);
            setContacts([newContact, ...contacts]);
            setShowAddContactsModal(false);
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <>
            <div className={`modal fade ${showAddContactsModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h4 className="modal-title bold m-0">Add Contact</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseAddContactsModal} style={{ fontSize: '25pt', fontWeight: '100' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Organization' value={organization} onChange={(e) => setOrganization(e.target.value)} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <textarea type="text" className='form-control' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="checkbox" className='form-check-input text-muted' checked={pastClient} onChange={(e) => setPastClient(e.target.checked)} /> <label className='form-check-label text-muted'>Past Client</label>
                                </div>

                                {errors && (
                                    <div className="text-danger small">
                                        {errors.email && errors.email.map((errorMessage, index) => (
                                            <span key={index}>{errorMessage}</span>
                                        ))}
                                        {errors.name && errors.name.map((errorMessage, index) => (
                                            <span key={index}>{errorMessage}</span>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className='modal-footer border-0'>
                            <button className='btn btn-primary rounded' onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddContactModal;
