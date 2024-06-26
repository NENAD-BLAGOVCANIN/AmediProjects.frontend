import React, { useEffect, useState } from 'react'
import { getMyProjects } from '../api/project';
import { switchProject } from '../api/project';
import projectPlaceholderIcon from '../assets/img/projectPlaceholderIcon.jpg'
import profileImagePlaceholder from '../assets/img/profile.svg'
import { useTranslation } from 'react-i18next';

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
        <>
        <div>
            <div className='container'>
                <h2 className='bold ps-2'>פרוייקטים שלי</h2>
                <p className='text-muted mt-2 fw-500 ps-2 mb-5'>פרוייקטים קיימים</p>
                <div className="row">
                    {myProjects.map(myProject => (
                        <div className="col-12 col-md-4 col-sm-6 col-xs-6 mb-5" key={myProject.id} onClick={() => { handleSwitchProject(myProject.id) }}>
                            <div className="project-card rounded-sm p-4 card border-0 bg-white pointer w-100 d-flex">

                                <div className="row">
                                    <div className="col-4">
                                        <div className='card w-fit p-0 border rounded-sm mb-3'>
                                            <img
                                                src={myProject?.image ?? projectPlaceholderIcon}
                                                className="rounded"
                                                style={{ height: 55, width: 55, objectFit: "cover" }}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-8 px-0">
                                        <h5 className='fw-500 medium'>
                                            {myProject.name.length > 19 ? myProject.name.substring(0, 19) + '...' : myProject.name}
                                        </h5>

                                        <div>
                                            {myProject.users?.map((member) => {
                                                return (
                                                    <img
                                                        src={member?.profile_image ?? profileImagePlaceholder}
                                                        key={member?.id}
                                                        className="rounded-circle"
                                                        alt=""
                                                        style={{
                                                            maxHeight: 26,
                                                            aspectRatio: 1,
                                                            objectFit: "cover",
                                                            height: "100%",
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <span className='text-muted small' id='projectDescription'>{myProject.description}</span>

                                <div className='row align-items-center pt-3'>
                                    <div className="col-6">
                                        <span className='bold small'>{new Date(myProject.created_at).toLocaleDateString()}</span>
                                        <p className='small text-muted'>Date started</p>
                                    </div>
                                    <div className="col-6">
                                        <span className='badge badge-primary w-fit p-2 mb-3 bg-warning small'>{myProject.status}</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
        </>
    )
}

export default Projects