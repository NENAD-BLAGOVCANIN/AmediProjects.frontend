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

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const fetchedCollections = await getCollections();
        setProjects(fetchedCollections);
        setFilteredProjects(fetchedCollections);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

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
      <div className="bg-white rounded p-3 shadow-sm">
        <h6 className="bold mb-3">{t('projects.delivered_projects')}</h6>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>שם פרוייקט</th>
              <th>נייד מנהל פרוייקט</th>
              <th>נייד מנהל חשבונות</th>
              <th>אימייל</th>
              <th>תאריך ביצוע אחרון</th>
              <th>מועד תשלום מוסכם</th>
              <th>איש קשר</th>
              <th>חוב</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <tr key={index} onClick={() => handleShowUpdateCollectionModal(project)}>
                <td>{project.project_name}</td>
                <td>{project.project_manager_mobile}</td>
                <td>{project.accounting_manager_mobile}</td>
                <td>{project.email}</td>
                <td>{project.last_execution_date}</td>
                <td>{project.agreed_payment_date}</td>
                <td>{project.contact_person}</td>
                <td>{project.debt}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleShowUpdateCollectionModal(project)}>עריכה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showUpdateCollectionModal && (
        <UpdateCollectionModal 
          collections={filteredProjects} 
          showUpdateCollectionModal={showUpdateCollectionModal} 
          setShowUpdateCollectionModal={setShowUpdateCollectionModal} 
          currentCollection={currentCollection} 
          setCurrentCollection={setCurrentCollection} 
        />
      )}
    </>
  );
}

export default ProjectAmountTable;
