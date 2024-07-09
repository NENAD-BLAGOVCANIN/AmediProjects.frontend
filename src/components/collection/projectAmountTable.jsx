import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCollections } from '../../api/collections'; // Adjust the path as necessary
import UpdateCollectionModal from '../UpdateCollectionModal';

function ProjectAmountTable() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateCollectionModal, setShowUpdateCollectionModal] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Set default items per page to 5

  const fetchCollections = async () => {
    try {
      const fetchedCollections = await getCollections();
      setProjects(fetchedCollections);
      setFilteredProjects(fetchedCollections);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    const results = projects.filter(project =>
      Object.values(project).some(
        value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  const handleShowUpdateCollectionModal = (collection) => {
    setCurrentCollection(collection);
    setShowUpdateCollectionModal(true);
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
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={() => handleShowUpdateCollectionModal(null)}>הוספת גבייה</button>
        <input 
          type="text" 
          placeholder="חיפוש" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="form-control my-3" 
        />
      </div>
      <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
        <h6 className="bold mb-3">{t('projects.delivered_projects')}</h6>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>שם חברה</th>
              <th>אחראי גבייה</th>
              <th>נייד מנהל פרוייקט</th>
              <th>אימייל</th>
              <th>נייד מנהל חשבונות</th>

              <th>מנהל פרוייקט</th>
              <th>שם פרוייקט</th>
              <th>תאריך הוצאת חשבונית אחרון</th>
              <th>יתרה לתשלום</th>
              <th>תנאי גבייה</th>

              <th>חוב</th>
              <th>תאריך גבייה אחרון</th>
              <th>עכבון 5%</th>
              <th>קיזוז מצטבר</th>
              <th>צורת תשלום</th>

              <th>תקשורת אחרונה</th>
              <th>מתי נוצרה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((project, index) => (
              <tr key={index}>
                <td>{project.company_name}</td>
                <td>{project.collection_contact}</td>
                <td>{project.project_manager_mobile}</td>
                <td>{project.email}</td>
                <td>{project.accounting_manager_mobile}</td>

                <td>{project.contact_person}</td>
                <td>{project.project_name}</td>
                <td>{project.last_invoice_issuance_date}</td>
                <td>{project.remaining_amount_to_collect}</td>
                <td>{project.agreed_payment_date}</td>

                <td>{project.debt}</td>
                <td>{project.last_execution_date}</td>
                <td>{project.retention_5}</td>
                <td>{project.cumulative_offset}</td>
                <td>{project.offset_instead_of_guarantee}</td>
                
                <td>{project.payment_status}</td>
                <td>{project.last_connection}</td>
                <td>{project.last_execution_date}</td>
                <td>
                  <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); handleShowUpdateCollectionModal(project); }}>עריכה</button>
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
          <div></div>
        </div>
      </div>
      {showUpdateCollectionModal && (
        <UpdateCollectionModal 
          show={showUpdateCollectionModal} 
          onHide={() => { 
              setShowUpdateCollectionModal(false); 
              fetchCollections(); // Refresh the table after closing the modal 
          }} 
          currentCollection={currentCollection} 
          setCurrentCollection={setCurrentCollection} 
          setCollections={setProjects} 
          collections={projects}
          onSuccess={fetchCollections} // Pass the fetchCollections function as the success callback
        />
      )}
    </>
  );
}

export default ProjectAmountTable;
