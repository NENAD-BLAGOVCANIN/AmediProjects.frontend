import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { saveProject } from '../../api/project'; // Adjust the path as necessary

function CreateProjectModal({ show, onHide, onSuccess }) {
    const [formData, setFormData] = useState({
        company_name: '',
        name: '',
        contact_person: '',
        project_manager_phone: '',
        project_manager_email: '',
        accounting_phone: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await saveProject(formData);
            if (response.id) { // Assuming the response contains the created project's ID
                onSuccess(); // Refresh the projects list
                onHide(); // Close the modal
            } else {
                console.error('Failed to create project:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>יצירת פרוייקט חדש</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="company_name">
                        <Form.Label>שם חברה</Form.Label>
                        <Form.Control
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>שם פרוייקט</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="contact_person">
                        <Form.Label>איש קשר</Form.Label>
                        <Form.Control
                            type="text"
                            name="contact_person"
                            value={formData.contact_person}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="project_manager_phone">
                        <Form.Label>טלפון מנהל פרוייקטים</Form.Label>
                        <Form.Control
                            type="text"
                            name="project_manager_phone"
                            value={formData.project_manager_phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>אימייל</Form.Label>
                        <Form.Control
                            type="email"
                            name="project_manager_email"
                            value={formData.project_manager_email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="accounting_phone">
                        <Form.Label>הנהלת חשבונות טלפון</Form.Label>
                        <Form.Control
                            type="text"
                            name="accounting_phone"
                            value={formData.accounting_phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'יוצר...' : 'יצירת פרוייקט חדש'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CreateProjectModal;
