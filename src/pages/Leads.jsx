import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
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
            <div className='main-content-wrapper'>

                <Sidebar />

                <div className='w-100 overflow-auto'>

                    <Header pageTitle="Leads" />

                    <div className='main-container'>

                        <div className='d-flex justify-content-center pt-3 pb-4'>
                            <button className='btn btn-basic shadow-sm' onClick={openAddLeadModal}><span className='text-primary'><FontAwesomeIcon icon={faPlus} className='pe-1' /> New Lead</span></button>
                        </div>

                        <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                            <div className='table-responsive'>
                                <table className='table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Title</th>
                                            <th>City</th>
                                            <th>Address</th>
                                            <th>Description</th>
                                            <th>Lead Source</th>
                                            <th>Past Client</th>
                                            <th>Phone</th>
                                            <th>Organization</th>
                                            <th>Date Added</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leads.map(lead => (
                                            <tr key={lead.id}>
                                                <td>{lead.id}</td>
                                                <td>{lead.contact.name}</td>
                                                <td>{lead.contact.email}</td>
                                                <td>{lead.contact.title}</td>
                                                <td>{lead.contact.city}</td>
                                                <td>{lead.contact.address}</td>
                                                <td>{lead.contact.description}</td>
                                                <td>{lead.contact.lead_source}</td>
                                                <td>{lead.contact.past_client}</td>
                                                <td>{lead.contact.phone}</td>
                                                <td>{lead.contact.organization}</td>
                                                <td>{lead.created_at}</td>
                                                <td>
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

                    </div>
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
