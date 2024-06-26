import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header/Header'
import { getUsers } from '../../api/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faBars, faEdit } from '@fortawesome/free-solid-svg-icons';
import RegistrationModal from '../../components/RegistrationModal';
import ViewUserModal from '../../components/ViewUserModal';
import { deleteUser } from '../../api/user';
import { useTranslation } from 'react-i18next';

function Users() {

    const [users, setUsers] = useState([]);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [showViewUserModal, setShowViewUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);

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

    const openViewUserModal = (contact) => {
        setSelectedUser(contact);
        setShowViewUserModal(true);
    };

    const handleDeleteUser = async (user_id) => {
        try {
            await deleteUser(user_id);
            const updatedUsers = users.filter(user => user.id !== user_id);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
      <>
      <div className="container">

        <div className="d-flex justify-content-center pt-3  pb-4">
          <button
            className="btn btn-basic bg-white shadow-sm medium"
            onClick={openRegistrationModal}
          >
            <span className="text-primary">
              <FontAwesomeIcon icon={faPlus} className="pe-1" /> Register new
              user
            </span>
          </button>
        </div>

        <div
          className="m-auto d-block w-100"
          style={{ maxWidth: 1500, overflowX: "auto" }}
        >
          <div className="table-responsive bg-white">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className="text-secondary bg-transparent fw-500">ID</th>
                  <th className="text-secondary bg-transparent fw-500">Name</th>
                  <th className="text-secondary bg-transparent fw-500">
                    Email
                  </th>
                  <th className="text-secondary bg-transparent fw-500">Role</th>
                  <th className="text-center text-secondary bg-transparent fw-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge badge-primary bg-success">
                        {user?.role?.name}
                      </span>
                    </td>
                    <td>
                      <div className="h-100 d-flex align-items-center justify-content-center">
                        <div className="px-1">
                          <button
                            className="btn btn-basic bg-gray-light"
                            onClick={() => openViewUserModal(user)}
                          >
                            <FontAwesomeIcon icon={faBars} />
                          </button>
                        </div>
                        <div className="px-1">
                          <button className="btn btn-basic bg-gray-light">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </div>
                        <div className="px-1">
                          <button
                            className="btn btn-basic bg-gray-light text-danger"
                            onClick={() => handleDeleteUser(user.id)}
                          >
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
        <RegistrationModal
          showRegistrationModal={showRegistrationModal}
          setShowRegistrationModal={setShowRegistrationModal}
          users={users}
          setUsers={setUsers}
        />

        <ViewUserModal
          showViewUserModal={showViewUserModal}
          setShowViewUserModal={setShowViewUserModal}
          selectedUser={selectedUser}
        />
      </div>

      </>
    );
}

export default Users