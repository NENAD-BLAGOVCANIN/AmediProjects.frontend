import React, { useEffect, useState } from 'react'
import { getMyProjects } from '../api/project';
import { switchProject } from '../api/project';
import projectPlaceholderIcon from '../assets/img/projectPlaceholderIcon.jpg'
import profileImagePlaceholder from '../assets/img/profile.svg'
import { useTranslation } from 'react-i18next';
import ProjectsTable from '../components/projects/ProjectsTable';
function Projects() {

    const [myProjects, setMyProjects] = useState([]);

    useEffect(() => {
        const fetchMyProjects = async () => {

            try {
                const fetchedMyProjects = await getMyProjects();
                setMyProjects(fetchedMyProjects);
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
            <div className='container-fluid'>
                <h2 className='bold ps-2'>פרוייקטים </h2>
                <p className='text-muted mt-2 fw-500 ps-2 mb-5'>פרוייקטים קיימים</p>
              <div className="row">
                <div className="col-12">
                <ProjectsTable />

                </div>
              </div>

            </div>
        </div>
        </>
    )
}

export default Projects