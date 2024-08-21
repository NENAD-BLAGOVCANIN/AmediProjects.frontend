import React, { useState, useEffect } from 'react';
import { getProjectCollectionsSummary } from '../../api/project'; // Import the API function

function ProjectCollectionsTable() {
    const [projectCollections, setProjectCollections] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetchProjectCollectionsSummary();
    }, []);

    useEffect(() => {
        const results = projectCollections.filter(project =>
            Object.values(project).some(
                value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredProjects(results);
    }, [searchTerm, projectCollections]);

    const fetchProjectCollectionsSummary = async () => {
        try {
            const fetchedData = await getProjectCollectionsSummary();
            setProjectCollections(fetchedData);
            setFilteredProjects(fetchedData);
        } catch (error) {
            console.error('Error fetching project collections summary:', error);
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
                    placeholder="Search"
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="form-control my-3" 
                />
            </div>
            <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
                <h6 className="bold mb-3">סיכום גבייה</h6>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>שם פרוייקט</th>
                            <th>כמה נגבה עד היום</th>
                            <th>כמה נשאר לגבות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((project, index) => (
                            <tr key={index}>
                                <td>{project.project_name}</td>
                                <td>{project.total_collected.toFixed(2)}</td>
                                <td>{project.debt.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex flex-column justify-content-between mb-3">
                    <div className="col-md-3 ml-1">
                        <label>Items per page</label>
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="form-select">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                    </div>
                    <label className="mr-2 mt-2">Page</label>
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

export default ProjectCollectionsTable;
