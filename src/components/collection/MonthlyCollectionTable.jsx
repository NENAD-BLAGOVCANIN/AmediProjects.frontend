import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getMonthlyCollections } from '../../api/MonthlyCollections';
import MonthlyCollectionModal from './MonthlyCollectionModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function MonthlyCollectionTable() {
  const { t } = useTranslation();
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMonthlyCollectionModal, setShowMonthlyCollectionModal] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    const results = collections.filter(collection =>
      Object.values(collection).some(
        value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredCollections(results);
  }, [searchTerm, collections]);

  const fetchCollections = async () => {
    try {
      const fetchedCollections = await getMonthlyCollections();
      setCollections(fetchedCollections);
      setFilteredCollections(fetchedCollections);
    } catch (error) {
      console.error('Error fetching monthly collections:', error);
    }
  };

  const handleShowMonthlyCollectionModal = (collection) => {
    setCurrentCollection(collection);
    setShowMonthlyCollectionModal(true);
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
  const currentItems = filteredCollections.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-basic bg-white"
          id="toggleModalButton"
          onClick={() => console.log('Toggle Sidebar')}
        >
          <FontAwesomeIcon icon={faBars} />  סגירה / פתיחת תפריט צד
        </button>
        <button className="btn btn-primary" onClick={() => handleShowMonthlyCollectionModal(null)}>
        הוסף גבייה חדשה לפרויקט ללא גבייה
        </button>
      </div>
      <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
        <h6 className="bold mb-3">טבלה גבייה חודשית</h6>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>פעולות</th>
              <th>פרוייקט</th>
              <th>חודש</th>
              <th>שנה</th>
              <th>כמות שנגבה</th>
              <th>עודכן לאחרונה</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((collection, index) => (
              <tr key={index}>
                <td>
                  <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); handleShowMonthlyCollectionModal(collection); }}>עריכה</button>
                </td>
                <td>{collection.project.name}</td> {/* Display project name instead of ID */}
                <td>{collection.month}</td>
                <td>{collection.year}</td>
                <td>{collection.amount_collected}</td>
                <td>{collection.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex flex-column justify-content-between mb-3">
          <div className="col-md-3 ml-1">
            <label>כמות גביות להציג</label>
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
          <div></div>
        </div>
      </div>
      {showMonthlyCollectionModal && (
        <MonthlyCollectionModal 
          show={showMonthlyCollectionModal} 
          onHide={() => setShowMonthlyCollectionModal(false)} 
          projectId={currentCollection?.project_id} 
          existingCollection={currentCollection} // Pass the current collection if editing
          onSuccess={fetchCollections} // Refresh the table after updating or creating a collection
        />
      )}
    </>
  );
}

export default MonthlyCollectionTable;
