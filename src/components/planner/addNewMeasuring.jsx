import React, { useState } from 'react';
import amediProfileImg from '../../assets/img/amediProfileImg.webp'
import { convertHtmlToText } from "../Header/NotificationsDropdown";
import { useTranslation } from 'react-i18next';

// any measury update will change the status of the project

function AddNewMeasuring({ userInfo }) {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState('');
  const availableProducts = ['Product1', 'Product2', 'Product3']; // Example list of products

  const handleAddProduct = () => {
    if (productInput && !products.includes(productInput)) {
      setProducts([...products, productInput]);
      setProductInput('');
    }
  };

  const handleRemoveProduct = (product) => {
    setProducts(products.filter(p => p !== product));
  };

  return (
    
    <div className="bg-white rounded p-3 shadow-sm">
      <h6 className="bold mb-3">{t('addNewProject.measuring')}</h6>
      <form>

        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">{t('addNewProject.project_name')}</label>
          <input type="text" className="form-control" id="projectName" />
        </div>

        <div className="mb-3">
          <label htmlFor="fileUpload" className="form-label">{t('addNewProject.upload_file')}</label>
          <input type="file" className="form-control" id="fileUpload" accept=".pdf,.doc,.docx" />
        </div>
        <div className="mb-3">
          <label htmlFor="productInput" className="form-label">{t('addNewProject.products')}</label>
          <input 
            type="text" 
            className="form-control mb-2" 
            id="productInput" 
            value={productInput}
            onChange={(e) => setProductInput(e.target.value)} 
            list="productList"
            placeholder={t('addNewProject.filter_products')}
          />
          <datalist id="productList">
            {availableProducts.map((product, index) => (
              <option key={index} value={product} />
            ))}
          </datalist>
          <button type="button" className="btn btn-primary mb-3" onClick={handleAddProduct}>{t('addNewProject.add_product')}</button>
          <ul className="list-group">
            {products.map((product, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {product}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveProduct(product)}>&times;</button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="btn btn-success">{t('addNewProject.measuring_status')}</button>
      </form>
    </div>
  );
}

export default AddNewMeasuring