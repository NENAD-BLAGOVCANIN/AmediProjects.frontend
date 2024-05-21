import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../api/project";
import projectPlaceholderIcon from "../../assets/img/projectPlaceholderIcon.jpg";
import profileImagePlaceholder from "../../assets/img/profile.svg";
import placeholderProfileImage1 from "../../assets/img/placeholder-profile-img-1.jpeg";
import placeholderProfileImage2 from "../../assets/img/placeholder-profile-img-2.jpg";
import ProjectDetailsModal from "../../components/Admin/Projects/ProjectDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [showViewProjectDetailsModal, setShowViewProjectDetailsModal] =
    useState(false);
  const [selectedProject, setSelectedProject] = useState([]);

  const handleOpenProjectDetailsModal = (project) => {
    setSelectedProject(project);
    setShowViewProjectDetailsModal(true);
  };

  useEffect(() => {
    setProjects((prev) => {
      return prev.map((project) => {
        if (project.id === selectedProject.id) {
          return selectedProject;
        }
        return project;
      });
    });
  }, [selectedProject]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className="pt-3">
        <h2 className="bold mt-3">
          <FontAwesomeIcon icon={faLayerGroup} className="pe-2" />
          Projects
        </h2>
        <p className="mb-5 text-muted">Existing company projects</p>

        <div className="row">
          <div className="col-12 col-md-6 col-lg-3 col-sm-6 col-xs-6 px-3 mb-5">
            <Link
              to="/projects/create"
              className="project-card rounded-sm px-4 pt-4 pb-2 card border-0 bg-white pointer w-100 d-flex align-items-center justify-content-center"
            >
              <h1 className="text-muted">+</h1>
              <span className="fw-500 text-muted">New project</span>
            </Link>
          </div>
          {projects.map((project) => (
            <div
              className="col-12 col-md-6 col-lg-3 col-sm-6 col-xs-6 px-3 mb-5"
              key={project.id}
            >
              <div
                className="project-card rounded-sm px-4 pt-4 pb-2 card border-0 bg-white pointer w-100 d-flex"
                onClick={() => {
                  handleOpenProjectDetailsModal(project);
                }}
              >
                <div className="row">
                  <div className="col-4">
                    <div className="w-fit p-0 rounded-sm mb-3">
                      <img
                        src={project?.image ?? projectPlaceholderIcon}
                        className="rounded"
                        style={{ height: 55, width: 55, objectFit: "cover" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-8 px-0">
                    <h5 className="fw-500 medium">
                      {project.name.length > 19
                        ? project.name.substring(0, 19) + "..."
                        : project.name}
                    </h5>

                    <div>
                      {project.users?.map((member) => {
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

                <span className="text-muted small" id="projectDescription">
                  {project.description}
                </span>

                <div className="row align-items-center pt-3">
                  <div className="col-6">
                    <span className="bold">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                    <p className="small text-muted">Date started</p>
                  </div>
                  <div className="col-6">
                    <span className="badge badge-primary w-fit p-2 mb-3 bg-warning small">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
