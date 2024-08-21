import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateMonthlyCollection, createMonthlyCollection } from '../../api/MonthlyCollections';
import { getProjects } from '../../api/project'; // Import the function to get projects

function MonthlyCollectionModal({ show, onHide, projectId, existingCollection, onSuccess }) {
    const [formData, setFormData] = useState({
        project_id: projectId || '',
        month: '',
        year: '',
        amount_collected: ''
    });

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (existingCollection) {
            setFormData({
                project_id: existingCollection.project_id,
                month: existingCollection.month,
                year: existingCollection.year,
                amount_collected: existingCollection.amount_collected
            });
        } else {
            fetchProjects();
        }
    }, [existingCollection]);

    const fetchProjects = async () => {
        try {
            const projectsData = await getProjects();
            setProjects(projectsData);
        } catch (error) {
            console.error('Error fetching projects:', error);
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
        try {
            if (existingCollection) {
                await updateMonthlyCollection(existingCollection.id, formData);
            } else {
                await createMonthlyCollection(formData);
            }
            onSuccess();
            onHide();
        } catch (error) {
            console.error('Error updating collection:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{existingCollection ? 'Update' : 'Add'} עדכון חודשי</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {!existingCollection && (
                        <Form.Group controlId="project_id">
                            <Form.Label>פרוייקט</Form.Label>
                            <Form.Control
                                as="select"
                                name="project_id"
                                value={formData.project_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">בחר פרוייקט</option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    )}
                    <Form.Group controlId="month">
                        <Form.Label>חודש</Form.Label>
                        <Form.Control
                            type="number"
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            required
                            min="1"
                            max="12"
                            placeholder='8'
                        />
                    </Form.Group>
                    <Form.Group controlId="year">
                        <Form.Label>שנה</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            placeholder='2024'
                        />
                    </Form.Group>
                    <Form.Group controlId="amount_collected">
                        <Form.Label>כמות שנגבה</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount_collected"
                            value={formData.amount_collected}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {existingCollection ? 'עדכון' : 'הוספת'} גבייה
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default MonthlyCollectionModal;
