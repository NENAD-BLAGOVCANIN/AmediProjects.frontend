import React, { useState, useEffect } from 'react';
import { saveProduction, updateProduction } from '../../api/production';
import { getProjects } from '../../api/project';

function UpdateProductionModal({ productions, setProductions, showUpdateProductionModal, setShowUpdateProductionModal, currentProduction, setCurrentProduction }) {
  const [productionData, setProductionData] = useState({
    company: '',
    site_city: '',
    project_id: '',
    item: '',
    status: 'measuring',
    performed_by: '',
    notes: '',
    fileUpload: ''
  });
  const [errors, setErrors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [file, setFile] = useState(null);  // For handling file upload
  const [items, setItems] = useState([
    { name: '', type: '', quantity: 1 },
    { name: '', type: '', quantity: 1 }
  ]);  // Start with 4 items

  useEffect(() => {
    if (currentProduction) {
      setProductionData({
        ...currentProduction,
        project_id: currentProduction.project_id || '',  // Handle empty project_id
      });
      setItems(currentProduction.items || [
        { name: '', type: '', quantity: 1 },
        { name: '', type: '', quantity: 1 }
      ]);  // Pre-fill items if editing
    } else {
      setProductionData({
        company: '',
        site_city: '',
        project_id: '',
        item: '',
        status: 'measuring',
        performed_by: '',
        notes: '',
        fileUpload: '',
        urgency:'low'
      });
    }

    const fetchProjects = async () => {
      try {
        const projectData = await getProjects();
        setProjects(projectData);  // Store projects for the datalist
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [currentProduction]);

  const handleChange = (e) => {
    setProductionData({ ...productionData, [e.target.name]: e.target.value });
  };

  const handleProjectSelect = (e) => {
    const selectedProject = projects.find(project => project.name === e.target.value);
    if (selectedProject) {
      setProductionData({ ...productionData, project_id: selectedProject.id });
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    if (items.length < 10) {
      setItems([...items, { name: '', type: '', quantity: 1 , price:'' }]);  // Add new item
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);  // Set the selected file
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      Object.keys(productionData).forEach((key) => {
        if (productionData[key] !== undefined && productionData[key] !== null) {
          formData.append(key, productionData[key]);
        }
      });
  
      if (file) {
        formData.append('fileUpload', file);
      }
  
      items.forEach((item, index) => {
        formData.append(`items[${index}][name]`, item.name);
        formData.append(`items[${index}][type]`, item.type);
        formData.append(`items[${index}][quantity]`, item.quantity);
      });
  
      let response;
      if (currentProduction && currentProduction.id) {
        response = await updateProduction(formData, currentProduction.id);
      } else {
        response = await saveProduction(formData);
      }
  
      console.log("Server response after submit:", response);  // Log server response
  
      setProductions(prev =>
        currentProduction && currentProduction.id
          ? prev.map(prod => prod.id === response.id ? response : prod)
          : [response, ...prev]
      );
  
      setShowUpdateProductionModal(false);
      setErrors([]);
    } catch (error) {
      console.error(error);
      setErrors([error.message]);
    }
  };
  
  

  
  
  
  

  return (
    <>
      <div className={`modal fade ${showUpdateProductionModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
          <div className="modal-content py-3 px-4 border-0 shadow-lg">
            <div className="modal-header pb-0 border-0 d-flex align-items-center">
              <h4 className="modal-title bold m-0">תוכנית לייצור</h4>
              <span type="button" className="close ms-auto" onClick={() => setShowUpdateProductionModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 p-2">
                  <label>שם חברה</label>
                  <input type="text" className="form-control" name="company" value={productionData.company} onChange={handleChange} />
                </div>
                <div className="col-md-6 p-2">
                  <label>שם פרוייקט</label>
                  <input
                    type="text"
                    className="form-control"
                    name="project_id"
                    value={projects.find(p => p.id === productionData.project_id)?.name || ''}
                    onChange={handleProjectSelect}
                    list="projectList"
                    autoComplete="off"
                  />
                  <datalist id="projectList">
                    {projects.map((project) => (
                      <option key={project.id} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="col-md-6 p-2">
                  <label>עיר</label>
                  <input type="text" className="form-control" name="site_city" value={productionData.site_city} onChange={handleChange} />
                </div>
                <div className="col-md-6 p-2">
                  <label>שלב</label>
                  <select className="form-control" name="status" value={productionData.status} onChange={handleChange}>
                    <option value="measuring">מדידה</option>
                    <option value="planning">תכנון</option>
                    <option value="finished">ייצור</option>
                  </select>
                </div>
                <div className="col-md-6 p-2">
              <label>דחיפות</label>
              <select className="form-control" name="urgency" value={productionData.urgency} onChange={handleChange}>
                <option value="high">גבוהה</option>
                <option value="medium">בינונית</option>
                <option value="low">נמוכה</option>
              </select>
            </div>
                <div className="col-md-6 p-2">
                  <label>שם מודד</label>
                  <input type="text" className="form-control" name="performed_by" value={productionData.performed_by} onChange={handleChange} />
                </div>
                <div className="col-md-12 p-2">
                  <textarea className="form-control" name="notes" value={productionData.notes} onChange={handleChange} placeholder="הערות" />
                </div>
                <div className="col-md-12 p-2">
                  <label>העלה קובץ PDF</label>
                  <input type="file" className="form-control" onChange={handleFileChange} accept=".pdf" />
                </div>

                <div className="col-md-12 p-2">
                  <h5>פריטים</h5>
                  {items.map((item, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-4">
                        <label>שם פריט</label>
                        <input type="text" className="form-control" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                      </div>
                      <div className="col-md-4">
                        <label>סוג פריט</label>
                        <select className="form-control" value={item.type} onChange={(e) => handleItemChange(index, 'type', e.target.value)}>
                          <option value="">בחר סוג</option>
                          <option value="מטר אורך">מטר אורך</option>
                          <option value="מטר רוחב">מטר רוחב</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label>כמות</label>
                        <input type="number" className="form-control" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
                      </div>
                    </div>
                  ))}
                  {items.length < 10 && (
                    <button type="button" className="btn btn-secondary mt-2" onClick={handleAddItem}>
                      הוסף פריט
                    </button>
                  )}
                </div>
              </div>
              {errors.length > 0 && <div className="text-danger small">{errors.join(', ')}</div>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleSubmit}>שמירה</button>
              {currentProduction && <button className="btn btn-secondary" onClick={() => setShowUpdateProductionModal(false)}>סגור</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProductionModal;
