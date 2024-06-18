import React, { useState, useEffect } from 'react';
import { saveProduction, updateProduction, deleteProduction } from '../../api/production';
import { useTranslation } from 'react-i18next';

function UpdateProductionModal({ productions, setProductions, showUpdateProductionModal, setShowUpdateProductionModal, currentProduction, setCurrentProduction }) {
  const { t } = useTranslation();
  const [productionData, setProductionData] = useState({
    company: '',
    site_city: '',
    item: '',
    status: '',
    performed_by: '',
    notes: ''
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentProduction) {
      setProductionData(currentProduction);
    }
  }, [currentProduction]);

  const handleCloseUpdateProductionModal = () => {
    setShowUpdateProductionModal(false);
  };

  const handleChange = (e) => {
    setProductionData({ ...productionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let updatedProduction;
      if (currentProduction) {
        updatedProduction = await updateProduction(productionData);
        setProductions(productions.map(prod => (prod.id === updatedProduction.id ? updatedProduction : prod)));
      } else {
        updatedProduction = await saveProduction(productionData);
        setProductions([updatedProduction, ...productions]);
      }
      setShowUpdateProductionModal(false);
      setProductionData({
        company: '',
        site_city: '',
        item: '',
        status: '',
        performed_by: '',
        notes: ''
      });
      setErrors([]);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduction(currentProduction.id);
      setProductions(productions.filter(prod => prod.id !== currentProduction.id));
      setShowUpdateProductionModal(false);
      setProductionData({
        company: '',
        site_city: '',
        item: '',
        status: '',
        performed_by: '',
        notes: ''
      });
      setErrors([]);
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <>
      <div className={`modal fade ${showUpdateProductionModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
          <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
            <div className="modal-header pb-0 border-0 d-flex align-items-center">
              <div>
                <h4 className="modal-title bold m-0">Update Production</h4>
              </div>
              <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseUpdateProductionModal} style={{ fontSize: '25pt', fontWeight: '300' }}>
                <span aria-hidden="true">&times;</span>
              </span>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-md-6 p-2'>
                  <input type="text" className='form-control' placeholder='Company' name='company' value={productionData.company} onChange={handleChange} />
                </div>
                <div className='col-md-6 p-2'>
                  <input type="text" className='form-control' placeholder='Site City' name='site_city' value={productionData.site_city} onChange={handleChange} />
                </div>
                <div className='col-md-6 p-2'>
                  <input type="text" className='form-control' placeholder='Item' name='item' value={productionData.item} onChange={handleChange} />
                </div>
                <div className='col-md-6 p-2'>
                  <input type="text" className='form-control' placeholder='Status' name='status' value={productionData.status} onChange={handleChange} />
                </div>
                <div className='col-md-6 p-2'>
                  <input type="text" className='form-control' placeholder='Performed By' name='performed_by' value={productionData.performed_by} onChange={handleChange} />
                </div>
                <div className='col-md-12 p-2'>
                  <textarea className='form-control' style={{ height: 130 }} placeholder='Notes' name='notes' value={productionData.notes} onChange={handleChange} />
                </div>

                {errors && (
                  <div className="text-danger small">
                    {errors.map((errorMessage, index) => (
                      <span key={index}>{errorMessage}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='modal-footer border-0'>
              <button className='btn btn-primary rounded' onClick={handleSubmit}>Save</button>
              {currentProduction && <button className='btn btn-danger rounded' onClick={handleDelete}>Delete</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProductionModal;
