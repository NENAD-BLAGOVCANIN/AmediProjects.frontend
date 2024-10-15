import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductions } from '../../api/production';
import UpdateProductionModal from '../projectManagement/UpdateProductionModal';

function ProductionTable() {
  const { t } = useTranslation();
  const [productions, setProductions] = useState([]);
  const [filteredProductions, setFilteredProductions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showUpdateProductionModal, setShowUpdateProductionModal] = useState(false);
  const [currentProduction, setCurrentProduction] = useState(null);

  const fetchProductions = async () => {
    try {
      const fetchedProductions = await getProductions();
      setProductions(fetchedProductions);
      setFilteredProductions(fetchedProductions.filter(production => production.status === 'finished'));
    } catch (error) {
      console.error('Error fetching productions:', error);
    }
  };

  useEffect(() => {
    fetchProductions();
  }, []);

  const handleShowUpdateProductionModal = (production) => {
    if (production && production.id) {
      console.log("Editing production with ID:", production.id); // Log ID for debugging
    } else {
      console.log("Creating a new production");
    }
    setCurrentProduction(production);  // Pass production object
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
        <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
          <h6 className="bold mb-3">פרויקטים ייצור</h6>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>מספר פרוייקט</th>
                <th>חברה</th>
                <th>אתר עיר</th>
                <th>סטטוס</th>
                <th>ביצוע ע"י</th>
                <th>הערות</th>
                <th>דחיפות</th> {/* New urgency column */}
                <th>פריטים</th> {/* Changed column name to items */}
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {productions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((production) => (
                <tr key={production.id}>
                  <td>{production.project_id}</td>
                  <td>{production.company}</td>
                  <td>{production.site_city}</td>
                  <td>ייצור</td>
                  <td>{production.performed_by}</td>
                  <td>{production.notes}</td>
                  <td>
                    <span className={`badge ${production.urgency === 'high' ? 'text-bg-danger' : production.urgency === 'medium' ? 'text-bg-warning' : 'text-bg-info'}`}>
                      {production.urgency === 'high' ? 'דחוף' : production.urgency === 'medium' ? 'בינוני' : 'נמוך'}
                    </span>
                  </td>
                  <td>
                    {/* Display the related items */}
                    {production.items && production.items.length > 0 ? (
                      <ul>
                        {production.items.map(item => (
                          <li key={item.id}>{item.name} -  {item.type} | כמות {item.quantity} </li>
                        ))}
                      </ul>
                    ) : (
                      <span>אין פריטים</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => handleShowUpdateProductionModal(production)}>עריכה</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(productions.length / itemsPerPage) }, (_, index) => (
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

export default ProductionTable;
