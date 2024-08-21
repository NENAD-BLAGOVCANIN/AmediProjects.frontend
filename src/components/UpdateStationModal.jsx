import React, { useState, useEffect } from 'react';
import { getStations, updateStation } from '../api/station';

function UpdateStationModal({ showUpdateStationModal, setShowUpdateStationModal, currentStation, setCurrentStation, fetchStations }) {
  const [stations, setStations] = useState([]);
  const [stationId, setStationId] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentStation) {
      setStationId(currentStation.station_id || '');
    }
  }, [currentStation]);

  useEffect(() => {
    const fetchStationsData = async () => {
      try {
        const data = await getStations();
        console.log('Fetched Stations:', data.stations);
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

      if (!currentStation.pivot.project_id) {
        throw new Error('project_id is missing in currentStation.pivot');
      }

      if (stationId) {
        await updateStation(stationId, currentStation.pivot.project_id);
        // Close the modal after saving
        console.log(currentStation.pivot.project_id);
        setShowUpdateStationModal(false);
        setCurrentStation(null);
        setErrors([]);
        fetchStations(); // Refresh the stations after saving
      } else {
        setErrors(['Please select a station']);
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
              <h5 className="modal-title">שינוי סטטוס פרוייקט</h5>
              <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="stationId">סטטוס פרוייקט</label>
                <select
                  className="form-control"
                  id="stationId"
                  value={stationId}
                  onChange={(e) => setStationId(e.target.value)}
                >
                  <option value=''>Select Station</option>
                  {stations.map((station, index) => (
                    <option key={index} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
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
