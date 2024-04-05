import React, { useState, useEffect } from 'react'
import { saveProject } from '../api/project';

function CreateProjectModal({ showCreateProjectModal, setShowCreateProjectModal }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const handleCloseCreateProjectModal = () => {
        setShowCreateProjectModal(false);
    }

    const handleCreateProjectSubmit = async () => {

        try {
            await saveProject(name, description);
            window.location.reload();
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <>
            <div className={`modal fade ${showCreateProjectModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h5 className="modal-title bold m-0">
                                    Create Project
                                </h5>
                                <span className='text-muted small'>Project is a place where your project can organize contacts, leads and tasks</span>

                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseCreateProjectModal} style={{ fontSize: '25pt', fontWeight: '100' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body py-5'>
                            <label className='pb-2'>Name</label>
                            <input type="text" className='form-control bg-gray py-2 border-0' 
                                placeholder='Project name' value={name} autoComplete="new-password"
                                onChange={(e) => setName(e.target.value)} />

                            <label className='mt-4 mb-2'>Description</label>
                            <textarea type="text" className='form-control bg-gray py-2 border-0' 
                                placeholder='Project description' value={description} autoComplete="new-password"
                                onChange={(e) => setDescription(e.target.value)} />

                            {errors && (
                                <div className="text-danger small">
                                    {errors.name && errors.name.map((errorMessage, index) => (
                                        <span key={index}>{errorMessage}</span>
                                    ))}
                                    {errors.description && errors.description.map((errorMessage, index) => (
                                        <span key={index}>{errorMessage}</span>
                                    ))}
                                </div>
                            )}

                        </div>
                        <div className='modal-footer border-0'>
                            <button className='btn btn-primary fw-500' onClick={handleCreateProjectSubmit}>Create Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProjectModal