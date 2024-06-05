import React, { useState } from 'react';
import { saveProject } from '../api/project';
import { useTranslation } from 'react-i18next';

function UpdateProjectModal({ projects, setProjects, showUpdateProjectModal, setShowUpdateProjectModal }) {
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

    const handleCloseUpdateProjectModal = () => {
        setShowUpdateProjectModal(false);
    };

    const handleSubmit = async () => {
        const project = {
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
            const newProject = await saveProject(project);
            setProjects([newProject, ...projects]);
            setShowUpdateProjectModal(false);

            setProjectName('');
            setProjectManagerMobile('');
            setAccountingManagerMobile('');
            setEmail('');
            setLastExecutionDate('');
            setAgreedPaymentDate('');
            setContactPerson('');
            setDebt('');
            setFirstLineSentWhatsapp('');
            setDetails('');
            setSecondLineSentEmailDetails('');
            setDetails2('');
            setCall2Created('');
            setCollectedAmount('');
            setRemainingAmountToCollect('');
            setErrors([]);

        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <>
            <div className={`modal fade ${showUpdateProjectModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h4 className="modal-title bold m-0">Update Project</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseUpdateProjectModal} style={{ fontSize: '25pt', fontWeight: '300' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Project Name' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Project Manager Mobile' value={projectManagerMobile} onChange={(e) => setProjectManagerMobile(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Accounting Manager Mobile' value={accountingManagerMobile} onChange={(e) => setAccountingManagerMobile(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="email" className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="date" className='form-control' placeholder='Last Execution Date' value={lastExecutionDate} onChange={(e) => setLastExecutionDate(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="date" className='form-control' placeholder='Agreed Payment Date' value={agreedPaymentDate} onChange={(e) => setAgreedPaymentDate(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Contact Person' value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="number" className='form-control' placeholder='Debt' value={debt} onChange={(e) => setDebt(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='First Line Sent Whatsapp' value={firstLineSentWhatsapp} onChange={(e) => setFirstLineSentWhatsapp(e.target.value)} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <textarea className='form-control' style={{height: 130}} placeholder='Details' value={details} onChange={(e) => setDetails(e.target.value)} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <textarea className='form-control' style={{height: 130}} placeholder='Second Line Sent Email Details' value={secondLineSentEmailDetails} onChange={(e) => setSecondLineSentEmailDetails(e.target.value)} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <textarea className='form-control' style={{height: 130}} placeholder='Details 2' value={details2} onChange={(e) => setDetails2(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Call 2 Created' value={call2Created} onChange={(e) => setCall2Created(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="number" className='form-control' placeholder='Collected Amount' value={collectedAmount} onChange={(e) => setCollectedAmount(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="number" className='form-control' placeholder='Remaining Amount to Collect' value={remainingAmountToCollect} onChange={(e) => setRemainingAmountToCollect(e.target.value)} />
                                </div>

                                {errors && (
                                    <div className="text-danger small">
                                        {errors.description && errors.description.map((errorMessage, index) => (
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

export default UpdateProjectModal;
