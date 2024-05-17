import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header/Header';
import { getProducts } from '../../api/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faBars, faEdit } from '@fortawesome/free-solid-svg-icons';
import AddProductModal from '../../components/AddProductModal';

function Products() {

    const [products, setProducts] = useState([])
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    useEffect(() => {
        const fetchedProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchedProducts();
    }, []);


    const openAddProductModal = () => {
        setShowAddProductModal(true);
    }


    return (

        <>

            <div className='d-flex justify-content-center pt-3 pb-4'>
                <button className='btn btn-basic bg-white shadow-sm medium' onClick={openAddProductModal}><span className='text-primary'><FontAwesomeIcon icon={faPlus} className='pe-1' /> Add Product</span></button>
            </div>

            <div className="container">
                <div className="row pt-4">
                    {products.map(product => (
                        <div className="col-md-3" key={product.id}>
                            <div className="card border-0 bg-gray bg-gray-hover pointer p-3 w-100">
                                <h4>{product.name}</h4>
                                <p className='medium text-muted'>{product.description}</p>
                                <h5 className='text-success'>${product.price}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <AddProductModal products={products} setProducts={setProducts} showAddProductModal={showAddProductModal} setShowAddProductModal={setShowAddProductModal} />

        </>
    )
}

export default Products;
