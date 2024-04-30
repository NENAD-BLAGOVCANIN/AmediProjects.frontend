import React, { useState, useEffect } from 'react'
import { saveProject } from '../api/project';
import { useNavigate } from 'react-router-dom';
import SocialHeader from '../components/SocialHeader';

function CreateNewProject() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleCreateProjectSubmit = async () => {

        try {
            await saveProject(name, description);
            navigate("/");
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <div id='create-project-page-wrapper'>

            <SocialHeader />

            <div className='container w-100 h-100 d-flex justify-content-center flex-column' style={{ minHeight: '100vh', maxWidth: 850 }}>

                <div className='rounded shadow bg-white p-5 w-100'>
                    <h2 className="bold mb-2">
                        Create Project
                    </h2>
                    <span className='text-muted'>Empower your projects with ease. Streamline creation and management effortlessly.</span>
                    <br />
                    <label className='pb-2 mt-5'>Name</label>
                    <input type="text" className='form-control bg-gray-light py-2 border-0'
                        placeholder='Project name' value={name} autoComplete="new-password"
                        onChange={(e) => setName(e.target.value)} />

                    <label className='mt-4 mb-2'>Description</label>
                    <textarea type="text" className='form-control bg-gray-light py-2 border-0'
                        placeholder='Project description' value={description} autoComplete="new-password"
                        onChange={(e) => setDescription(e.target.value)} style={{ height: 130 }} />

                    {errors && (
                        <div className="text-danger small">
                            {errors.name && errors.name.map((errorMessage, index) => (
                                <span key={index}>{errorMessage}</span>
                            ))}
                            {errors.description && errors.description.map((errorMessage, index) => (
                                <span key={index}>{errorMessage}</span>
                            ))}
                        </div>
                    )}

                    <div className='pt-4'>
                        <button className='btn btn-primary fw-500' onClick={handleCreateProjectSubmit}>Create Project</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateNewProject