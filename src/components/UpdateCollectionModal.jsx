import React, { useState, useEffect } from 'react';
import { saveCollection, updateCollection } from '../api/collections'; // Adjust the path as necessary
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';

function UpdateCollectionModal({ show, onHide, currentCollection, setCollections, collections, setCurrentCollection, onSuccess }) {
    const { t } = useTranslation();
    const [projectName, setProjectName] = useState('');
    const [projectManagerMobile, setProjectManagerMobile] = useState('');
    const [accountingManagerMobile, setAccountingManagerMobile] = useState('');
    const [email, setEmail] = useState('');
    const [lastExecutionDate, setLastExecutionDate] = useState(null);
    const [agreedPaymentDate, setAgreedPaymentDate] = useState(null);
    const [contactPerson, setContactPerson] = useState('');
    const [debt, setDebt] = useState('');
    const [firstLineSentWhatsapp, setFirstLineSentWhatsapp] = useState('');
    const [details, setDetails] = useState('');
    const [secondLineSentEmailDetails, setSecondLineSentEmailDetails] = useState('');
    const [details2, setDetails2] = useState('');
    const [call2Created, setCall2Created] = useState('');
    const [collectedAmount, setCollectedAmount] = useState('');
    const [remainingAmountToCollect, setRemainingAmountToCollect] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [collectionContact, setCollectionContact] = useState('');
    const [cumulativeOffset, setCumulativeOffset] = useState('');
    const [offsetInsteadOfGuarantee, setOffsetInsteadOfGuarantee] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [lastConnection, setLastConnection] = useState('');
    const [retention5, setRetention5] = useState('');
    const [lastInvoiceIssuanceDate, setLastInvoiceIssuanceDate] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentCollection) {
            setProjectName(currentCollection.project_name || '');
            setProjectManagerMobile(currentCollection.project_manager_mobile || '');
            setAccountingManagerMobile(currentCollection.accounting_manager_mobile || '');
            setEmail(currentCollection.email || '');
            setLastExecutionDate(currentCollection.last_execution_date || null);
            setAgreedPaymentDate(currentCollection.agreed_payment_date || null);
            setContactPerson(currentCollection.contact_person || '');
            setDebt(currentCollection.debt || '');
            setFirstLineSentWhatsapp(currentCollection.first_line_sent_whatsapp || '');
            setDetails(currentCollection.details || '');
            setSecondLineSentEmailDetails(currentCollection.second_line_sent_email_details || '');
            setDetails2(currentCollection.details_2 || '');
            setCall2Created(currentCollection.call_2_created || '');
            setCollectedAmount(currentCollection.collected_amount || '');
            setRemainingAmountToCollect(currentCollection.remaining_amount_to_collect || '');
            setCompanyName(currentCollection.company_name || '');
            setCollectionContact(currentCollection.collection_contact || '');
            setCumulativeOffset(currentCollection.cumulative_offset || '');
            setOffsetInsteadOfGuarantee(currentCollection.offset_instead_of_guarantee || '');
            setPaymentStatus(currentCollection.payment_status || '');
            setLastConnection(currentCollection.last_connection || '');
            setRetention5(currentCollection.retention_5 || '');
            setLastInvoiceIssuanceDate(currentCollection.last_invoice_issuance_date || '');


        }
    }, [currentCollection]);

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
            company_name: companyName,
            cumulative_offset: cumulativeOffset,
            offset_instead_of_guarantee: offsetInsteadOfGuarantee,
            payment_status: paymentStatus,
            collection_contact: collectionContact,
            last_connection: lastConnection,
            retention_5: retention5,
            last_invoice_issuance_date: lastInvoiceIssuanceDate,
        };

        try {
            let response;
            if (currentCollection) {
                collection.id = currentCollection.id;
                response = await updateCollection(collection);
            } else {
                response = await saveCollection(collection);
            }

            // if (response.status === 200 || response.status === 201) {
            //     if (currentCollection) {
            //         setCollections(collections.map(col => col.id === response.data.id ? response.data : col));
            //     } else {
            //         setCollections([response.data, ...collections]);
            //     }
                onHide(); // Close the modal on successful response
                onSuccess(); // Call the success callback to refresh the table
            // } else {
                setErrors([response.data.message || 'An error occurred']);
            // }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(Object.values(error.response.data.errors).flat());
            } else {
                setErrors([error.message]);
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{currentCollection ? t('edit_collection') : t('create_collection')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    {/* Input fields with labels */}
                    <div className='col-md-6 p-2'>
                        <label>אחראי גבייה</label>
                        <select className='form-control' value={collectionContact} onChange={(e) => setCollectionContact(e.target.value)}>
                            <option value=''>אחראי גבייה</option>
                            <option value="מאיר">מאיר</option>
                            <option value="ניסים">ניסים</option>
                        </select>
                        {errors.collectionContact && <div className="text-danger small">{errors.collectionContact.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('company_name')}</label>
                        <input type="text" className='form-control' placeholder={t('company_name')} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('project_name')}</label>
                        <input type="text" className='form-control' placeholder={t('project_name')} value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('project_manager_mobile')}</label>
                        <input type="text" className='form-control' placeholder={t('project_manager_mobile')} value={projectManagerMobile} onChange={(e) => setProjectManagerMobile(e.target.value)} />
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('accounting_manager_mobile')}</label>
                        <input type="text" className='form-control' placeholder={t('accounting_manager_mobile')} value={accountingManagerMobile} onChange={(e) => setAccountingManagerMobile(e.target.value)} />
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('email')}</label>
                        <input type="email" className='form-control' placeholder={t('email')} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('last_execution_date')}</label>
                        <input type="date" className='form-control' placeholder={t('last_execution_date')} value={lastExecutionDate || ''} onChange={(e) => setLastExecutionDate(e.target.value)} />
                        {errors.last_execution_date && <div className="text-danger small">{errors.last_execution_date.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('agreed_payment_date')}</label>
                        <input type="date" className='form-control' placeholder={t('agreed_payment_date')} value={agreedPaymentDate || ''} onChange={(e) => setAgreedPaymentDate(e.target.value)} />
                        {errors.agreed_payment_date && <div className="text-danger small">{errors.agreed_payment_date.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>תאריך הוצאת חשבונית אחרון</label>
                        <input type="date" className='form-control' placeholder="הכנס תאריך" value={lastInvoiceIssuanceDate || ''} onChange={(e) => setLastInvoiceIssuanceDate(e.target.value)} />
                        {errors.lastInvoiceIssuanceDate && <div className="text-danger small">{errors.lastInvoiceIssuanceDate.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('contact_person')}</label>
                        <input type="text" className='form-control' placeholder={t('contact_person')} value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                        {errors.contact_person && <div className="text-danger small">{errors.contact_person.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>עכבון 5%</label>
                        <input type="text" className='form-control' placeholder='עכבון 5%' value={retention5} onChange={(e) => setRetention5(e.target.value)} />
                        {errors.contact_person && <div className="text-danger small">{errors.retention_5.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('debt')}</label>
                        <input type="number" className='form-control' placeholder={t('debt')} value={debt} onChange={(e) => setDebt(e.target.value)} />
                        {errors.debt && <div className="text-danger small">{errors.debt.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('first_line_sent_whatsapp')}</label>
                        <input type="text" className='form-control' placeholder={t('first_line_sent_whatsapp')} value={firstLineSentWhatsapp} onChange={(e) => setFirstLineSentWhatsapp(e.target.value)} />
                        {errors.first_line_sent_whatsapp && <div className="text-danger small">{errors.first_line_sent_whatsapp.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('details')}</label>
                        <textarea className='form-control' style={{ height: 130 }} placeholder={t('details')} value={details} onChange={(e) => setDetails(e.target.value)} />
                        {errors.details && <div className="text-danger small">{errors.details.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('second_line_sent_email_details')}</label>
                        <textarea className='form-control' style={{ height: 130 }} placeholder={t('second_line_sent_email_details')} value={secondLineSentEmailDetails} onChange={(e) => setSecondLineSentEmailDetails(e.target.value)} />
                        {errors.second_line_sent_email_details && <div className="text-danger small">{errors.second_line_sent_email_details.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('details_2')}</label>
                        <textarea  className='form-control' style={{ height: 130 }} placeholder={t('details_2')} value={details2} onChange={(e) => setDetails2(e.target.value)} />
                        {errors.details_2 && <div className="text-danger small">{errors.details_2.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('call_2_created')}</label>
                        <input type="text" className='form-control' placeholder={t('call_2_created')} value={call2Created} onChange={(e) => setCall2Created(e.target.value)} />
                        {errors.call_2_created && <div className="text-danger small">{errors.call_2_created.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('collected_amount')}</label>
                        <input type="number" className='form-control' placeholder={t('collected_amount')} value={collectedAmount} onChange={(e) => setCollectedAmount(e.target.value)} />
                        {errors.collected_amount && <div className="text-danger small">{errors.collected_amount.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('remaining_amount_to_collect')}</label>
                        <input type="number" className='form-control' placeholder={t('remaining_amount_to_collect')} value={remainingAmountToCollect} onChange={(e) => setRemainingAmountToCollect(e.target.value)} />
                        {errors.remaining_amount_to_collect && <div className="text-danger small">{errors.remaining_amount_to_collect.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('cumulative_offset')}</label>
                        <input type="text" className='form-control' placeholder={t('cumulative_offset')} value={cumulativeOffset} onChange={(e) => setCumulativeOffset(e.target.value)} />
                        {errors.cumulative_offset && <div className="text-danger small">{errors.cumulative_offset.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('offset_instead_of_guarantee')}</label>
                        <input type="text" className='form-control' placeholder={t('offset_instead_of_guarantee')} value={offsetInsteadOfGuarantee} onChange={(e) => setOffsetInsteadOfGuarantee(e.target.value)} />
                        {errors.offset_instead_of_guarantee && <div className="text-danger small">{errors.offset_instead_of_guarantee.join(', ')}</div>}
                    </div>
                    <div className='col-md-6 p-2'>
                        <label>{t('payment_status')}</label>
                        <select className='form-control' value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                            <option value=''>{t('select_payment_status')}</option>
                            <option value="צ'ק">{t('check')}</option>
                            <option value="מזומן">{t('cash')}</option>
                            <option value="העברה בנקאית">{t('transfer')}</option>
                        </select>
                        {errors.payment_status && <div className="text-danger small">{errors.payment_status.join(', ')}</div>}
                    </div>
                  
                    <div className='col-md-6 p-2'>
                        <label>{t('last_connection')}</label>
                        <textarea rows="3" className='form-control' placeholder={t('last_connection')} value={lastConnection} onChange={(e) => setLastConnection(e.target.value)} />
                        {errors.last_connection && <div className="text-danger small">{errors.last_connection.join(', ')}</div>}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>{currentCollection ? t('update') : t('save')}</Button>
                <Button variant="secondary" onClick={onHide}>{t('close')}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateCollectionModal;
