import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductions, updateProduction } from '../../api/production';
import UpdateProductionModal from '../../components/projectManagement/UpdateProductionModal';
import UpdatePerformedModal from '../../components/planner/UpdatePerformedModal';
import CreateProductionModal from '../../components/projectManagement/CreateProductionModal';

function PlaningTable() {
  const { t } = useTranslation();
  const [productions, setProductions] = useState([]);
  const [planningProductions, setPlanningProductions] = useState([]);
  const [measuringProductions, setMeasuringProductions] = useState([]);
  const [newProductions, setNewProductions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showUpdateProductionModal, setShowUpdateProductionModal] = useState(false);
  const [showUpdatePerformedModal, setShowUpdatePerformedModal] = useState(false);
  const [showCreateProductionModal, setShowCreateProductionModal] = useState(false);
  const [currentProduction, setCurrentProduction] = useState(null);

  // Sort configuration state variables
  const [planningSortConfig, setPlanningSortConfig] = useState({ key: 'urgency', direction: 'ascending' });
  const [measuringSortConfig, setMeasuringSortConfig] = useState({ key: 'urgency', direction: 'ascending' });
  const [newSortConfig, setNewSortConfig] = useState({ key: 'urgency', direction: 'ascending' });

  const fetchProductions = async () => {
    try {
      const fetchedProductions = await getProductions();
      setProductions(fetchedProductions);
      filterProductions(fetchedProductions, searchTerm);
    } catch (error) {
      console.error('Error fetching productions:', error);
    }
  };

  useEffect(() => {
    fetchProductions();
  }, []);

  useEffect(() => {
    filterProductions(productions, searchTerm);
  }, [searchTerm, productions, planningSortConfig, measuringSortConfig, newSortConfig]);

  const filterProductions = (productionsList, term) => {
    const lowerCaseTerm = term.toLowerCase();
    const urgencyOrder = { 'high': 1, 'medium': 2, 'low': 3 };

    const filteredPlanning = productionsList
      .filter(production =>
        production.status === 'planning' && (
          (production.project_id && production.project_id.toString().includes(lowerCaseTerm)) ||
          (production.company && production.company.toLowerCase().includes(lowerCaseTerm)) ||
          (production.site_city && production.site_city.toLowerCase().includes(lowerCaseTerm)) ||
          (production.notes && production.notes.toLowerCase().includes(lowerCaseTerm))
        )
      )
      .sort((a, b) => {
        const urgencyA = urgencyOrder[a.urgency] || 4;
        const urgencyB = urgencyOrder[b.urgency] || 4;
        return urgencyA - urgencyB;
      });

    const filteredMeasuring = productionsList
      .filter(production =>
        production.status === 'measuring' && (
          (production.project_id && production.project_id.toString().includes(lowerCaseTerm)) ||
          (production.company && production.company.toLowerCase().includes(lowerCaseTerm)) ||
          (production.site_city && production.site_city.toLowerCase().includes(lowerCaseTerm)) ||
          (production.notes && production.notes.toLowerCase().includes(lowerCaseTerm))
        )
      )
      .sort((a, b) => {
        const urgencyA = urgencyOrder[a.urgency] || 4;
        const urgencyB = urgencyOrder[b.urgency] || 4;
        return urgencyA - urgencyB;
      });

    const filteredNew = productionsList
      .filter(production =>
        production.status === 'new' && (
          (production.company && production.company.toLowerCase().includes(lowerCaseTerm)) ||
          (production.site_city && production.site_city.toLowerCase().includes(lowerCaseTerm)) ||
          (production.notes && production.notes.toLowerCase().includes(lowerCaseTerm))
        )
      )
      .sort((a, b) => {
        const urgencyA = urgencyOrder[a.urgency] || 4;
        const urgencyB = urgencyOrder[b.urgency] || 4;
        return urgencyA - urgencyB;
      });

    setPlanningProductions(filteredPlanning);
    setMeasuringProductions(filteredMeasuring);
    setNewProductions(filteredNew);
  };

  const getComparator = (sortConfig) => {
    return (a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'urgency') {
        const urgencyOrder = { 'high': 1, 'medium': 2, 'low': 3 };
        aValue = urgencyOrder[a.urgency] || 4;
        bValue = urgencyOrder[b.urgency] || 4;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    };
  };

  const handleSort = (tableName, key) => {
    let direction = 'ascending';
    if (tableName === 'planning') {
      if (planningSortConfig.key === key && planningSortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setPlanningSortConfig({ key, direction });
    } else if (tableName === 'measuring') {
      if (measuringSortConfig.key === key && measuringSortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setMeasuringSortConfig({ key, direction });
    } else if (tableName === 'new') {
      if (newSortConfig.key === key && newSortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setNewSortConfig({ key, direction });
    }
  };

  const handleShowUpdateProductionModal = (production) => {
    setCurrentProduction(production);
    setShowUpdateProductionModal(true);
  };

  const handleShowUpdatePerformedModal = (production) => {
    setCurrentProduction(production);
    setShowUpdatePerformedModal(true);
  };

  const handleCreateProduction = () => {
    setCurrentProduction(null); // Reset current production for new creation
    setShowCreateProductionModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addProduction = (newProduction) => {
    setProductions([...productions, newProduction]);
    setNewProductions([...newProductions, newProduction]); // Add new production to 'new' category
  };

  return (
    <>
      {/* Button to open the Create Production Modal */}
      <button
        className="btn btn-primary mb-3"
        onClick={handleCreateProduction}
      >
        יצירת תכנון ומדידה חדשה
      </button>

      {/* Search Input */}
      <input
        type="text"
        placeholder="חיפוש"
        value={searchTerm}
        onChange={handleSearch}
        className="form-control my-3"
      />

      <div className="row">
        {/* New Status List */}
        <div className="col-md-4">
          <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
            <h6 className="bold mb-3">חדש</h6>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>אתר עיר</th>
                  <th>חברה</th>
                  <th>הערות</th>
                  <th>סטטוס</th>
                  <th onClick={() => handleSort('new', 'urgency')}>דחיפות</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {newProductions
                  .sort(getComparator(newSortConfig))
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((production) => (
                    <tr key={production.id}>
                      <td>{production.site_city}</td>
                      <td>{production.company}</td>
                      <td>{production.notes}</td>
                      <td>חדש</td>
                      <td>
                        <span className={`badge ${production.urgency === 'high' ? 'text-bg-danger' : production.urgency === 'medium' ? 'text-bg-warning' : 'text-bg-info'}`}>
                          {production.urgency === 'high' ? 'דחוף' : production.urgency === 'medium' ? 'בינוני' : 'נמוך'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => handleShowUpdatePerformedModal(production)}>עריכה</button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination">
              {Array.from({ length: Math.ceil(newProductions.length / itemsPerPage) }, (_, index) => (
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

        {/* Measuring List */}
        <div className="col-md-4">
          <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
            <h6 className="bold mb-3">מדידה</h6>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>מספר פרוייקט</th>
                  <th>חברה</th>
                  <th>אתר עיר</th>
                  <th>סטטוס</th>
                  <th>ביצוע ע"י</th>
                  <th>הערות</th>
                  <th onClick={() => handleSort('measuring', 'urgency')}>דחיפות</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {measuringProductions
                  .sort(getComparator(measuringSortConfig))
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((production) => (
                    <tr key={production.id}>
                      <td>{production.project_id}</td>
                      <td>{production.company}</td>
                      <td>{production.site_city}</td>
                      <td>מדידה</td>
                      <td>{production.performed_by}</td>
                      <td>{production.notes}</td>
                      <td>
                        <span className={`badge ${production.urgency === 'high' ? 'text-bg-danger' : production.urgency === 'medium' ? 'text-bg-warning' : 'text-bg-info'}`}>
                          {production.urgency === 'high' ? 'דחוף' : production.urgency === 'medium' ? 'בינוני' : 'נמוך'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => handleShowUpdateProductionModal(production)}>עריכה</button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination">
              {Array.from({ length: Math.ceil(measuringProductions.length / itemsPerPage) }, (_, index) => (
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

        {/* Planning List */}
        <div className="col-md-4">
          <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
            <h6 className="bold mb-3">תכנון</h6>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>מספר פרוייקט</th>
                  <th>חברה</th>
                  <th>אתר עיר</th>
                  <th>סטטוס</th>
                  <th>ביצוע ע"י</th>
                  <th>הערות</th>
                  <th onClick={() => handleSort('planning', 'urgency')}>דחיפות</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {planningProductions
                  .sort(getComparator(planningSortConfig))
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((production) => (
                    <tr key={production.id}>
                      <td>{production.project_id}</td>
                      <td>{production.company}</td>
                      <td>{production.site_city}</td>
                      <td>תכנון</td>
                      <td>{production.performed_by}</td>
                      <td>{production.notes}</td>
                      <td>
                        <span className={`badge ${production.urgency === 'high' ? 'text-bg-danger' : production.urgency === 'medium' ? 'text-bg-warning' : 'text-bg-info'}`}>
                          {production.urgency === 'high' ? 'דחוף' : production.urgency === 'medium' ? 'בינוני' : 'נמוך'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => handleShowUpdateProductionModal(production)}>עריכה</button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination">
              {Array.from({ length: Math.ceil(planningProductions.length / itemsPerPage) }, (_, index) => (
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
      </div>

      {/* Items Per Page Selector */}
      <div className="d-flex justify-content-start mb-3">
        <label htmlFor="itemsPerPage" className="me-2">כמות עמודות</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="form-select w-auto"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>

      {/* Create Production Modal */}
      {showCreateProductionModal && (
        <CreateProductionModal
          show={showCreateProductionModal}
          handleClose={() => setShowCreateProductionModal(false)}
          addProduction={addProduction}
        />
      )}

      {/* Update Production Modal */}
      {showUpdateProductionModal && (
        <UpdateProductionModal
          currentProduction={currentProduction}
          setProductions={setProductions}
          showUpdateProductionModal={showUpdateProductionModal}
          setShowUpdateProductionModal={setShowUpdateProductionModal}
        />
      )}

      {/* Update Performed Modal */}
      {showUpdatePerformedModal && (
        <UpdatePerformedModal
          production={currentProduction}
          show={showUpdatePerformedModal}
          setShow={setShowUpdatePerformedModal}
          updateProduction={updateProduction}
        />
      )}
    </>
  );
}

export default PlaningTable;
