import React, { useState , useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { getUsers } from '../../api/user';
import {getProducts} from '../../api/products.js'
import {saveProject} from '../../api/project.js'
import { toast } from 'react-toastify';

function AddNewProject({ userInfo }) {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [usersList, setUserList] = useState([]);
  const [productInput, setProductInput] = useState('');
  const [UsersInput, setUsersInput] = useState('');
  const [availableProducts, setAvailableProducts] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      console.log(response);
      setAvailableProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setAvailableUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const [formData, setFormData] = useState({
    companyName: '',
    projectName: '',
    place: '',
    contactPerson: '',
    phone: '',
    description: '',
    file: null,
  });

  const handleAddProduct = () => {
    if (productInput && !products.includes(productInput)) {
      setProducts([...products, productInput]);
      setProductInput('');
    }
  };
  const handleAddUser = () => {
    if (UsersInput && !usersList.includes(UsersInput)) {
      setUserList([...usersList, UsersInput]);
      setUsersInput('');
    }
  };

  const handleRemoveUsers = (user) => {
    setUserList(usersList.filter(p => p !== user));
  };
  const handleRemoveProduct = (product) => {
    setProducts(products.filter(p => p !== product));
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      products,
      users: usersList,
    };
    try {
      await saveProject(projectData);
      toast.success(t('addNewProject.success_message'));
      
    } catch (error) {
      toast.error(t('addNewProject.error_message'));
    }
  };

  return (
    
    <div className="bg-white rounded p-3 shadow-sm">
      <h6 className="bold mb-3">{t('addNewProject.add_new_project')}</h6>
      <form>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">{t('addNewProject.company_name')}</label>
          <input type="text" className="form-control" id="companyName" />
        </div>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">{t('addNewProject.project_name')}</label>
          <input type="text" className="form-control" id="projectName" />
        </div>
        <div className="mb-3">
          <label htmlFor="place" className="form-label">{t('addNewProject.place')}</label>
          <input type="text" className="form-control" id="place" />
        </div>
        <div className="mb-3">
          <label htmlFor="contactPerson" className="form-label">{t('addNewProject.contact_person')}</label>
          <input type="text" className="form-control" id="contactPerson" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">{t('addNewProject.phone')}</label>
          <input type="text" className="form-control" id="phone" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">{t('addNewProject.description')}</label>
          <textarea className="form-control" id="description" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">{t('addNewProject.file')}</label>
          <input type="file" className="form-control" id="file" accept=".pdf,.doc,.docx" />
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
        <div className="mb-3">
          <label htmlFor="UsersInput" className="form-label">{t('addNewProject.filter_users')}</label>
          <input 
            type="text" 
            className="form-control mb-2" 
            id="UsersInput" 
            value={UsersInput}
            onChange={(e) => setUsersInput(e.target.value)} 
            list="UsersInput"
            placeholder={t('addNewProject.filter_users')}
          />
          <datalist id="UsersInput">
            {availableUsers.map((user, index) => (
              <option key={index} value={user.name} />
            ))}
          </datalist>
         {/* add user */}
          <button type="button" className="btn btn-primary mb-3" onClick={handleAddUser}>{t('addNewProject.filter_users')}</button>
          <ul className="list-group">
            {usersList.map((user, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {user}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveUsers(user)}>&times;</button>
              </li>
            ))}
          </ul>

        </div>
        <button type="submit" className="btn btn-success">{t('addNewProject.submit')}</button>
      </form>
    </div>
  );
}

export default AddNewProject