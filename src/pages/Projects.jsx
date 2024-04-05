import React from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

function Projects() {
    return (
        <div id='create-project-page-wrapper'>

            <img src={logo} className='img-fluid position-absolute' style={{height: 65, top: '1.5rem', left: '1.5rem'}} alt="" />

            <div className='container w-100 h-100 d-flex justify-content-center flex-column' style={{ minHeight: '100vh' }}>
                <h5 className='mb-4 ps-2'>Existing Amedi projects</h5>
                <div className="row">
                    <div className="col-md-3 px-3">
                        <Link to="/" className="project-card p-4 card border-0 bg-gray bg-gray-hover pointer shadow-sm w-100 d-flex align-items-center justify-content-center">
                            <h1>+</h1>
                            <span className='fw-500'>Add Project</span>
                        </Link>
                    </div>
                    <div className="col-md-3 px-3">
                        <Link to="/" className="project-card p-4 card border-0 bg-gray bg-gray-hover pointer shadow-sm w-100 d-flex">
                            <h5 className='fw-500'>Example Project 1</h5>
                            <span className='text-muted small'>This is a random project description</span>
                        </Link>
                    </div>
                    <div className="col-md-3 px-3">
                        <Link to="/" className="project-card p-4 card border-0 bg-gray bg-gray-hover pointer shadow-sm w-100 d-flex">
                            <h5 className='fw-500'>Example Project 2</h5>
                            <span className='text-muted small'>This is a random project description</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Projects