import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getStations } from '../../api/station';
import UpdateStationModal from '../UpdateStationModal';

function StationTable() {
  const { t } = useTranslation();
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [showUpdateStationModal, setShowUpdateStationModal] = useState(false);
  const [currentStation, setCurrentStation] = useState(null);
  const [stationFilter, setStationFilter] = useState('all');

  const fetchStations = async () => {
    try {
      const fetchedData = await getStations();
      setStations(fetchedData.stations);
      setFilteredStations(fetchedData.stations);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    let results = stations;
    if (stationFilter !== 'all') {
      results = stations.filter(station => station.name === stationFilter);
    }
    results = results.map(station => ({
      ...station,
      projects: station.projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }));
    setFilteredStations(results);
    setCurrentPage(1);
  }, [searchTerm, stations, stationFilter]);

  const handleShowUpdateStationModal = (project) => {
    setCurrentStation(project);
    setShowUpdateStationModal(true);
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

  const handleStationFilterChange = (e) => {
    setStationFilter(e.target.value);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder="חיפוש פרויקט" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="form-control my-3" 
        />
        <label>סנן לפי תחנה:</label>
        <select value={stationFilter} onChange={handleStationFilterChange} className="form-select mb-3">
          <option value="all">כל התחנות</option>
          {stations.map((station, index) => (
            <option key={index} value={station.name}>{station.name}</option>
          ))}
        </select>
      </div>
      <div className="row">
        {currentItems.map((station, index) => (
          <div key={index} className="col-md-4">
            <div className="bg-white rounded p-3 mt-3 shadow-sm">
              <h6 className="bold mb-3">{station.name}</h6>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>שם פרוייקט</th>
                    <th>סטטוס</th>
                    <th>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {station.projects.length > 0 ? (
                    station.projects.map((project, idx) => (
                      <tr key={idx}>
                        <td>{project.name}</td>
                        <td>{project.status}</td>
                        <td>
                          <button className="btn btn-secondary" onClick={() => handleShowUpdateStationModal(project)}>עריכה</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">אין פרויקטים</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex flex-column justify-content-between mb-3 mt-3">
        <div className="col-md-3 ml-1">
          <label>כמות תחנות להציג</label>
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
      </div>
      {showUpdateStationModal && (
        <UpdateStationModal 
          showUpdateStationModal={showUpdateStationModal} 
          setShowUpdateStationModal={setShowUpdateStationModal} 
          currentStation={currentStation} 
          setCurrentStation={setCurrentStation} 
          fetchStations={fetchStations}
        />
      )}
    </>
  );
}

export default StationTable;