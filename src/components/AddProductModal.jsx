import React, { useState } from 'react';
import { saveProduct } from '../api/products';

function AddProductModal({ products, setProducts, showAddProductModal, setShowAddProductModal }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState([]);

    const handleCloseAddProductModal = () => {
        setShowAddProductModal(false);
    };

    const handleSubmit = async () => {
        const product = {
            "name": name,
            "description": description,
            "price": price,
        };

        try {
            const newProduct = await saveProduct(product);
            setProducts([newProduct, ...products]);
            setShowAddProductModal(false);

            setName('');
            setDescription('');
            setPrice('');
            setErrors([]);

        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <>
            <div className={`modal fade ${showAddProductModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: 800, padding: '1.7rem' }}>
                    <div className="modal-content py-3 px-4 border-0 shadow-lg" style={{ maxHeight: 800, overflow: 'auto' }}>
                        <div className="modal-header pb-0 border-0 d-flex align-items-center">
                            <div>
                                <h4 className="modal-title bold m-0">Add Product</h4>
                            </div>
                            <span type="button" className="close ms-auto m-0 text-secondary" onClick={handleCloseAddProductModal} style={{ fontSize: '25pt', fontWeight: '100' }}>
                                <span aria-hidden="true">&times;</span>
                            </span>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-6 p-2'>
                                    <input type="text" className='form-control' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='col-md-6 p-2'>
                                    <input type="number" className='form-control' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className='col-md-12 p-2'>
                                    <textarea className='form-control' style={{height: 130}} placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>


                                {errors && (
                                    <div className="text-danger small">
                                        {errors.description && errors.description.map((errorMessage, index) => (
                                            <span key={index}>{errorMessage}</span>
                                        ))}
                                        {errors.name && errors.name.map((errorMessage, index) => (
                                            <span key={index}>{errorMessage}</span>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className='modal-footer border-0'>
                            <button className='btn btn-primary rounded' onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProductModal;
