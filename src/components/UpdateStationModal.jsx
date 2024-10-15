import React, { useState, useEffect } from 'react';
import { getStations, updateStation } from '../api/station';

function UpdateStationModal({ showUpdateStationModal, setShowUpdateStationModal, currentStation, setCurrentStation, fetchStations }) {
  const [stations, setStations] = useState([]);
  const [stationId, setStationId] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [installer, setInstaller] = useState(''); // Add installer state
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log("currentStation =====>",currentStation)
    if (currentStation) {
      setStationId(currentStation.station_id || '');
      setStatus(currentStation.status || '');
      setDueDate(currentStation.due_date || '');
      setInstaller(currentStation.project_manager_name || ''); // Initialize installer state
    }
    console.log()
  }, [currentStation]);

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await getStations();
        // console.log('Fetched Stations:', data.stations);
        setStations(data.stations);
      } catch (error) {
        setErrors([error.message]);
      }
    };
    fetchStationsData();
  }, []);

  const handleSave = async () => {
    try {
      console.log('Current Station:', currentStation);

      if (!currentStation.project_id) {
        throw new Error('project_id is missing in currentStation.pivot');
      }
      console.log(currentStation.project_id,"<----------------------------currentStation.project_id,")
  
      if (stationId) { // Only check if stationId is present
        await updateStation({
            station_id: stationId,
            project_id: currentStation.project_id,
            status: status || null, // Allow null values
            due_date: dueDate || null, // Allow null values
            installer: installer || null // Allow null values
        });
        // Close the modal after saving
        setShowUpdateStationModal(false);
        setCurrentStation(null);
        setErrors([]);
        fetchStations(); // Refresh the stations after saving
      } else {
        setErrors(['Please fill in all fields']);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const handleClose = () => {
    setShowUpdateStationModal(false);
    setCurrentStation(null);
  };

  return (
    showUpdateStationModal && (
      <div className="modal fade show d-block" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">עדכון  פרוייקט</h5>
              <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="stationId">תחנה</label>
                <select
                  className="form-control"
                  id="stationId"
                  value={stationId}
                  onChange={(e) => setStationId(e.target.value)}
                >
                  <option value=''>בחר תחנה</option>
                  {stations.map((station, index) => (
                    <option key={index} value={station.station_id}>
                      {station.station_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">סטטוס</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  placeholder="הכנס הערה"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">תאריך סיום</label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="installer">מתקין</label> {/* Add Hebrew label for installer */}
                <input
                  type="text"
                  className="form-control"
                  id="installer"
                  placeholder="שם מתקין "
                  value={installer}
                  onChange={(e) => setInstaller(e.target.value)} // Update installer state
                />
              </div>
              {errors.length > 0 && (
                <div className="text-danger">
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                סגור
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                שמור 
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default UpdateStationModal;
