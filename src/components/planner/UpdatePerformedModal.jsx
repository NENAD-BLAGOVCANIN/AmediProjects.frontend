import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateProduction as updateProductionAPI } from '../../api/production'; // Import the API function

function UpdatePerformedModal({ production, show, setShow, updateProduction }) {
  const [performedBy, setPerformedBy] = useState(production.performed_by);
  const [status, setStatus] = useState(production.status);

  const handleSave = async () => {
    try {
      // Prepare the updated production data
      const updatedProductionData = { performed_by: performedBy, status };

      // Call the API to update the production
      const updatedProduction = await updateProductionAPI(updatedProductionData, production.id);
      
      // Update the state in the parent component
      updateProduction(updatedProduction);

      setShow(false); // Close the modal
    } catch (error) {
      console.error('Update failed:', error);
      // Optionally, handle error feedback here
    }
  };

  return (
    show && (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">עדכן סטטוס וביצוע ע"י</h5>
              <button type="button" className="close" onClick={() => setShow(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="performedBy">ביצוע ע"י</label>
                <input
                  type="text"
                  className="form-control"
                  id="performedBy"
                  value={performedBy}
                  onChange={(e) => setPerformedBy(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">סטטוס</label>
                <select
                  id="status"
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="new">חדש</option>
                  <option value="planning">תכנון</option>
                  <option value="measuring">מדידה</option>
                  {/* Add other statuses if needed */}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
                ביטול
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

UpdatePerformedModal.propTypes = {
  production: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateProduction: PropTypes.func.isRequired,
};

export default UpdatePerformedModal;
