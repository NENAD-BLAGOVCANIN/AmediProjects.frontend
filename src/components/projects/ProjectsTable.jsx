import React, { useState, useEffect } from 'react';
import { getDetailedProjects } from '../../api/project'; // Import the function to get projects
import { useTranslation } from 'react-i18next';

function ProjectsTable() {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        const results = projects.filter(project =>
            Object.values(project).some(
                value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredProjects(results);
    }, [searchTerm, projects]);

    const fetchProjects = async () => {
        try {
            const fetchedProjects = await getDetailedProjects();
            setProjects(fetchedProjects);
            setFilteredProjects(fetchedProjects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    return (
        <>
            <div>
                <input 
                    type="text" 
                    placeholder={t('search')}
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="form-control my-3" 
                />
            </div>
            <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
                <h6 className="bold mb-3">פרוייקטים קיימים</h6>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>מספר פרוייקט</th>
                            <th>שם פרוייקט</th>
                            <th>סטטוס כללי</th>
                            <th>חברה</th>
                            <th>מיקום</th>
                            <th>מנהל פרוייקט</th>
                            <th>גבייה</th>
                            <th>תכנון ומדידה</th>
                            <th>ייצור</th>
                            <th>הפרוייקט נוצר</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((project, index) => (
                            <tr key={index}>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.status}</td>
                                <td>{project.company_name}</td>
                                <td>{project.location}</td>
                                <td>{project.project_manager_name}</td>
                                <td>
                                    {project.collections?.length > 0 ? (
                                        <ul>
                                            {project.collections.map(collection => (
                                                <li key={collection.id}>{collection.debt}</li>
                                            ))}
                                        </ul>
                                    ) : 'No collections'}
                                </td>
                                <td>
                                    {project.productions?.length > 0 ? (
                                        <ul>
                                            {project.productions.map(production => (
                                                <li key={production.id}>{production.status}</li>
                                            ))}
                                        </ul>
                                    ) : 'No productions'}
                                </td>

                                <td>
                                    {project.stations?.length > 0 ? (
                                        <ul>
                                            {project.stations.map(station => (
                                                <li key={station.id}>{station.name}</li>
                                            ))}
                                        </ul>
                                    ) : 'No stations'}
                                </td>
                                <td>{new Date(project.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex flex-column justify-content-between mb-3">
                    <div className="col-md-3 ml-1">
                        <label>{t('projects.items_per_page')}</label>
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="form-select">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                    </div>
                    <label className="mr-2 mt-2">{t('projects.pagination')}</label>
                    <div className="d-flex flex-row col-md-8 mt-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectsTable;
