import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductions } from '../../api/production';
import UpdateProductionModal from '../projectManagement/UpdateProductionModal';

function PlaningTable() {
  const { t } = useTranslation();
  const [productions, setProductions] = useState([]);
  const [filteredProductions, setFilteredProductions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Set default items per page to 5
  const [showUpdateProductionModal, setShowUpdateProductionModal] = useState(false);
  const [currentProduction, setCurrentProduction] = useState(null);
  const [statusFilter, setStatusFilter] = useState('planning'); // New state for status filter

  const fetchProductions = async () => {
    try {
      const fetchedProductions = await getProductions();
      setProductions(fetchedProductions);
      setFilteredProductions(fetchedProductions.filter(production => production.status === 'planning'));
    } catch (error) {
      console.error('Error fetching productions:', error);
    }
  };

  useEffect(() => {
    fetchProductions();
  }, []);

  useEffect(() => {
    const results = productions.filter(production =>
      Object.values(production).some(
        value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredProductions(results.filter(production => production.status === statusFilter));
    setCurrentPage(1); // Reset to the first page on new search or status filter change
  }, [searchTerm, productions, statusFilter]);

  const handleShowUpdateProductionModal = (production) => {
 
    setCurrentProduction(production);
    setShowUpdateProductionModal(true);
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

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProductions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProductions.length / itemsPerPage);

  // Status translation
  const translateStatus = (status) => {
    switch (status) {
      case 'planning':
        return 'תכנון';
      case 'measuring':
        return 'מדידה';
      default:
        return status;
    }
  };

  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={() => handleShowUpdateProductionModal(null)}>הוספת תכנון ומדידה</button>
        <input 
          type="text" 
          placeholder="חיפוש" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="form-control my-3" 
        />
        <label>סנן לפי סטטוס:</label>
        <select value={statusFilter} onChange={handleStatusFilterChange} className="form-select mb-3">
          <option value="planning">תכנון</option>
          <option value="measuring">מדידה</option>
        </select>
      </div>
      <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
        <h6 className="bold mb-3">פרויקטים בתכנון</h6>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>מספר תוכנית</th>
              <th>חברה</th>
              <th>אתר עיר</th>
              <th>פריט</th>
              <th>סטטוס</th>
              <th>ביצוע ע"י</th>
              <th>הערות</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((production, index) => (
              <tr key={index}>
                <td>{production.plan_id}</td>
                <td>{production.company}</td>
                <td>{production.site_city}</td>
                <td>{production.item}</td>
                <td>{translateStatus(production.status)}</td>
                <td>{production.performed_by}</td>
                <td>{production.notes}</td>
                <td>
                  <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); handleShowUpdateProductionModal(production); }}>עריכה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex flex-column justify-content-between mb-3">
          <div className="col-md-3 ml-1">
            <label>כמות פרוייקטים להציג</label>
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
      {showUpdateProductionModal && (
        <UpdateProductionModal 
          productions={productions} 
          setProductions={setProductions} 
          showUpdateProductionModal={showUpdateProductionModal} 
          setShowUpdateProductionModal={setShowUpdateProductionModal} 
          currentProduction={currentProduction} 
          setCurrentProduction={setCurrentProduction} 
        />
      )}
    </>
  );
}

export default PlaningTable;
