import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateMonthlyCollection, createMonthlyCollection } from '../../api/MonthlyCollections';
import { getProjects } from '../../api/project'; 

function MonthlyCollectionModal({ show, onHide, projectId, existingCollection, onSuccess }) {
    const currentDate = new Date(); 
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const [formData, setFormData] = useState({
        project_id: projectId || '',
        month: currentMonth,  
        year: currentYear,   
        amount_collected: ''
    });

    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

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
            setFilteredProjects(projectsData); // Show all projects initially
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);

        // Filter the projects based on the search input
        const filtered = projects.filter(project =>
            project.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredProjects(filtered);

        // Show the dropdown when there are results
        setShowDropdown(filtered.length > 0);
    };

    const handleProjectSelect = (project) => {
        setFormData({
            ...formData,
            project_id: project.id
        });
        setSearchTerm(project.name); // Set the search term to the selected project name
        setShowDropdown(false); // Hide the dropdown after selection
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
                <Modal.Title>{existingCollection ? 'עדכון גבייה' : 'הוספת גבייה'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {existingCollection && (
                    <div>
                        <h5>פרוייקט נוכחי: {existingCollection.project_name}</h5>
                    </div>
                )}
                <Form onSubmit={handleSubmit}>
                    {/* Project Autocomplete Dropdown */}
                    {!existingCollection && (
                        <Form.Group controlId="project_id">
                            <Form.Label>חיפוש פרוייקט</Form.Label>
                            <Form.Control
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="הכנס שם פרוייקט"
                                autoComplete="off"
                                onFocus={() => setShowDropdown(true)}
                            />
                            {showDropdown && (
                                <div className="autocomplete-dropdown">
                                    {filteredProjects.map(project => (
                                        <div
                                            key={project.id}
                                            className="autocomplete-item"
                                            onClick={() => handleProjectSelect(project)}
                                        >
                                            {project.name}
                                        </div>
                                    ))}
                                </div>
                            )}
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

            {/* Add some basic styles for the autocomplete dropdown */}
            <style>{`
                .autocomplete-dropdown {
                    max-height: 150px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    position: absolute;
                    background-color: white;
                    width: 100%;
                    z-index: 1000;
                    margin-top: 5px;
                }
                .autocomplete-item {
                    padding: 8px;
                    cursor: pointer;
                }
                .autocomplete-item:hover {
                    background-color: #f0f0f0;
                }
            `}</style>
        </Modal>
    );
}

export default MonthlyCollectionModal;
