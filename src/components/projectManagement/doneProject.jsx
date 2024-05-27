import React, { useState } from 'react';
import amediProfileImg from '../../assets/img/amediProfileImg.webp'
import { convertHtmlToText } from "../Header/NotificationsDropdown";
import { useTranslation } from 'react-i18next';

function SendProject({ userInfo }) {
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
      <h6 className="bold mb-3">מסירת פרוייקט</h6>
      <form>

        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">{t('addNewProject.project_name')}</label>
          <input type="text" className="form-control" id="projectName" />
        </div>

        <div className="mb-3">
          <label htmlFor="fileUpload" className="form-label">{t('addNewProject.upload_file')}</label>
          <input type="file" className="form-control" id="fileUpload" accept=".pdf,.doc,.docx" />
        </div>

        <button type="submit" className="btn btn-success">{t('addNewProject.planing_send')}</button>
      </form>
    </div>
  );
}

export default SendProject