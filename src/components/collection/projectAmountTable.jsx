import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCollections, updateArchiveStatus } from '../../api/collections';
import UpdateCollectionModal from '../UpdateCollectionModal';
import CreateProjectModal from './CreateProjectModal';
import MonthlyCollectionModal from './MonthlyCollectionModal'; // Import the MonthlyCollectionModal
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function ProjectAmountTable() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateCollectionModal, setShowUpdateCollectionModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showMonthlyCollectionModal, setShowMonthlyCollectionModal] = useState(false); // State to control the MonthlyCollectionModal
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  const fetchCollections = async () => {
    try {
      const fetchedCollections = await getCollections();
      const activeCollections = fetchedCollections.filter(collection => collection.is_archive !== 1);
      setProjects(activeCollections);
      setFilteredProjects(activeCollections);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const handleShowUpdateCollectionModal = (collection) => {
    setCurrentCollection(collection);
    setShowUpdateCollectionModal(true);
  };

  const handleShowMonthlyCollectionModal = (project) => {
    setCurrentCollection(project);
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

  const handleArchive = async (id) => {
    try {
      await updateArchiveStatus(id, { is_archive: 1 });
      fetchCollections();
    } catch (error) {
      console.error('Error updating archive status:', error);
    }
  };

  const toggleModal = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      document.documentElement.style.setProperty("--sidebar-width", "0");
    } else {
      document.documentElement.style.setProperty("--sidebar-width", "236px");
    }
  };

  const handleShowCreateProjectModal = () => {
    setShowCreateProjectModal(true);
  };

  const handleHideCreateProjectModal = () => {
    setShowCreateProjectModal(false);
  };

  const handleProjectCreated = () => {
    fetchCollections(); // Refresh the table after the project is created
    setShowCreateProjectModal(false); // Close the modal
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
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faBars} />  סגירה / פתיחת תפריט צד
        </button>
        <button className="btn btn-primary" onClick={handleShowCreateProjectModal}>
          יצירת פרוייקט חדש
        </button>
      </div>
      <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
        <h6 className="bold mb-3">{t('projects.delivered_projects')}</h6>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>פעולות</th>
              <th>מספר</th>
              <th>שם חברה</th>
              <th>מנהל פרוייקט</th>
              <th>שם פרוייקט</th>
              <th>נייד מנהל פרוייקט</th>
              <th>אחראי גבייה</th>
              <th>אימייל</th>
              <th>תנאי תשלום</th>
              <th>נייד מנהל חשבונות</th>
              <th>תאריך הוצאת חשבונית אחרון</th>
              <th>חוב</th>
              <th>תאריך גבייה אחרון</th>
              <th>קיזוז מצטבר</th>
              <th>עכבון 5%</th>
              <th>קיזוז במקום ערבות</th>
              <th>ערבות ביצוע עם תאריך סיום</th>
              <th>אופן צורת תשלום</th>
              <th>תאריך שליחת פירוט אחרון</th>
              <th>תאריך הוצאת חשונות אחרון</th>
              <th>תאריך תשלום עדיתי</th>
              <th>תאריך תשלום מוסכם</th>
              <th>עדכון גבייה חודשי</th> {/* Add column for the monthly collection */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((project, index) => (
              <tr key={index}>
                <td>
                  <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); handleShowUpdateCollectionModal(project); }}>עריכה</button>
                  <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleArchive(project.id); }}>סיום</button>
                </td>
                <td>{project.id}</td>
                <td>{project.company_name}</td>
                <td>{project.contact_person}</td>
                <td>{project.project_name}</td>
                <td>{project.project_manager_mobile}</td>
                <td>{project.collection_contact}</td>
                <td>{project.email}</td>
                <td>{project.paymnet_plus}</td>
                <td>{project.accounting_manager_mobile}</td>
                <td>{project.last_invoice_issuance_date}</td>
                <td>{project.debt}</td>
                <td>{project.last_execution_date}</td>
                {/* <td>{project.amount_collected_this_month}</td> */}
                <td>{project.cumulative_offset}</td>
                <td>{project.retention_5}</td>
                <td>{project.offset_instead_of_guarantee}</td>
                <td>{project.Offset_instead_of_guarantee_before_vat}</td>
                <td>{project.payment_status}</td>
                <td>{project.guarantee_end_date}</td>
                <td>{project.Last_detail_sent_date}</td>
                <td>{project.Last_invoice_issue_date}</td>
                <td>{project.agreed_payment_date}</td>
                <td>
                  <button className="btn btn-info" onClick={(e) => { e.stopPropagation(); handleShowMonthlyCollectionModal(project); }}>
                    עדכון גביה חודשי
                  </button>
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
      {showCreateProjectModal && (
        <CreateProjectModal 
          show={showCreateProjectModal} 
          onHide={handleHideCreateProjectModal} 
          onSuccess={handleProjectCreated} // Handle project creation and refresh the table
        />
      )}
      {showMonthlyCollectionModal && (
        <MonthlyCollectionModal 
          show={showMonthlyCollectionModal} 
          onHide={() => setShowMonthlyCollectionModal(false)} 
          projectId={currentCollection?.id} 
          onSuccess={fetchCollections} // Refresh the table after updating the collection
        />
      )}
    </>
  );
}

export default ProjectAmountTable;
