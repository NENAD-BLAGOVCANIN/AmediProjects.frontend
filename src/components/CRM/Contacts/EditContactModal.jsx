import React, { useState, useEffect } from 'react';
import { updateContact } from '../../../api/contacts';
import { useTranslation } from 'react-i18next';

function EditContactModal({ contacts, setContacts, showEditContactsModal, setShowEditContactsModal, selectedContact, setSelectedContact }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [organization, setOrganization] = useState('');
    const [description, setDescription] = useState('');
    const [pastClient, setPastClient] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (selectedContact) {
            setName(selectedContact.name || '');
            setEmail(selectedContact.email || '');
            setTitle(selectedContact.title || '');
            setCity(selectedContact.city || '');
            setAddress(selectedContact.address || '');
            setOrganization(selectedContact.organization || '');
            setDescription(selectedContact.description || '');
            setPastClient(selectedContact.pastClient || false);
        }
    }, [selectedContact]);

    const handleCloseEditContactsModal = () => {
        setShowEditContactsModal(false);
    };

    const handleSubmit = async () => {
        const contact = {
            "id": selectedContact.id,
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
            const updatedContact = await updateContact(contact);
            setSelectedContact(updatedContact);

            const updatedContacts = contacts.map(contact =>
                contact.id === updatedContact.id ? updatedContact : contact
            );
            setContacts(updatedContacts);

            setShowEditContactsModal(false);
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <>
            <div className={`modal fade ${showEditContactsModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h4 className="modal-title bold m-0">Edit Contact</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseEditContactsModal} style={{ fontSize: '25pt', fontWeight: '300' }}>
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
                            <button className='btn btn-primary rounded' onClick={handleSubmit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditContactModal;
