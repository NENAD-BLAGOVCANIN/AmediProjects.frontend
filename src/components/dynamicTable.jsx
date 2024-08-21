import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DynamicModal from './DynamicModal';

// Utility function to format dates to 'YYYY-MM-DD'
const formatDate = (date) => {
  if (!date) return ''; // Return empty string if date is not provided
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function DynamicTable({ columns, data, titleTable = '' }) { // Default titleTable to an empty string if not provided
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDynamicModal, setShowDynamicModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const results = data.filter(item =>
      Object.values(item).some(
        value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleShowDynamicModal = (item) => {
    setCurrentData(item);
    setShowDynamicModal(true);
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder="חיפוש" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="form-control my-3" 
        />
      </div>
      {/* <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-basic bg-white"
          id="toggleModalButton"
          onClick={() => handleShowDynamicModal(null)} // Open modal for new entry
        >
          <FontAwesomeIcon icon={faBars} /> סגירה / פתיחת תפריט צד
        </button>
      </div> */}
      <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
        <h6 className="bold mb-3">{titleTable}</h6> {/* Use the dynamic titleTable prop */}
        <table className="table table-striped">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.key === 'actions' ? (
                      <button className="btn btn-secondary" onClick={() => handleShowDynamicModal(item)}>עריכה</button>
                    ) : (
                      // Format the date fields to 'YYYY-MM-DD'
                      column.type === 'date' ? formatDate(item[column.key]) : item[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex flex-column justify-content-between mb-3">
          <div className="col-md-3 ml-1">
            <label>כמות פריטים להציג</label>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="form-select">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>
          <label className="mr-2 mt-2">מעבר בין עמודים</label>
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
      {showDynamicModal && (
        <DynamicModal 
          show={showDynamicModal} 
          onHide={() => { 
              setShowDynamicModal(false); 
          }} 
          currentData={currentData} 
          columns={columns}
        />
      )}
    </>
  );
}

export default DynamicTable;
