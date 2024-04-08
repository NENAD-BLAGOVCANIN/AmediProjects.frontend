import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { getUsers } from '../../api/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import RegistrationModal from '../../components/RegistrationModal';

function Users() {

    const [users, setUsers] = useState([]);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchUsers();
    }, []);

    const openRegistrationModal = () => {
        setShowRegistrationModal(true);
    }

    return (
        <div className='main-content-wrapper'>

            <Sidebar />

            <div className='w-100 overflow-auto'>

                <Header pageTitle="Users" />

                <div className='main-container'>

                    <div className='d-flex justify-content-center pt-3 pb-4'>
                        <button className='btn btn-basic shadow-sm' onClick={openRegistrationModal}><span className='text-primary'><FontAwesomeIcon icon={faPlus} className='pe-1' /> Register new user</span></button>
                    </div>

                    <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
                        <div className='table-responsive'>
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            <RegistrationModal
                showRegistrationModal={showRegistrationModal}
                setShowRegistrationModal={setShowRegistrationModal}
                users={users} 
                setUsers={setUsers}
            />

        </div>
    )
}

export default Users