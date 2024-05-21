import React from 'react'
import { useTranslation } from 'react-i18next';

function ViewUserModal({ showViewUserModal, setShowViewUserModal, selectedUser }) {

    const handleCloseAddContactsModal = () => {
        setShowViewUserModal(false);
    };

    return (
        <>
            <div className={`modal fade ${showViewUserModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h4 className="modal-title bold m-0">{selectedUser.name}</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseAddContactsModal} style={{ fontSize: '25pt', fontWeight: '300' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body'>

                            <p className='text-muted'>
                                {selectedUser.description}
                            </p>

                            <div className='row py-3'>
                                <div className='col-md-6 p-2'>
                                    <span className='fw-500'>Name: </span>
                                    <span>
                                        {selectedUser.name}
                                    </span>
                                </div>
                                <div className='col-md-6 p-2'>
                                    <span className='fw-500'>Email: </span>
                                    <span>
                                        {selectedUser.email}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewUserModal