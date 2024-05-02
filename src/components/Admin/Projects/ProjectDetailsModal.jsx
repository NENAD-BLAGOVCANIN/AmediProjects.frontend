import React from 'react'

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
                            <div>
                                <h4 className="modal-title bold m-0">{selectedProject.name}</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseProjectModal} style={{ fontSize: '25pt', fontWeight: '100' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
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