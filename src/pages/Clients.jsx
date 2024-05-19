import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getClients } from '../api/clients';
import { deleteClient } from '../api/clients';
import AddClientModal from '../components/CRM/Clients/AddClientModal';

function Clients({ contacts, setContacts, clients, setClients }) {

    const [showAddClientModal, setShowAddClientModal] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const fetchedClients = await getClients();
                setClients(fetchedClients);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    const handleDeleteClient = async (client_id) => {
        try {
            await deleteClient(client_id);
            const updatedClients = clients.filter(client => client.id !== client_id);
            setClients(updatedClients);
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const openAddClientModal = () => {
        setShowAddClientModal(true);
    };

    return (
        <>
            <div className='d-flex justify-content-center pt-3 pb-4'>
                <button className='btn btn-basic bg-white shadow-sm medium' onClick={openAddClientModal}><span className='text-primary'><FontAwesomeIcon icon={faPlus} className='pe-1' /> New Client</span></button>
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
                                <th className='text-secondary bg-transparent fw-500'>Past Client</th>
                                <th className='text-secondary bg-transparent fw-500'>Phone</th>
                                <th className='text-secondary bg-transparent fw-500'>Organization</th>
                                <th className='text-secondary bg-transparent fw-500'>Date Added</th>
                                <th className='text-secondary bg-transparent fw-500'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td className='bg-transparent'>{client.id}</td>
                                    <td className='bg-transparent'>{client?.contact?.name}</td>
                                    <td className='bg-transparent'>{client?.contact?.email}</td>
                                    <td className='bg-transparent'>{client?.contact?.title}</td>
                                    <td className='bg-transparent'>{client?.contact?.city}</td>
                                    <td className='bg-transparent'>{client?.contact?.address}</td>
                                    <td className='bg-transparent'>{client?.contact?.description}</td>
                                    <td className='bg-transparent'>{client?.contact?.past_client}</td>
                                    <td className='bg-transparent'>{client?.contact?.phone}</td>
                                    <td className='bg-transparent'>{client?.contact?.organization}</td>
                                    <td className='bg-transparent'>{client?.created_at}</td>
                                    <td className='bg-transparent'>
                                        <div className="h-100 d-flex align-items-center justify-content-center">
                                            <button className='btn btn-basic bg-gray text-danger shadow-sm' onClick={() => handleDeleteClient(client.id)}>
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

            <AddClientModal
                clients={clients}
                setClients={setClients}
                showAddClientModal={showAddClientModal}
                setShowAddClientModal={setShowAddClientModal}
                contacts={contacts}
                setContacts={setContacts}
            />
        </>

    )
}

export default Clients;
