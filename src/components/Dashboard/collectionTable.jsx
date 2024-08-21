import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCollections } from '../../api/collections'; // Adjust the path as necessary


function CollectionTable() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
              <th>מספר</th>
              <th>שם חברה</th>
              <th>שם פרוייקט</th>
               <th>סטטוס</th>
              




  

          
            </tr>
          </thead>
          <tbody>
            {currentItems.map((project, index) => (
              <tr key={index}>
                <td>{project.id}</td>
                <td>{project.company_name}</td>
                <td>{project.project_name}</td>
                <td>{project.payment_status}</td>
  


                {/*  */}


                {/* <td>{project.offset_instead_of_guarantee}</td>  */}
                
                <td>
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

    </>
  );
}

export default CollectionTable;
