import React, { useState, useEffect } from 'react';

function DynamicModal({ show, onHide, currentData, columns, onSave, onUpdate }) {
  const [formData, setFormData] = useState(currentData || {});

  useEffect(() => {
    setFormData(currentData || {});
  }, [currentData]);

  const handleChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        // Update existing item
        await onUpdate(formData);
      } else {
        // Save new item
        await onSave(formData);
      }
      onHide(); // Close modal after submission
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{formData.id ? 'Edit Data' : 'Add Data'}</h5>
            <button type="button" className="close" onClick={onHide}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {columns.map((column, index) =>
                column.key !== 'actions' ? (
                  <div className="form-group" key={index}>
                    <label>{column.label}</label>
                    <input
                      type={column.type || 'text'} // Default type is text
                      className="form-control"
                      placeholder={column.label}
                      value={formData[column.key] || ''}
                      onChange={(e) => handleChange(e, column.key)}
                    />
                  </div>
                ) : null
              )}
              <button type="submit" className="btn btn-primary">
                {formData.id ? 'Update' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicModal;
