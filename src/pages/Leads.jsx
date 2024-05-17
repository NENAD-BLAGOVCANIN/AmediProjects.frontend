import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getLeads } from '../api/leads';
import { deleteLead } from '../api/leads';
import AddLeadModal from '../components/AddLeadModal';

function Leads({ leads, setLeads, contacts, setContacts }) {

    const [showAddLeadModal, setShowAddLeadModal] = useState(false);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const fetchedLeads = await getLeads();
                setLeads(fetchedLeads);
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };

        fetchLeads();
    }, []);

    const handleDeleteLead = async (lead_id) => {
        try {
            await deleteLead(lead_id);
            const updatedLeads = leads.filter(lead => lead.id !== lead_id);
            setLeads(updatedLeads);
        } catch (error) {
            console.error('Error deleting lead:', error);
        }
    };

    const openAddLeadModal = () => {
        setShowAddLeadModal(true);
    };

    return (
        <>
            <div className='d-flex justify-content-center pt-3 pb-4'>
                <button className='btn btn-basic bg-white shadow-sm medium' onClick={openAddLeadModal}><span className='text-primary'><FontAwesomeIcon icon={faPlus} className='pe-1' /> New Lead</span></button>
            </div>

            <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                <div className='table-responsive'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th className='text-secondary bg-transparent fw-500'>ID</th>
                                <th className='text-secondary bg-transparent fw-500'>Name</th>
                                <th className='text-secondary bg-transparent fw-500'>Email</th>
                                <th className='text-secondary bg-transparent fw-500'>Title</th>
                                <th className='text-secondary bg-transparent fw-500'>City</th>
                                <th className='text-secondary bg-transparent fw-500'>Address</th>
                                <th className='text-secondary bg-transparent fw-500'>Description</th>
                                <th className='text-secondary bg-transparent fw-500'>Lead Source</th>
                                <th className='text-secondary bg-transparent fw-500'>Past Client</th>
                                <th className='text-secondary bg-transparent fw-500'>Phone</th>
                                <th className='text-secondary bg-transparent fw-500'>Organization</th>
                                <th className='text-secondary bg-transparent fw-500'>Date Added</th>
                                <th className='text-secondary bg-transparent fw-500'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map(lead => (
                                <tr key={lead.id}>
                                    <td className='bg-transparent'>{lead.id}</td>
                                    <td className='bg-transparent'>{lead.contact.name}</td>
                                    <td className='bg-transparent'>{lead.contact.email}</td>
                                    <td className='bg-transparent'>{lead.contact.title}</td>
                                    <td className='bg-transparent'>{lead.contact.city}</td>
                                    <td className='bg-transparent'>{lead.contact.address}</td>
                                    <td className='bg-transparent'>{lead.contact.description}</td>
                                    <td className='bg-transparent'>{lead.contact.lead_source}</td>
                                    <td className='bg-transparent'>{lead.contact.past_client}</td>
                                    <td className='bg-transparent'>{lead.contact.phone}</td>
                                    <td className='bg-transparent'>{lead.contact.organization}</td>
                                    <td className='bg-transparent'>{lead.created_at}</td>
                                    <td className='bg-transparent'>
                                        <div className="h-100 d-flex align-items-center justify-content-center">
                                            <button className='btn btn-basic bg-gray text-danger shadow-sm' onClick={() => handleDeleteLead(lead.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddLeadModal
                leads={leads}
                setLeads={setLeads}
                showAddLeadModal={showAddLeadModal}
                setShowAddLeadModal={setShowAddLeadModal}
                contacts={contacts}
                setContacts={setContacts}
            />
        </>

    )
}

export default Leads;
