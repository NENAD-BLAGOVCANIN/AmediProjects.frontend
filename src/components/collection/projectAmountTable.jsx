import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCollections, updateArchiveStatus, updateCollection } from '../../api/collections'; // Assuming `updateCollection` will update fields
import UpdateCollectionModal from '../UpdateCollectionModal';
import CreateProjectModal from './CreateProjectModal';
import MonthlyCollectionModal from './MonthlyCollectionModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function ProjectAmountTable() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateCollectionModal, setShowUpdateCollectionModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showMonthlyCollectionModal, setShowMonthlyCollectionModal] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState({});

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
    console.log("Project selected for modal:", project);  // Log to check what project is passed
    setCurrentCollection(project);  // Ensure the full project data is passed here
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
    fetchCollections();
    setShowCreateProjectModal(false);
  };

  const toggleRowExpansion = (index) => {
    setExpandedRows(prevState => ({
      ...prevState,
      [index]: !prevState[index]  // Toggle the expanded state
    }));
  };

  // Handle checkbox change for have_problem
  const handleProblemChange = async (project) => {
    const updatedProject = { ...project, have_problem: project.have_problem === 1 ? 0 : 1 }; // Toggle the status
    try {
      await updateCollection(updatedProject); // Update the collection with the new have_problem status
      fetchCollections(); // Refresh collections after update
    } catch (error) {
      console.error('Error updating have_problem status:', error);
    }
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
              <th>תאריך גבייה אחרון</th>
              <th>עדכון גבייה חודשי</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((project, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => toggleRowExpansion(index)} style={{ cursor: 'pointer' }}>
                  <td>
                    <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); handleShowUpdateCollectionModal(project); }}>עריכה</button>
                    <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleArchive(project.id); }}>סיום</button>
                  </td>
                  <td>{project.id}</td>
                  <td>{project.company_name}</td>
                  <td>{project.contact_person}</td>
                  <td>{project.project_name}</td>
                  <td>{project.last_execution_date}</td>
                  <td>
                    <button className="btn btn-info" onClick={(e) => { e.stopPropagation(); handleShowMonthlyCollectionModal(project); }}>
                      עדכון גביה חודשי
                    </button>
                  </td>
                </tr>

                {expandedRows[index] && (
  <tr>
    <td colSpan="7">
      <div className="p-3 bg-light">
        <strong>פרטים נוספים:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>נייד מנהל פרוייקט:</strong> {project.project_manager_mobile}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>אחראי גבייה:</strong> {project.collection_contact}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>אימייל:</strong> {project.email}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>תנאי תשלום:</strong> {project.paymnet_plus}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>נייד מנהל חשבונות:</strong> {project.accounting_manager_mobile}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>תאריך הוצאת חשבונית אחרון:</strong> {project.last_invoice_issuance_date}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>חוב:</strong> {project.debt}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>קיזוז מצטבר:</strong> {project.cumulative_offset}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>ערבות ביצוע עם תאריך סיום:</strong> {project.guarantee_end_date}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>תאריך תשלום מוסכם:</strong> {project.agreed_payment_date}
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <label>
              <input
                type="checkbox"
                checked={project.have_problem === 1}
                onChange={(e) => { e.stopPropagation(); handleProblemChange(project); }}
              />
              {' '}<strong>בעיה בפרוייקט</strong>
            </label>
          </li>
        </ul>
      </div>
    </td>
  </tr>
)}

              </React.Fragment>
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
              fetchCollections(); 
          }} 
          currentCollection={currentCollection} 
          setCurrentCollection={setCurrentCollection} 
          setCollections={setProjects} 
          collections={projects}
          onSuccess={fetchCollections}
        />
      )}
      {showCreateProjectModal && (
        <CreateProjectModal 
          show={showCreateProjectModal} 
          onHide={handleHideCreateProjectModal} 
          onSuccess={handleProjectCreated}
        />
      )}
      {showMonthlyCollectionModal && (
        <MonthlyCollectionModal 
          show={showMonthlyCollectionModal} 
          onHide={() => setShowMonthlyCollectionModal(false)} 
          projectId={currentCollection?.id} 
          existingCollection={currentCollection}  // Pass the full collection data here
          onSuccess={fetchCollections}
        />
      )}
    </>
  );
}

export default ProjectAmountTable;
