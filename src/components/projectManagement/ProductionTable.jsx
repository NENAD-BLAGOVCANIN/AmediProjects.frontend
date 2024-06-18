import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductions } from '../../api/production';
import UpdateProductionModal from './UpdateProductionModal';

function ProductionTable() {
  const { t } = useTranslation();
  const [productions, setProductions] = useState([]);
  const [filteredProductions, setFilteredProductions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateProductionModal, setShowUpdateProductionModal] = useState(false);
  const [currentProduction, setCurrentProduction] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const fetchedProductions = await getProductions();
        setProductions(fetchedProductions);
        setFilteredProductions(fetchedProductions);
      } catch (error) {
        console.error('Error fetching productions:', error);
      }
    };

    fetchProductions();
  }, []);

  useEffect(() => {
    const results = productions.filter(production =>
      Object.values(production).some(
        value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredProductions(results);
    setCurrentPage(1); // Reset to the first page on new search
  }, [searchTerm, productions]);

  const handleShowUpdateProductionModal = (production) => {
    setCurrentProduction(production);
    setShowUpdateProductionModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProductions.slice(indexOfFirstItem, indexOfLastItem);

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleClickPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={() => handleShowUpdateProductionModal(null)}>הוספת ייצור</button>
        <input 
          type="text" 
          placeholder="חיפוש" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="form-control my-3" 
        />
      </div>
      <div className="bg-white rounded p-3 shadow-sm">
        <h6 className="bold mb-3">פרויקטים בייצור</h6>
        <table className="table table-striped">
          <thead>
            <tr>
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
              <tr key={index} onClick={() => handleShowUpdateProductionModal(production)}>
                <td>{production.company}</td>
                <td>{production.site_city}</td>
                <td>{production.item}</td>
                <td>{production.status}</td>
                <td>{production.performed_by}</td>
                <td>{production.notes}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleShowUpdateProductionModal(production)}>עריכה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleClickPrevious} disabled={currentPage === 1}>
            הקודם
          </button>
          <button className="btn btn-primary" onClick={handleClickNext} disabled={indexOfLastItem >= filteredProductions.length}>
            הבא
          </button>
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

export default ProductionTable;
