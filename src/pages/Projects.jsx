import React, { useEffect, useState } from 'react'
import logo from '../assets/img/icon-dark.png'
import { Link } from 'react-router-dom'
import { getMyProjects } from '../api/project';
import { switchProject } from '../api/project';
import exampleProjectIcon from '../assets/img/exampleProjectIcon.jpg'

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

    const handleSwitchProject = async (project_id) => {
        try {
            await switchProject(project_id);
            window.location.href = "/";

        } catch (error) {
            console.error('Error fetching :', error);
        }
    }

    return (
        <div id='create-project-page-wrapper'>

            <div className='d-flex justify-content-between' style={{ padding: '1.2rem' }}>
                <img src={logo} className='img-fluid' style={{ height: 55 }} alt="" />
                <ul className='nav'>
                    <li className='nav-item'>
                        <a href="" className='nav-link medium color-text-lighter'>Support</a>
                    </li>
                    <li className='nav-item'>
                        <a href="" className='nav-link medium color-text-lighter'>Docs</a>
                    </li>
                    <li className='nav-item'>
                        <a href="" className='nav-link medium color-text-lighter'>Templates</a>
                    </li>
                </ul>
            </div>
            <div className='container w-100 h-100 d-flex justify-content-center flex-column' style={{ minHeight: '80vh' }}>
                <h5 className='mb-4 ps-2'>Existing Amedi projects</h5>
                <div className="row">
                    <div className="col-md-3 px-3 mb-3">
                        <Link to="/projects/create" className="project-card p-4 card border-0 bg-gray bg-gray-hover pointer shadow-sm w-100 d-flex align-items-center justify-content-center">
                            <h1>+</h1>
                            <span className='fw-500'>Add Project</span>
                        </Link>
                    </div>
                    {myProjects.map(myProject => (
                        <div className="col-md-3 px-3" key={myProject.id} onClick={() => { handleSwitchProject(myProject.id) }}>
                            <div className="project-card p-4 card border-0 bg-white bg-gray-hover pointer shadow-sm w-100 d-flex">

                                <div className='card w-fit p-0 border shadow-sm rounded mb-3'>
                                    <img src={exampleProjectIcon} className='rounded' style={{height: 55, width: 55, objectFit: 'cover'}} alt="" />
                                </div>

                                <h5 className='fw-500 medium'>{myProject.name}</h5>
                                <span className='text-muted small'>{myProject.description}</span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    )
}

export default Projects