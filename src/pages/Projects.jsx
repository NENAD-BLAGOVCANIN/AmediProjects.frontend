import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyProjects } from '../api/project';
import { switchProject } from '../api/project';
import exampleProjectIcon from '../assets/img/exampleProjectIcon.jpg'
import SocialHeader from '../components/SocialHeader';
import projectPlaceholderIcon from '../assets/img/projectPlaceholderIcon.jpg'
import profileImagePlaceholder from '../assets/img/profile.svg'
import placeholderProfileImage1 from '../assets/img/placeholder-profile-img-1.jpeg'
import placeholderProfileImage2 from '../assets/img/placeholder-profile-img-2.jpg'

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
        <div>


            <SocialHeader />

            <div className='container w-100 h-100 d-flex justify-content-center flex-column mt-5' style={{ minHeight: '80vh' }}>
                <h2 className='bold ps-2'>Projects</h2>
                <p className='text-muted mt-2 fw-500 ps-2 mb-5'>Current existing projects</p>
                <div className="row">
                    {myProjects.map(myProject => (
                        <div className="col-md-3 px-3 mb-5" key={myProject.id} onClick={() => { handleSwitchProject(myProject.id) }}>
                            <div className="project-card rounded-sm p-4 card border-0 bg-white pointer w-100 d-flex">

                                <div className="row">
                                    <div className="col-4">
                                        <div className='card w-fit p-0 border rounded-sm mb-3'>
                                            <img src={projectPlaceholderIcon} className='rounded' style={{ height: 55, width: 55, objectFit: 'cover' }} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-8 px-0">
                                        <h5 className='fw-500 medium'>
                                            {myProject.name.length > 19 ? myProject.name.substring(0, 19) + '...' : myProject.name}
                                        </h5>

                                        <div>
                                            <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 28, height: '100%' }} />
                                            <img src={placeholderProfileImage1} className='rounded-circle transform-left-35' alt="" style={{ maxHeight: 28, height: '100%' }} />
                                            <img src={placeholderProfileImage2} className='rounded-circle transform-left-75' alt="" style={{ maxHeight: 28, height: '100%' }} />
                                        </div>
                                    </div>
                                </div>

                                <span className='text-muted small' id='projectDescription'>{myProject.description}</span>

                                <hr />

                                <div className='row'>
                                    <div className="col-6">
                                        <span className='bold'>{myProject.users.length}</span>
                                        <p className='small text-muted'>Members</p>
                                    </div>
                                    <div className="col-6">
                                        <span className='bold'>{new Date(myProject.created_at).toLocaleDateString()}</span>
                                        <p className='small text-muted'>Date started</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>

    )
}

export default Projects