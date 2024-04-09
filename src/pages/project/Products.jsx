import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
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
        <div className='page-content-wrapper'>

            <Sidebar />

            <div className='main-content-wrapper'>

                <Header pageTitle="Products" />

                <div className='main-container'>

                    <div className='d-flex justify-content-center pt-3 pb-4'>
                        <button className='btn btn-basic shadow-sm' onClick={openAddProductModal}><span className='text-primary'><FontAwesomeIcon icon={faPlus} className='pe-1' /> Add Product</span></button>
                    </div>

                    <div className="container">
                        <div className="row">
                            {products.map(product => (
                                <div className="col-md-3">
                                    <div className="card">
                                        <h4>{product.name}</h4>
                                        <p>{product.description}</p>
                                        <h5 className='text-primary'>{product.price}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>

            <AddProductModal products={products} setProducts={setProducts} showAddProductModal={showAddProductModal} setShowAddProductModal={setShowAddProductModal} />

        </div>
    )
}

export default Products;
