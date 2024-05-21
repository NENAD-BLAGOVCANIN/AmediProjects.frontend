import React, { useRef, useState } from "react";
import projectPlaceholderIcon from "../../../assets/img/projectPlaceholderIcon.jpg";
import { updateProjectImage, updateProjectInfo } from "../../../api/project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

function ProjectDetailsModal({
  showViewProjectDetailsModal,
  setShowViewProjectDetailsModal,
  selectedProject,
  setSelectedProject,
}) {
  const [selectedRole, setSelectedRole] = useState(selectedProject.status);
  const [projectImage, setProjectImage] = useState(null);
  const inputRef = useRef(null);

  const handleCloseProjectModal = () => {
    setShowViewProjectDetailsModal(false);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const saveProjectChanges = async () => {
    const name = document.getElementById("nameTextarea").value;
    const description = document.getElementById("descriptionTextarea").value;
    await updateProjectInfo(
      selectedProject.id,
      name,
      description,
      selectedRole
    );
    window.location.reload();
  };

  const handleProjectImageChange = async (event) => {
    const response = await updateProjectImage(
      event.target.files[0],
      selectedProject?.id
    );
    if (!response) return;
    setSelectedProject((prev) => ({ ...prev, image: response.image }));
  };

  return (
    <div
      className={`modal fade ${
        showViewProjectDetailsModal ? "show d-block" : ""
      }`}
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ maxWidth: 800, padding: "1.7rem" }}
      >
        <div
          className="modal-content py-3 px-4 border-0 shadow-lg"
          style={{ maxHeight: 800, overflow: "auto" }}
        >
          <div className="modal-header pb-0 border-0 d-flex align-items-center">
            <h4 className="bold m-0">Project Details</h4>
            <span
              type="button"
              className="close ms-auto m-0 text-secondary"
              onClick={handleCloseProjectModal}
              style={{ fontSize: "25pt", fontWeight: "100" }}
            >
              <span aria-hidden="true">&times;</span>
            </span>
          </div>
          <div className="modal-body">
            <div className="w-fit p-0 rounded-sm mb-3 project-image position-relative">
              <img
                src={selectedProject?.image ?? projectPlaceholderIcon}
                className="rounded hover pointer"
                style={{ height: 55, width: 55, objectFit: "cover" }}
                alt=""
              />
              <input
                ref={inputRef}
                onChange={handleProjectImageChange}
                type="file"
                style={{ height: 0, width: 0 }}
                className="invisible position-absolute"
              />
              <button
                className="project-image-overlay"
                onClick={() => inputRef?.current?.click()}
              >
                <FontAwesomeIcon icon={faCamera} className="text-white" />
              </button>
            </div>
            <div className="pt-3">
              <label className="pb-2 text-muted">Name</label>
              <textarea
                id="nameTextarea"
                className="form-control medium m-0"
                rows="1"
                defaultValue={selectedProject.name}
              />
            </div>
            <div className="pt-3">
              <label className="pb-2 text-muted">Description</label>
              <textarea
                id="descriptionTextarea"
                className="form-control medium w-100"
                rows="5"
                defaultValue={selectedProject.description}
              />
            </div>
            <div className="pt-3">
              <label className="pb-2 text-muted">Status</label>
              <br />

              <select
                className="form-select medium"
                aria-label="Default select example"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option value="setting up">setting up</option>
                <option value="measurement">measurement</option>
                <option value="writing a program">writing a program</option>
                <option value="production">production</option>
                <option value="galvanization">galvanization</option>
                <option value="installation">installation</option>
                <option value="rejects">rejects</option>
                <option value="delivery">delivery</option>
                <option value="collection">collection</option>
              </select>
            </div>
          </div>
          <div className="modal-footer border-0">
            <button
              className="btn btn-primary rounded"
              onClick={() => {
                saveProjectChanges();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsModal;
