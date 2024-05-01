import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../api/project';
import rocketIcon from '../../assets/img/rocket.jpg';
import profileImagePlaceholder from '../../assets/img/profile.svg';
import placeholderProfileImage1 from '../../assets/img/placeholder-profile-img-1.jpeg';
import placeholderProfileImage2 from '../../assets/img/placeholder-profile-img-2.jpg';

function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 7;

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
    <div className='pt-3'>
      <div className="row">
        <div className="col-md-3 px-3 mb-5">
          <Link to="/projects/create" className="project-card rounded-sm p-4 card border-0 bg-white pointer w-100 d-flex align-items-center justify-content-center">
            <h1 className='text-muted'>+</h1>
            <span className='fw-500 text-muted'>New project</span>
          </Link>
        </div>
        {currentProjects.map(project => (
          <div className="col-md-3 px-3 mb-5" key={project.id}>
            <div className="project-card rounded-sm p-4 card border-0 bg-white pointer w-100 d-flex">

              <div className="row">
                <div className="col-4">
                  <div className='card w-fit p-0 border rounded-sm mb-3'>
                    <img src={rocketIcon} className='rounded' style={{ height: 55, width: 55, objectFit: 'cover' }} alt="" />
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

              <span></span>

              <hr />

              <div className='row'>
                <div className="col-6">
                  <span className='bold'>4</span>
                  <p className='small text-muted'>Members</p>
                </div>
                <div className="col-6">
                  <span className='bold'>23.3.2024</span>
                  <p className='small text-muted'>Due date</p>
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
  );
}

export default ProjectsManagement;
