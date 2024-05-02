import React from 'react'
import projectPlaceholderIcon from '../../../assets/img/projectPlaceholderIcon.jpg';

function ProjectDetailsModal({ showViewProjectDetailsModal, setShowViewProjectDetailsModal, selectedProject, setSelectedProject }) {

    const handleCloseProjectModal = () => {
        setShowViewProjectDetailsModal(false);
    };

    return (
        <>
            <div className={`modal fade ${showViewProjectDetailsModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <h4 className='bold m-0'>Project Details</h4>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseProjectModal} style={{ fontSize: '25pt', fontWeight: '100' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body'>
                            <div className='w-fit p-0 rounded-sm mb-3'>
                                <img src={projectPlaceholderIcon} className='rounded hover pointer' style={{ height: 55, width: 55, objectFit: 'cover' }} alt="" />
                            </div>
                            <div className="pt-3">
                                <label className="pb-2 text-muted">Name</label>
                                <textarea className="form-control medium m-0" name='name' rows="1">{selectedProject.name}</textarea>
                            </div>
                            <div className="pt-3">
                                <label className="pb-2 text-muted">Description</label>
                                <textarea className="form-control medium w-100" name="description" id="" rows="5">{selectedProject.description}</textarea>
                            </div>
                            <div className="pt-3">
                                <label className="pb-2 text-muted">Status</label><br />
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                            </div>
                        </div>
                        <div className='modal-footer border-0'>
                            <button className='btn btn-primary rounded'>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDetailsModal