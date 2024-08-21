import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProducts } from '../../api/products';
import { saveProject } from '../../api/project';
import { toast } from 'react-toastify';

function AddNewProject({ userInfo }) {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setAvailableProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const [formData, setFormData] = useState({
    company_name: '',
    name: '',
    company_id: '',
    location: '',
    amount: '',
    accounting_phone: '',
    accounting_manager_name: '',
    phone: '',
    company_number: '',
    project_manager_name: '',
    project_manager_phone: '',
    project_manager_email: '',
    contact_person: '',
    city: '',
    image: '',
    description: '',
    file_url: null,
  });

  const handleAddProduct = () => {
    if (productInput && priceInput && !products.some(p => p.name === productInput)) {
      setProducts([...products, { name: productInput, price: priceInput }]);
      setProductInput('');
      setPriceInput('');
    }
  };

  const handleRemoveProduct = (product) => {
    setProducts(products.filter(p => p.name !== product.name));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      products,
    };
    try {
      await saveProject(projectData);
      toast.success(t('addNewProject.success_message'));
    } catch (error) {
      toast.error(t('addNewProject.error_message'));
    }
  };

  const handleProductPriceChange = (e, index) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        return { ...product, price: e.target.value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div className="bg-white rounded p-3 shadow-sm">
      <h6 className="bold mb-3">{t('addNewProject.add_new_project')}</h6>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="company_name" className="form-label">{t('addNewProject.company_name')}</label>
          <input 
            type="text" 
            className="form-control" 
            id="company_name" 
            value={formData.company_name} 
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company_id" className="form-label">ח.פ</label>
          <input 
            type="text" 
            className="form-control" 
            id="company_id" 
            value={formData.company_id} 
            onChange={(e) => setFormData({ ...formData, company_id: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">סכום</label>
          <input 
            type="text" 
            className="form-control" 
            id="amount" 
            value={formData.amount} 
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">עיר</label>
          <input 
            type="text" 
            className="form-control" 
            id="city" 
            value={formData.city} 
            onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company_address" className="form-label">כתובת החברה</label>
          <input 
            type="text" 
            className="form-control" 
            id="company_address" 
            value={formData.company_address} 
            onChange={(e) => setFormData({ ...formData, company_address: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="accounting_phone" className="form-label">טלפון הנהלת חשבונות</label>
          <input 
            type="text" 
            className="form-control" 
            id="accounting_phone" 
            value={formData.accounting_phone} 
            onChange={(e) => setFormData({ ...formData, accounting_phone: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="accountEmail" className="form-label">אימייל הנהלת חשבונות</label>
          <input 
            type="text" 
            className="form-control" 
            id="accountEmail" 
            value={formData.accountEmail} 
            onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">{t('addNewProject.project_name')}</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">כתובת האתר</label>
          <input 
            type="text" 
            className="form-control" 
            id="location" 
            value={formData.location} 
            onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="project_manager_phone" className="form-label">מנהל פרוייקט</label>
          <input 
            type="text" 
            className="form-control" 
            id="project_manager_phone" 
            value={formData.project_manager_phone} 
            onChange={(e) => setFormData({ ...formData, project_manager_phone: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactPersonEmail" className="form-label">אימייל מנהל פרוייקט</label>
          <input 
            type="text" 
            className="form-control" 
            id="contactPersonEmail" 
            value={formData.contactPersonEmail} 
            onChange={(e) => setFormData({ ...formData, contactPersonEmail: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">טלפון מנהל פרוייקט</label>
          <input 
            type="text" 
            className="form-control" 
            id="phone" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">{t('addNewProject.description')}</label>
          <textarea 
            className="form-control" 
            id="description" 
            rows="3" 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">{t('addNewProject.file')}</label>
          <input 
            type="file" 
            className="form-control" 
            id="file" 
            accept=".pdf,.doc,.docx" 
            onChange={handleFileChange} 
          />
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
              <option key={index} value={product.name} />
            ))}
          </datalist>
          <input 
            type="text" 
            className="form-control mb-2" 
            id="priceInput" 
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)} 
            placeholder="מחיר ליחידה"
          />
          <button type="button" className="btn btn-primary mb-3" onClick={handleAddProduct}>{t('addNewProject.add_product')}</button>
          <ul className="list-group">
            {products.map((product, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {product.name} - {product.price} ש"ח, מחיר ליחידה
                <input 
                  type="text" 
                  className="form-control" 
                  value={product.price}
                  onChange={(e) => handleProductPriceChange(e, index)}
                  style={{ width: '70px', marginRight: '10px' }}
                />
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveProduct(product)}>&times;</button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="btn btn-success">{t('addNewProject.submit')}</button>
      </form>
    </div>
  );
}

export default AddNewProject;
