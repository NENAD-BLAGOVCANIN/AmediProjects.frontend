import React from 'react'

function Projects() {
    return (
        <div className='container w-100 h-100 d-flex justify-content-center flex-column' style={{ minHeight: '100vh' }}>
            <h5 className='mb-4 ps-2'>Your Firebase projects</h5>
            <div className="row">
                <div className="col-md-3 px-3">
                    <div className="card border-0 bg-gray shadow-sm py-5 w-100 d-flex align-items-center justify-content-center">
                        <h1>+</h1>
                        <span className='fw-500'>Add Project</span>
                    </div>
                </div>
                <div className="col-md-3 px-3">
                    <div className="card border-0 bg-gray shadow-sm py-5 w-100 d-flex align-items-center justify-content-center">
                        <h1>+</h1>
                        <span className='fw-500'>Add Project</span>
                    </div>
                </div>
                <div className="col-md-3 px-3">
                    <div className="card border-0 bg-gray shadow-sm py-5 w-100 d-flex align-items-center justify-content-center">
                        <h1>+</h1>
                        <span className='fw-500'>Add Project</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects