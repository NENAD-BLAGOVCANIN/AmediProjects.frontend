import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../api/project';
import projectPlaceholderIcon from '../../assets/img/projectPlaceholderIcon.jpg';
import profileImagePlaceholder from '../../assets/img/profile.svg';
import placeholderProfileImage1 from '../../assets/img/placeholder-profile-img-1.jpeg';
import placeholderProfileImage2 from '../../assets/img/placeholder-profile-img-2.jpg';
import ProjectDetailsModal from '../../components/Admin/Projects/ProjectDetailsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [showViewProjectDetailsModal, setShowViewProjectDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 7;

  const handleOpenProjectDetailsModal = (project) => {
    setSelectedProject(project);
    setShowViewProjectDetailsModal(true);
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Calculate the indexes of the first and last projects to display
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className='pt-3'>

        <h2 className='bold mt-3'>
          <FontAwesomeIcon icon={faLayerGroup} className='pe-2' />
          Projects
        </h2>
        <p className='mb-5 text-muted'>Existing company projects</p>

        <div className="row">
          <div className="col-12 col-md-6 col-lg-3 col-sm-6 col-xs-6 px-3 mb-5">
            <Link to="/projects/create" className="project-card rounded-sm px-4 pt-4 pb-2 card border-0 bg-white pointer w-100 d-flex align-items-center justify-content-center">
              <h1 className='text-muted'>+</h1>
              <span className='fw-500 text-muted'>New project</span>
            </Link>
          </div>
          {currentProjects.map(project => (
            <div className="col-12 col-md-6 col-lg-3 col-sm-6 col-xs-6 px-3 mb-5" key={project.id}>
              <div className="project-card rounded-sm px-4 pt-4 pb-2 card border-0 bg-white pointer w-100 d-flex" onClick={() => { handleOpenProjectDetailsModal(project) }}>

                <div className="row">
                  <div className="col-4">
                    <div className='w-fit p-0 rounded-sm mb-3'>
                      <img src={projectPlaceholderIcon} className='rounded' style={{ height: 55, width: 55, objectFit: 'cover' }} alt="" />
                    </div>
                  </div>
                  <div className="col-8 px-0">
                    <h5 className='fw-500 medium'>
                      {project.name.length > 19 ? project.name.substring(0, 19) + '...' : project.name}
                    </h5>

                    <div>
                      <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 28, height: '100%' }} />
                      <img src={placeholderProfileImage1} className='rounded-circle transform-left-35' alt="" style={{ maxHeight: 28, height: '100%' }} />
                      <img src={placeholderProfileImage2} className='rounded-circle transform-left-75' alt="" style={{ maxHeight: 28, height: '100%' }} />
                    </div>
                  </div>
                </div>

                <span className='text-muted small' id='projectDescription'>{project.description}</span>


                <div className='row align-items-center'>
                  <div className="col-4">
                    <span className='bold'>{project.users.length}</span>
                    <p className='small text-muted'>Members</p>
                  </div>
                  <div className="col-4">
                    <span className='bold'>{new Date(project.created_at).toLocaleDateString()}</span>
                    <p className='small text-muted'>Date started</p>
                  </div>
                  <div className="col-4">
                    <span className='badge badge-primary w-fit p-2 mb-3 bg-warning small'>{project.status}</span>
                  </div>
                </div>


              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ProjectDetailsModal
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        showViewProjectDetailsModal={showViewProjectDetailsModal}
        setShowViewProjectDetailsModal={setShowViewProjectDetailsModal}
      />

    </>
  );
}

export default ProjectsManagement;
