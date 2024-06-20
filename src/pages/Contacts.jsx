import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faBars, faEdit } from '@fortawesome/free-solid-svg-icons';
import { getContacts, deleteContact } from '../api/contacts';
import AddContactModal from '../components/CRM/Contacts/AddContactModal';
import EditContactModal from '../components/CRM/Contacts/EditContactModal';
import ViewContactModal from '../components/CRM/Contacts/ViewContactModal';
import { useTranslation } from 'react-i18next';

function Contacts({ contacts, setContacts, leads, setLeads }) {
    const { t } = useTranslation();
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContact, setSelectedContact] = useState([]);
    const [showAddContactsModal, setShowAddContactsModal] = useState(false);
    const [showEditContactsModal, setShowEditContactsModal] = useState(false);
    const [showViewContactModal, setShowViewContactModal] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const fetchedContacts = await getContacts();
                setContacts(fetchedContacts);
                setFilteredContacts(fetchedContacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        const results = contacts.filter(contact =>
            Object.values(contact).some(
                value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredContacts(results);
    }, [searchTerm, contacts]);

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
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center pt-3 pb-4">
                    <button className="btn btn-basic bg-white shadow-sm medium" onClick={openAddContactModal}>
                        <span className="text-primary"><FontAwesomeIcon icon={faPlus} className="pe-1" /> הוספת איש קשר חדש</span>
                    </button>
                </div>
                <input 
                    type="text" 
                    placeholder="חיפוש ברשימה" 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="form-control my-3 border border-primary" 
                />
                <div className="m-auto d-block w-100" style={{ maxWidth: 1500, overflowX: 'auto' }}>
                    <div className="table-responsive pt-3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-secondary bg-transparent fw-500">ID</th>
                                    <th className="text-secondary bg-transparent fw-500">Name</th>
                                    <th className="text-secondary bg-transparent fw-500">Email</th>
                                    <th className="text-secondary bg-transparent fw-500">Title</th>
                                    <th className="text-secondary bg-transparent fw-500">City</th>
                                    <th className="text-secondary bg-transparent fw-500">Address</th>
                                    <th className="text-secondary bg-transparent fw-500">Phone</th>
                                    <th className="text-secondary bg-transparent fw-500">Organization</th>
                                    <th className="text-center text-secondary bg-transparent fw-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map(contact => (
                                    <tr key={contact.id}>
                                        <td className="bg-transparent">{contact.id}</td>
                                        <td className="bg-transparent">{contact.name}</td>
                                        <td className="bg-transparent">{contact.email}</td>
                                        <td className="bg-transparent">{contact.title}</td>
                                        <td className="bg-transparent">{contact.city}</td>
                                        <td className="bg-transparent">{contact.address}</td>
                                        <td className="bg-transparent">{contact.phone}</td>
                                        <td className="bg-transparent">{contact.organization}</td>
                                        <td className="bg-transparent">
                                            <div className="h-100 d-flex align-items-center justify-content-center">
                                                <div className="px-1">
                                                    <button className="btn btn-basic " onClick={() => openViewContactModal(contact)}>
                                                        <FontAwesomeIcon icon={faBars} />
                                                    </button>
                                                </div>
                                                <div className="px-1">
                                                    <button className="btn btn-basic " onClick={() => openEditContactModal(contact)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </div>
                                                <div className="px-1">
                                                    <button className="btn btn-basic  text-danger" onClick={() => handleDeleteContact(contact.id)}>
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
        </>
    );
}

export default Contacts;
