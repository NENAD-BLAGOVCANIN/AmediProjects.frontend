import React, { useState, useEffect } from 'react';
import { getBonusNameById } from '../../api/bonuses';

function SummaryTable({ summaryDays, summaryInstallations, summaryPlanners }) {
    const [sortedData, setSortedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [filterType, setFilterType] = useState('All'); // State for filtering by type
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' }); // State for sorting
    const [expandedRow, setExpandedRow] = useState(null); // State to track the expanded row
    const [bonusNames, setBonusNames] = useState({}); // State to store bonus names

    useEffect(() => {
        // Combine all summaries into one array
        const combinedData = [
            ...summaryDays.map(day => ({ ...day, type: 'סיכום יום' })),
            ...summaryInstallations.map(installation => ({ ...installation, type: 'סיכום התקנה' })),
            ...summaryPlanners.map(planner => ({ ...planner, type: 'סיכום מתכנן' }))
        ];

        // Apply filter based on selected type
        let filteredData = filterType === 'All' ? combinedData : combinedData.filter(item => item.type === filterType);

        // Apply search filtering
        if (searchTerm) {
            filteredData = filteredData.filter(item =>
                (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.project_name && item.project_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                item.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        if (sortConfig !== null) {
            filteredData.sort((a, b) => {
                let aValue = a[sortConfig.key] || '';
                let bValue = b[sortConfig.key] || '';

                if (sortConfig.key === 'created_at') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                } else {
                    aValue = aValue.toString().toLowerCase();
                    bValue = bValue.toString().toLowerCase();
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // Update the sortedData state
        setSortedData(filteredData);
    }, [summaryDays, summaryInstallations, summaryPlanners, filterType, searchTerm, sortConfig]);

    // Fetch and store bonus names when needed
    useEffect(() => {
        const fetchBonusNames = async () => {
            const bonusesToFetch = new Set();

            // Identify all bonus IDs that need to be fetched
            sortedData.forEach(item => {
                const bonuses = JSON.parse(item.bonuses || '{}');
                Object.keys(bonuses).forEach(bonusId => {
                    if (!bonusNames[bonusId]) {
                        bonusesToFetch.add(bonusId);
                    }
                });
            });

            const bonusNamePromises = Array.from(bonusesToFetch).map(async bonusId => {
                const name = await getBonusNameById(bonusId);
                return { bonusId, name };
            });

            const resolvedBonuses = await Promise.all(bonusNamePromises);

            // Update state with fetched bonus names
            const newBonusNames = { ...bonusNames };
            resolvedBonuses.forEach(({ bonusId, name }) => {
                newBonusNames[bonusId] = name;
            });
            setBonusNames(newBonusNames);
        };

        fetchBonusNames();
    }, [sortedData]);

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Determine the total number of pages
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Handle sorting request
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    // Handle row click to toggle accordion
    const toggleAccordion = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    // Render bonus list using fetched names
    const renderBonusList = (bonuses) => {
        const bonusEntries = Object.entries(bonuses || {});

        return (
            <ul>
                {bonusEntries.map(([bonusId, quantity]) => {
                    const bonusName = bonusNames[bonusId] || `Bonus ${bonusId}`;
                    return (
                        <li key={bonusId}>{bonusName}: {quantity}</li>
                    );
                })}
            </ul>
        );
    };

    // Render detailed information in accordion
    const renderAccordionContent = (item) => {
        const bonuses = JSON.parse(item.bonuses || '{}');

        return (
            <div className="accordion-content bg-light p-3">
                <p><strong>שם הפרויקט:</strong> {item.project_name}</p>
                <p><strong>תאריך:</strong> {item.date}</p>
                <p><strong>שם העובד:</strong> {item.worker_name}</p>
                <p><strong>עיר:</strong> {item.city}</p>
                <p><strong>הערות:</strong> {item.notes}</p>
                <p><strong>אספקה:</strong> {item.delivery}</p>
                <p><strong>הערות לעובד:</strong> {item.employee_comments}</p>
                <p><strong>בונוסים:</strong></p>
                {renderBonusList(bonuses)}
                <p><strong>נוצר בתאריך:</strong> {new Date(item.created_at).toLocaleString()}</p>
                <p><strong>עודכן בתאריך:</strong> {new Date(item.updated_at).toLocaleString()}</p>
            </div>
        );
    };

    return (
        <div className="summary-table">
            <h6 className="bold mb-3">סיכום חודשי</h6>

            {/* Search Input */}
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="חיפוש"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page when search term changes
                    }}
                    className="form-control"
                />
            </div>

            {/* Dropdown for filtering by summary type */}
            <div className="mb-3">
                <label htmlFor="filterType">סינון לפי סוג סיכום</label>
                <select
                    id="filterType"
                    className="form-select"
                    value={filterType}
                    onChange={(e) => {
                        setFilterType(e.target.value);
                        setCurrentPage(1); // Reset to first page when filter changes
                    }}
                >
                    <option value="All">הכל</option>
                    <option value="סיכום יום">סיכום גבייה</option>
                    <option value="סיכום התקנה">סיכום התקנה</option>
                    <option value="סיכום מתכנן">סיכום מתכנן</option>
                </select>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('type')}>
                            סוג סיכום {sortConfig.key === 'type' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th onClick={() => requestSort('title')}>
                            פרטים {sortConfig.key === 'title' || sortConfig.key === 'project_name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th onClick={() => requestSort('created_at')}>
                            תאריך יצירה {sortConfig.key === 'created_at' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => toggleAccordion(index)} style={{ cursor: 'pointer' }}>
                                <td>{item.type}</td>
                                <td>{item.title || item.project_name}</td>
                                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                            </tr>
                            {expandedRow === index && (
                                <tr>
                                    <td colSpan="3">
                                        {renderAccordionContent(item)}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                <div>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-primary"
                    >
                        קודם
                    </button>
                </div>
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <div>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-primary"
                    >
                        הבא
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SummaryTable;
