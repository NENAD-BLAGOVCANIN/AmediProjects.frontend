import React, { useState, useEffect } from 'react';
import { saveCollection, updateCollection } from '../api/collections';
import { useTranslation } from 'react-i18next';

function UpdateCollectionModal({ collections, setCollections, showUpdateCollectionModal, setShowUpdateCollectionModal, currentCollection, setCurrentCollection }) {
    const { t } = useTranslation();
    const [projectName, setProjectName] = useState('');
    const [projectManagerMobile, setProjectManagerMobile] = useState('');
    const [accountingManagerMobile, setAccountingManagerMobile] = useState('');
    const [email, setEmail] = useState('');
    const [lastExecutionDate, setLastExecutionDate] = useState('');
    const [agreedPaymentDate, setAgreedPaymentDate] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [debt, setDebt] = useState('');
    const [firstLineSentWhatsapp, setFirstLineSentWhatsapp] = useState('');
    const [details, setDetails] = useState('');
    const [secondLineSentEmailDetails, setSecondLineSentEmailDetails] = useState('');
    const [details2, setDetails2] = useState('');
    const [call2Created, setCall2Created] = useState('');
    const [collectedAmount, setCollectedAmount] = useState('');
    const [remainingAmountToCollect, setRemainingAmountToCollect] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentCollection) {
            setProjectName(currentCollection.project_name || '');
            setProjectManagerMobile(currentCollection.project_manager_mobile || '');
            setAccountingManagerMobile(currentCollection.accounting_manager_mobile || '');
            setEmail(currentCollection.email || '');
            setLastExecutionDate(currentCollection.last_execution_date || '');
            setAgreedPaymentDate(currentCollection.agreed_payment_date || '');
            setContactPerson(currentCollection.contact_person || '');
            setDebt(currentCollection.debt || '');
            setFirstLineSentWhatsapp(currentCollection.first_line_sent_whatsapp || '');
            setDetails(currentCollection.details || '');
            setSecondLineSentEmailDetails(currentCollection.second_line_sent_email_details || '');
            setDetails2(currentCollection.details_2 || '');
            setCall2Created(currentCollection.call_2_created || '');
            setCollectedAmount(currentCollection.collected_amount || '');
            setRemainingAmountToCollect(currentCollection.remaining_amount_to_collect || '');
        }
    }, [currentCollection]);

    const handleCloseUpdateCollectionModal = () => {
        setShowUpdateCollectionModal(false);
        setCurrentCollection(null);
        setErrors([]);
    };

    const handleSubmit = async () => {
        const collection = {
            project_name: projectName,
            project_manager_mobile: projectManagerMobile,
            accounting_manager_mobile: accountingManagerMobile,
            email,
            last_execution_date: lastExecutionDate,
            agreed_payment_date: agreedPaymentDate,
            contact_person: contactPerson,
            debt,
            first_line_sent_whatsapp: firstLineSentWhatsapp,
            details,
            second_line_sent_email_details: secondLineSentEmailDetails,
            details_2: details2,
            call_2_created: call2Created,
            collected_amount: collectedAmount,
            remaining_amount_to_collect: remainingAmountToCollect,
        };

        try {
            let updatedCollection;
            if (currentCollection) {
                collection.id = currentCollection.id;
                updatedCollection = await updateCollection(collection);
                setCollections(collections.map(col => col.id === updatedCollection.id ? updatedCollection : col));
            } else {
                updatedCollection = await saveCollection(collection);
                setCollections([updatedCollection, ...collections]);
            }
            handleCloseUpdateCollectionModal();
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <>
            <div className={`modal fade ${showUpdateCollectionModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h4 className="modal-title bold m-0">{currentCollection ? 'עריכת גבייה' : 'יצירת גבייה'}</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseUpdateCollectionModal} style={{ fontSize: '25pt', fontWeight: '300' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='שם פרוייקט' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='נייד מנהל פרוייקט' value={projectManagerMobile} onChange={(e) => setProjectManagerMobile(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='נייד מנהל חשבונות' value={accountingManagerMobile} onChange={(e) => setAccountingManagerMobile(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="email" className='form-control' placeholder='אימייל' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="date" className='form-control' placeholder='תאריך ביצוע אחרון' value={lastExecutionDate} onChange={(e) => setLastExecutionDate(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="date" className='form-control' placeholder='מועד תשלום מוסכם' value={agreedPaymentDate} onChange={(e) => setAgreedPaymentDate(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='איש קשר' value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="number" className='form-control' placeholder='חוב' value={debt} onChange={(e) => setDebt(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='נשלח קו ראשון- וואטסאפ' value={firstLineSentWhatsapp} onChange={(e) => setFirstLineSentWhatsapp(e.target.value)} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <textarea className='form-control' style={{height: 130}} placeholder='פירוט' value={details} onChange={(e) => setDetails(e.target.value)} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <textarea className='form-control' style={{height: 130}} placeholder='נשלח מייל- קו שני מייל' value={secondLineSentEmailDetails} onChange={(e) => setSecondLineSentEmailDetails(e.target.value)} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <textarea className='form-control' style={{height: 130}} placeholder='פירוט 2' value={details2} onChange={(e) => setDetails2(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='נוצרה שיחה 2' value={call2Created} onChange={(e) => setCall2Created(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="number" className='form-control' placeholder='מה נגבה' value={collectedAmount} onChange={(e) => setCollectedAmount(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="number" className='form-control' placeholder='מה נותר לגבייה' value={remainingAmountToCollect} onChange={(e) => setRemainingAmountToCollect(e.target.value)} />
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
                            <button className='btn btn-primary rounded' onClick={handleSubmit}>{currentCollection ? 'Update' : 'Save'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateCollectionModal;
