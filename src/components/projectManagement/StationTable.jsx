import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { getStations, updateProjectOrder } from '../../api/station';
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
      results = stations.filter(station => station.station_name === stationFilter);
    }
    results = results.map(station => ({
      ...station,
      projects: station.projects.filter(project =>
        project.project_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }));
    setFilteredStations(results);
    setCurrentPage(1);
  }, [searchTerm, stations, stationFilter]);

  const handleShowUpdateStationModal = (station , project) => {
    // console.log("station ---------->",station)
    setCurrentStation({
      ...project,
      station_id: station.station_id,
      station_name: station.station_name
  });
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

  // Handle drag end event
  const onDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStation = stations.find(station => station.station_id.toString() === source.droppableId);
    const destinationStation = stations.find(station => station.station_id.toString() === destination.droppableId);

    const updatedStations = JSON.parse(JSON.stringify(stations)); // Deep clone

    // Remove the project from the source
    const [movedProject] = sourceStation.projects.splice(source.index, 1);

    // Insert the project at the new position
    destinationStation.projects.splice(destination.index, 0, movedProject);

    // Update orders for all affected projects
    if (sourceStation.station_id === destinationStation.station_id) {
      // Reordering within the same station
      destinationStation.projects.forEach((project, index) => {
        project.order = index;
      });
    } else {
      // Moving between stations
      sourceStation.projects.forEach((project, index) => {
        project.order = index;
      });
      destinationStation.projects.forEach((project, index) => {
        project.order = index;
      });
    }

    // Update local state immediately for responsiveness
    setStations(updatedStations);

    // Prepare data for API call
    const projectId = movedProject.project_id;
    const stationId = destinationStation.station_id;
    const newOrder = destination.index;

    try {
      await updateProjectOrder({
        project_id: projectId,
        station_id: stationId,
        new_order: newOrder,
      });
      fetchStations();
    } catch (error) {
      console.error('Error updating project order:', error);
      // Revert the changes in case of an error
    
    }
   
  };
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

  // Categorize stations into "ייצור", "עבודות", and "פינישים"
  const categorizeStations = (stations) => {
    const categories = {
      ייצור: [],
      עבודות: [],
      פינישים: []
    };

    stations.forEach(station => {
      const stationName = station.station_name;
      if (stationName.includes("ייצור")) {
        categories.ייצור.push(station);
      } else if (stationName.includes("עבודות")) {
        categories.עבודות.push(station);
      } else if (stationName.includes("פינישים")) {
        categories.פינישים.push(station);
      } else if (stationName.includes("ללא שיוך")) {
        categories.ייצור.push(station);
      }
    });

    return categories;
  };

  const categorizedStations = categorizeStations(currentItems);

  const renderColumn = (categoryName, stations, color, titleColor) => {
    return (
      <Droppable droppableId={categoryName}>
        {(provided) => (
          <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
            <h4 style={{ backgroundColor: color, padding: '10px', borderRadius: '5px' }}>{categoryName}</h4>
            {stations.map((station) => (
              <div key={station.station_id}>
                <h5 style={{ backgroundColor: titleColor, padding: '5px', borderRadius: '3px' }}>{station.station_name}</h5> {/* Added inline styling */}
                <Droppable droppableId={station.station_id.toString()} type="project">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>שם פרוייקט</th>
                            <th>שם חברה</th>
                            <th>מנהל פרוייקטים</th>
                            <th>תאריך סיום</th>
                            <th>סטטוס</th>
                            <th>מתקין</th>
                            <th>פעולות</th>
                          </tr>
                        </thead>
                        <tbody>
                          {station.projects.map((project, index) => (
                            <Draggable key={project.project_id} draggableId={project.project_id.toString()} index={index}>
                              {(provided) => (
                                <tr
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="project-item"
                                >
                                  <td>{project.project_name}</td>
                                  <td>{project.company_name || 'לא צויין'}</td>
                                  <td>{project.project_manager_name}</td>
                                  <td>{project.due_date || 'לא צויין'}</td>
                                  <td>{project.installer || 'לא צויין'}</td>
                                  <td>{project.status || 'לא צויין'}</td>
                                  <td>
                                    <button className="btn btn-secondary" onClick={() => handleShowUpdateStationModal(station, project)}>עריכה</button>
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

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
            <option key={index} value={station.station_name}>{station.station_name}</option>
          ))}
        </select>
      </div>
      <div className="row">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="col-md-4">
            {renderColumn('ייצור', categorizedStations.ייצור, '#ADD8E6', '#B0E0E6')} {/* Light Blue with Powder Blue */}
          </div>
          <div className="col-md-4">
            {renderColumn('עבודות', categorizedStations.עבודות, '#98FB98', '#C1E1C1')} {/* Pale Green with Light Sea Green */}
          </div>
          <div className="col-md-4">
            {renderColumn('פינישים', categorizedStations.פינישים, '#FFDAB9', '#FFB6C1')} {/* Peach Puff with Light Pink */}
          </div>
        </DragDropContext>
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
