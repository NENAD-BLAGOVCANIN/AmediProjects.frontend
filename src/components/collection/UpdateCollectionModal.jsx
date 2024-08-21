import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getLastCollection, updateCollection } from '../../api/collections'; // Adjust the path as necessary

function UpdateCollectionModal({ show, onHide, projectId, initialData, onSuccess }) {
    const [formData, setFormData] = useState({
        company_name: '',
        name: '',
        contact_person: '',
        project_manager_mobile: '',
        debt: '',
        // other fields
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData); // Populate the form with initial data
        } else if (projectId) {
            fetchLatestCollection(projectId);
        }
    }, [projectId, initialData]);

    const fetchLatestCollection = async (projectId) => {
        try {
            const response = await getLastCollection(projectId);
            if (response) {
                setFormData(response);
            }
        } catch (error) {
            console.error('Error fetching latest collection:', error);
        }
    };

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
            await updateCollection(formData.id, formData); // Assuming `id` is in the formData
            onSuccess(); // Refresh the projects list or collections list
            onHide(); // Close the modal
        } catch (error) {
            console.error('Error updating collection:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>עדכון גבייה</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="company_name">
                        <Form.Label>שם חברה</Form.Label>
                        <Form.Control
                            type="text"
                            name="company_name"
                            value={formData.company_name || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>שם פרוייקט</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="contact_person">
                        <Form.Label>איש קשר</Form.Label>
                        <Form.Control
                            type="text"
                            name="contact_person"
                            value={formData.contact_person || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="project_manager_mobile">
                        <Form.Label>טלפון מנהל פרוייקטים</Form.Label>
                        <Form.Control
                            type="text"
                            name="project_manager_mobile"
                            value={formData.project_manager_mobile || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="debt">
                        <Form.Label>חוב</Form.Label>
                        <Form.Control
                            type="text"
                            name="debt"
                            value={formData.debt || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {/* Add more fields as necessary */}
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'מעדכן...' : 'עדכן גבייה'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateCollectionModal;
