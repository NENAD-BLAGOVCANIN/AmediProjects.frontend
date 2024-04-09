import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faBars, faEdit } from '@fortawesome/free-solid-svg-icons';
import { getContacts } from '../api/contacts';
import AddContactModal from '../components/AddContactModal';
import EditContactModal from '../components/EditContactModal';
import { deleteContact } from '../api/contacts';
import ViewContactModal from '../components/ViewContactModal';

function Contacts({ contacts, setContacts, leads, setLeads }) {

    const [selectedContact, setSelectedContact] = useState([]);
    const [showAddContactsModal, setShowAddContactsModal] = useState(false);
    const [showEditContactsModal, setShowEditContactsModal] = useState(false);
    const [showViewContactModal, setShowViewContactModal] = useState(false);

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

    const openAddContactModal = () => {
        setShowAddContactsModal(true);
    };

    const handleDeleteContact = async (contact_id) => {
        try {
            await deleteContact(contact_id);
            const updatedContacts = contacts.filter(contact => contact.id !== contact_id);
            setContacts(updatedContacts);
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const openViewContactModal = (contact) => {
        setSelectedContact(contact);
        setShowViewContactModal(true);
    };

    
    const openEditContactModal = (contact) => {
        setShowEditContactsModal(true);
        setSelectedContact(contact);
    }


    return (
        <div className='main-content-wrapper'>

            <Sidebar />

            <div className='w-100 overflow-auto'>

                <Header pageTitle="Contacts" />

                <div className='main-container'>

                    <div className='d-flex justify-content-center pt-3 pb-4'>
                        <button className='btn btn-basic shadow-sm' onClick={openAddContactModal}><span className='text-primary'><FontAwesomeIcon icon={faPlus} className='pe-1' /> New Contact</span></button>
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
                                        <th>Phone</th>
                                        <th>Organization</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map(contact => (
                                        <tr key={contact.id}>
                                            <td>{contact.id}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.title}</td>
                                            <td>{contact.city}</td>
                                            <td>{contact.address}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.organization}</td>
                                            <td>
                                                <div className="h-100 d-flex align-items-center justify-content-center">
                                                    <div className='px-1'>
                                                        <button className='btn btn-basic bg-gray-light shadow-sm' onClick={() => openViewContactModal(contact)}>
                                                            <FontAwesomeIcon icon={faBars} />
                                                        </button>
                                                    </div>
                                                    <div className='px-1'>
                                                        <button className='btn btn-basic bg-gray-light shadow-sm' onClick={() => openEditContactModal(contact)}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                    </div>
                                                    <div className='px-1'>
                                                        <button className='btn btn-basic bg-gray-light text-danger shadow-sm' onClick={() => handleDeleteContact(contact.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
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
            </div>

            <AddContactModal
                contacts={contacts}
                setContacts={setContacts}
                showAddContactsModal={showAddContactsModal}
                setShowAddContactsModal={setShowAddContactsModal}
            />

            <EditContactModal
                contacts={contacts}
                setContacts={setContacts}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                showEditContactsModal={showEditContactsModal}
                setShowEditContactsModal={setShowEditContactsModal}
            />

            <ViewContactModal
                showViewContactModal={showViewContactModal}
                setShowViewContactModal={setShowViewContactModal}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                leads={leads}
                setLeads={setLeads}
            />

        </div>
    )
}

export default Contacts;
