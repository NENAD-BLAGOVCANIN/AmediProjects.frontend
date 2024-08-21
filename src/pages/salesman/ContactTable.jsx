import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteContact } from '../../api/contacts';
import { useTranslation } from 'react-i18next';

function ContactTable({ contacts, setContacts, onEditContact, onAddContact }) {
    const { t } = useTranslation();
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        setFilteredContacts(contacts);
    }, [contacts]);

    useEffect(() => {
        const results = contacts.filter(contact =>
            Object.values(contact).some(
                value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredContacts(results);
    }, [searchTerm, contacts]);

    const handleDeleteContact = async (contact_id) => {
        try {
            await deleteContact(contact_id);
            const updatedContacts = contacts.filter(contact => contact.id !== contact_id);
            setContacts(updatedContacts);
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

    return (
        <div className="container">
            <div className="d-flex justify-content-center pt-3 pb-4">
                <button className="btn btn-basic bg-white shadow-sm medium" onClick={onAddContact}>
                    <span className="text-primary">
                        <FontAwesomeIcon icon={faPlus} className="pe-1" /> {t('Add Contact')}
                    </span>
                </button>
            </div>
            <input 
                type="text" 
                placeholder="חיפוש "
                value={searchTerm} 
                onChange={handleSearch} 
                className="form-control my-3 border border-primary" 
            />
            <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
                <h6 className="bold mb-3">אנשי קשר</h6>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="text-secondary bg-transparent fw-500">{t('Name')}</th>
                            <th className="text-secondary bg-transparent fw-500">{t('Email')}</th>
                            <th className="text-secondary bg-transparent fw-500">{t('Title')}</th>
                            <th className="text-secondary bg-transparent fw-500">{t('City')}</th>
                            <th className="text-secondary bg-transparent fw-500">{t('Status')}</th>
                            <th className="text-secondary bg-transparent fw-500">{t('Phone')}</th>
                            <th className="text-secondary bg-transparent fw-500">{t('Organization')}</th>
                            <th className="text-center text-secondary bg-transparent fw-500">{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(contact => (
                            <tr key={contact.id}>
                                <td className="bg-transparent">{contact.name}</td>
                                <td className="bg-transparent">{contact.email}</td>
                                <td className="bg-transparent">{contact.title}</td>
                                <td className="bg-transparent">{contact.city}</td>
                                <td className="bg-transparent">{contact.status}</td>
                                <td className="bg-transparent">{contact.phone}</td>
                                <td className="bg-transparent">{contact.organization}</td>
                                <td className="bg-transparent">
                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                        <div className="px-1">
                                            <button className="btn btn-basic" onClick={() => onEditContact(contact)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </div>
                                        <div className="px-1">
                                            <button className="btn btn-basic text-danger" onClick={() => handleDeleteContact(contact.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex flex-column justify-content-between mb-3">
                    <div className="col-md-3 ml-1">
                        <label>{t('Items per page')}</label>
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="form-select">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                    </div>
                    <label className="mr-2 mt-2">{t('Navigate pages')}</label>
                    <div className="d-flex flex-row col-md-8 mt-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactTable;
