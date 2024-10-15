import React, { useState, useEffect } from 'react';
import { updateContact } from '../../api/contacts'; // Ensure this path is correct
import { saveTask } from '../../api/tasks'; // Import the saveTask function for task creation
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

function EditContactModal({ contacts, setContacts, selectedContact, setSelectedContact, showEditContactModal, setShowEditContactModal }) {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [status, setStatus] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [organization, setOrganization] = useState('');
    const [errors, setErrors] = useState([]);
    
    // Task-related states
    const [subject, setTaskSubject] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        if (selectedContact) {
            setName(selectedContact.name || '');
            setEmail(selectedContact.email || '');
            setTitle(selectedContact.title || '');
            setCity(selectedContact.city || '');
            setStatus(selectedContact.status || ''); // Ensure the status is set correctly
            setAddress(selectedContact.address || '');
            setPhone(selectedContact.phone || '');
            setOrganization(selectedContact.organization || '');
        }
    }, [selectedContact]);

    const handleCloseEditContactModal = () => {
        setShowEditContactModal(false);
    };

    const handleSubmitContact = async () => {
        const contact = {
            id: selectedContact.id,
            name,
            email,
            title,
            city,
            status: status || 'answer', // Default to 'answer' if status is empty
            address,
            phone,
            organization,
        };

        try {
            const updatedContact = await updateContact(contact);
            const updatedContacts = contacts.map(c => c.id === updatedContact.id ? updatedContact : c);
            setContacts(updatedContacts);
            setShowEditContactModal(false);
            setErrors([]);
        } catch (error) {
            setErrors(error.message);
        }
    };

    const handleSubmitTask = async () => {

        const task = {
            subject: subject,
            due_date: taskDueDate,
            description: taskDescription,
            email: email, // Using the contact's email
            phone: phone ,// Using the contact's phone
        };

        try {
            await saveTask(task );
            setTaskSubject('');
            setTaskDueDate('');
            setTaskDescription('');
            setErrors([]);
            setShowEditContactModal(false); // Close the modal after task creation
            toast.success('המשימה נוצרה'); // Show success toast
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <>
            <div className={`modal fade ${showEditContactModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h4 className="modal-title bold m-0">עריכת לקוח</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseEditContactModal} style={{ fontSize: '25pt', fontWeight: '300' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-6 p-2'>
                                    <label>שם</label>
                                    <input type="text" className='form-control' placeholder="שם" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <label>דואר אלקטרוני</label>
                                    <input type="email" className='form-control' placeholder="דואר אלקטרוני" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <label>תפקיד</label>
                                    <input type="text" className='form-control' placeholder="תפקיד" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <label>עיר</label>
                                    <input type="text" className='form-control' placeholder="עיר" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <label>סטטוס</label>
                                    <select className='form-control' name='status' value={status} onChange={e => setStatus(e.target.value)} >
                                        <option value=''>בחירת סטטוס</option>
                                        <option value='לא רלוונטי'>לא רלוונטי</option>
                                        <option value='לקוח פוטנציאלי'>לקוח פוטנציאלי</option>
                                        <option value='לקוח עם פרויקט'>לקוח עם פרויקט</option>
                                        <option value='לקוח במשא ומתן'>לקוח במשא ומתן</option>
                                    </select>
                                </div>
                                <div className='col-md-6 p-2'>
                                    <label>כתובת</label>
                                    <input type="text" className='form-control' placeholder="כתובת" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <label>טלפון</label>
                                    <input type="text" className='form-control' placeholder="טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <label>חברה</label>
                                    <input type="text" className='form-control' placeholder="חברה" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                                </div>
                                {errors && (
                                    <div className="text-danger small">
                                        {Array.isArray(errors) ? errors.map((errorMessage, index) => (
                                            <span key={index}>{errorMessage}</span>
                                        )) : <span>{errors}</span>}
                                    </div>
                                )}
                            </div>

                            <hr className="my-4" />

                            <h5>יצירת משימה חדשה</h5>
                            <div className='row'>
                                <div className='col-md-6 p-2'>
                                    <label>שם משימה</label>
                                    <input type="text" className='form-control' placeholder="שם משימה" value={subject} onChange={(e) => setTaskSubject(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <label>תאריך יעד</label>
                                    <input type="date" className='form-control' value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
                                </div>
                                <div className='col-12 p-2'>
                                    <label>פרטי משימה</label>
                                    <textarea className='form-control' placeholder="פרטי משימה" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer border-0'>
                            <button className='btn btn-primary rounded' onClick={handleSubmitContact}>שמירה</button>
                            <button className='btn btn-secondary rounded' onClick={handleSubmitTask}>יצירת משימה</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default EditContactModal;
