import React, { useEffect } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveLead } from '../api/leads';
import { getContacts } from '../api/contacts';

function AddLeadModal({ leads, setLeads, showAddLeadModal, setShowAddLeadModal, contacts, setContacts }) {

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const fetchedContacts = await getContacts();
                setContacts(fetchedContacts);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchContacts();
    }, []);

    const handleCloseAddLeadModal = () => {
        setShowAddLeadModal(false);
    };

    const handleAddLead = async (contact) => {
        try {
            const newLead = await saveLead(contact.id);
            const updatedLeads = [newLead, ...leads];
            setLeads(updatedLeads);
            setShowAddLeadModal(false);
        } catch (error) {
            console.log("Error while trying to add a lead.");
        }
    }

    return (
        <>
            <div className={`modal fade ${showAddLeadModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg">
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h4 className="modal-title bold m-0">Add Lead</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseAddLeadModal} style={{ fontSize: '25pt', fontWeight: '300' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body' style={{ maxHeight: 520, overflow: 'auto' }}>
                            <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                                <div className='table-responsive'>
                                    <table className='table table-striped table-hover'>
                                        <tbody>
                                            {contacts.map(contact => (
                                                <tr key={contact.id}>
                                                    <td>{contact.name}</td>
                                                    <td>{contact.email}</td>
                                                    <td>
                                                        <div className="h-100 d-flex align-items-center justify-content-center">
                                                            <div className='px-1'>
                                                                <button className='btn btn-basic bg-gray shadow-sm' onClick={() => { handleAddLead(contact) }}>
                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer border-0'>
                            <button className='btn btn-primary rounded'>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddLeadModal