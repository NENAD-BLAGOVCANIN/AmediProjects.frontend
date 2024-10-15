import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { saveProduction } from '../../api/production';
import { getProjects } from '../../api/project'; // Assume you have an endpoint to fetch projects

function CreateProductionModal({ show, handleClose, addProduction }) {
  const [formData, setFormData] = useState({
    project_id: '',
    project_name: '', // To store and display the project name
    company: '',
    site_city: '',
    status: 'new', // Default status
    // Add other fields as needed
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch the projects for autocomplete
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects(); // Assuming this function fetches the projects
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'project_name') {
      // Find the selected project based on the name
      const selectedProject = projects.find(project => project.name === value);
      if (selectedProject) {
        setFormData({
          ...formData,
          project_id: selectedProject.id,
          project_name: selectedProject.name,
          company: selectedProject.company_name,
          site_city: selectedProject.location,
        });
      } else {
        setFormData({
          ...formData,
          project_name: value,
          project_id: '', // Clear project_id if no project is found
          company: '',
          site_city: ''
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert formData to FormData if you need to support file upload
      const formPayload = new FormData();
      formPayload.append('project_id', formData.project_id); // Use project_id for the payload
      formPayload.append('company', formData.company);
      formPayload.append('site_city', formData.site_city);
      formPayload.append('status', formData.status);

      const newProduction = await saveProduction(formPayload);
      addProduction(newProduction); // Add the new production to the table
      handleClose(); // Close the modal
    } catch (error) {
      console.error('Error creating production:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>יצירת תכנון ומדידה חדש</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="project_name">
            <Form.Label>שם פרוייקט</Form.Label>
            <Form.Control
              list="projectNames" // Link to the datalist
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              required
            />
            <datalist id="projectNames">
              {projects.map((project) => (
                <option key={project.id} value={project.name} />
              ))}
            </datalist>
          </Form.Group>
          <Form.Group controlId="company">
            <Form.Label>חברה</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              readOnly // Make this field read-only since it will auto-fill
            />
          </Form.Group>
          <Form.Group controlId="site_city">
            <Form.Label>עיר אתר</Form.Label>
            <Form.Control
              type="text"
              name="site_city"
              value={formData.site_city}
              onChange={handleChange}
              readOnly // Make this field read-only since it will auto-fill
            />
          </Form.Group>
          {/* Add other form fields as needed */}
          <Button variant="primary" type="submit">
            שמור
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

CreateProductionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addProduction: PropTypes.func.isRequired,
};

export default CreateProductionModal;
