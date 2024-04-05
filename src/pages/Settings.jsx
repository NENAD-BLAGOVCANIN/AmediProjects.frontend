import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { getProjectInfo, getProjectMembers, updateProjectInfo } from '../api/project'
import placeholderProfileImage from '../assets/img/profile.svg'
import { frontendUrl } from '../api/config'

function Settings() {

    const [project, setProject] = useState([]);
    const [projectMembers, setProjectMembers] = useState([]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {

                const fetchedProjectInfo = await getProjectInfo();
                setProject(fetchedProjectInfo);

                setName(fetchedProjectInfo.name);
                setDescription(fetchedProjectInfo.description);

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

    const handleUpdateChanges = async () => {
        await updateProjectInfo(name, description);
        window.location.reload();
    }

    return (
        <div className='main-content-wrapper'>

            <Sidebar />

            <div className='w-100 overflow-auto'>

                <Header pageTitle="Settings" />

                <div className='main-container' style={{ maxWidth: '500px' }}>

                    <h5 className="bold">Project Settings</h5>

                    <label className='pb-2 mt-3'>Name</label>
                    <input type="text" className='form-control bg-gray py-2 border-0'
                        placeholder='Project name' value={name} autoComplete="new-password"
                        onChange={(e) => setName(e.target.value)} />

                    <label className='mt-4 mb-2'>Description</label>
                    <textarea type="text" className='form-control bg-gray py-2 border-0'
                        placeholder='Project description' value={description} autoComplete="new-password"
                        onChange={(e) => setDescription(e.target.value)} />

                    <button className='btn btn-primary rounded mt-3' onClick={handleUpdateChanges}>Save Changes</button>

                    <h5 className="bold mt-5">Project Members</h5>
                    <div className='row align-items-center w-100'>

                        {projectMembers.map(projectMember => (
                            <div className='col-md-2 d-flex flex-column align-items-center pt-3 pe-2 w-fit' key={projectMember.id} >
                                <img src={placeholderProfileImage} className='img-fluid rounded-circle' style={{ maxWidth: 55 }} alt="" />
                                <span className='small'>{projectMember.user.name.length > 10 ? projectMember.user.name.substring(0, 10) + '...' : projectMember.user.name}</span>
                            </div>
                        ))}
                    </div>

                    <h5 className="bold mt-5">Invite Members</h5>

                    <label className='mt-3'>Invite Link:</label>
                    {project && (
                        <input
                            type="text"
                            className='form-control bg-gray'
                            value={`${frontendUrl}/projects/invite/${project.invite_code}/${project.id}`}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default Settings