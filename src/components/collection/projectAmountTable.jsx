import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCollections } from '../../api/collections'; // Adjust the path as necessary
import UpdateCollectionModal from '../UpdateCollectionModal';

function ProjectAmountTable() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [collections, setCollections] = useState([]);
  const [showUpdateCollectionModal, setShowUpdateCollectionModal] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
        try {
            const fetchedCollections = await getCollections();
            setCollections(fetchedCollections);
            setProjects(fetchedCollections);
        } catch (error) {
            console.error('Error fetching collections:', error);
        }
    };

    fetchCollections();
  }, []);

  const handleShowUpdateCollectionModal = (collection) => {
    setCurrentCollection(collection);
    setShowUpdateCollectionModal(true);
  };

  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={() => handleShowUpdateCollectionModal(null)}>הוספת גבייה</button>
        <UpdateCollectionModal 
            collections={collections} 
            setCollections={setCollections} 
            showUpdateCollectionModal={showUpdateCollectionModal} 
            setShowUpdateCollectionModal={setShowUpdateCollectionModal} 
            currentCollection={currentCollection} 
            setCurrentCollection={setCurrentCollection} 
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
            {projects.map((project, index) => (
              <tr key={index}>
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
    </>
  );
}

export default ProjectAmountTable;
