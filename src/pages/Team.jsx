import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header/Header'
import { getProjectInfo, getProjectMembers, updateProjectInfo } from '../api/project'
import placeholderProfileImage from '../assets/img/profile.svg'
import { frontendUrl } from '../api/config'

function Team() {

    const [project, setProject] = useState([]);
    const [projectMembers, setProjectMembers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const fetchedProjectInfo = await getProjectInfo();
                setProject(fetchedProjectInfo);

            } catch (error) {
                console.error('Error fetching :', error);
            }

            try {
                const fetchedProjectMembers = await getProjectMembers();
                setProjectMembers(fetchedProjectMembers);
            } catch (error) {
                console.error('Error fetching :', error);
            }

        };

        fetchData();
    }, []);

    return (


        <div style={{ maxWidth: '500px' }}>

            <h5 className="bold mt-5">Project Members</h5>
            <div className='row align-items-center w-100'>

                {projectMembers.map(projectMember => (
                    <div className='col-md-2 d-flex flex-column align-items-center pt-3 pe-2 w-fit' key={projectMember.id} >
                        <img src={placeholderProfileImage} className='img-fluid rounded-lg' style={{ maxWidth: 55 }} alt="" />
                        <span className='small pt-1'>{projectMember.user.name.length > 8 ? projectMember.user.name.substring(0, 8) + '...' : projectMember.user.name}</span>
                    </div>
                ))}
            </div>

            <h5 className="bold mt-5">Invite Members</h5>

            <label className='mt-3'>Invite Link:</label>
            {project && (
                <input
                    type="text"
                    className='form-control bg-gray-light'
                    value={`${frontendUrl}/projects/invite/${project.invite_code}/${project.id}`}
                />
            )}
        </div>
    )
}

export default Team