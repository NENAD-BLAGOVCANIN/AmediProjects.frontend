import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
import { getMyProjects } from '../api/project';

function Projects() {

    const [myProjects, setMyProjects] = useState([]);

    useEffect(() => {
        const fetchMyProjects = async () => {

            try {
                const fetchedMyProjects = await getMyProjects();
                setMyProjects(fetchedMyProjects);
                console.log(fetchedMyProjects);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchMyProjects();

    }, []);

    return (
        <div id='create-project-page-wrapper'>

            <img src={logo} className='img-fluid position-absolute' style={{ height: 65, top: '1.5rem', left: '1.5rem' }} alt="" />

            <div className='container w-100 h-100 d-flex justify-content-center flex-column' style={{ minHeight: '100vh' }}>
                <h5 className='mb-4 ps-2'>Existing Amedi projects</h5>
                <div className="row">
                    <div className="col-md-3 px-3">
                        <Link to="/projects/create" className="project-card p-4 card border-0 bg-gray bg-gray-hover pointer shadow-sm w-100 d-flex align-items-center justify-content-center">
                            <h1>+</h1>
                            <span className='fw-500'>Add Project</span>
                        </Link>
                    </div>
                    {myProjects.map(myProject => (
                        <div className="col-md-3 px-3" key={myProject.id}>
                            <Link to="/" className="project-card p-4 card border-0 bg-gray bg-gray-hover pointer shadow-sm w-100 d-flex">
                                <h5 className='fw-500'>{myProject.name}</h5>
                                <span className='text-muted small'>{myProject.description}</span>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    )
}

export default Projects