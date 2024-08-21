import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Assuming you have react-toastify installed
import { generatePdf } from '../../api/pdf'; // Import the API function

function PdfFormModal({ show, onHide }) {
    const [formData, setFormData] = useState({
        clientName: '',
        projectName: '',
        company: '',
        city: '',
        phone: '',
        email: '',
        writtenBy: '',
        products: [
            { description: '', price: '', unitOfMeasure: '', quantity: '', remarks: '' },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...formData.products];
        updatedProducts[index][name] = value;
        setFormData({ ...formData, products: updatedProducts });
    };

    const addProduct = () => {
        setFormData({
            ...formData,
            products: [...formData.products, { description: '', price: '', unitOfMeasure: '', quantity: '', remarks: '' }],
        });
    };

    const removeProduct = (index) => {
        const updatedProducts = [...formData.products];
        updatedProducts.splice(index, 1);
        setFormData({ ...formData, products: updatedProducts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await generatePdf(formData);
            if (response.ok) {
                toast.success('PDF created successfully!');
                onHide(); // Close the modal after successful PDF generation
            } else {
                toast.error('Failed to create PDF');
            }
        } catch (error) {
            toast.error('Error generating PDF');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>יצירת הצעת</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>שם לקוח</Form.Label>
                        <Form.Control
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>שם פרוייקט</Form.Label>
                        <Form.Control
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>חברה</Form.Label>
                        <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>עיר</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>טלפון</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>אימייל</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>נכתב ע"י</Form.Label>
                        <Form.Control
                            type="text"
                            name="writtenBy"
                            value={formData.writtenBy}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    {formData.products.map((product, index) => (
                        <div key={index}>
                            <h5>Product {index + 1}</h5>
                            <Form.Group>
                                <Form.Label>תיאור מוצר</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={product.description}
                                    onChange={(e) => handleProductChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>מחיר</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={(e) => handleProductChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>יחידות מידה</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="unitOfMeasure"
                                    value={product.unitOfMeasure}
                                    onChange={(e) => handleProductChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>כמות</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={product.quantity}
                                    onChange={(e) => handleProductChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>הערות</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="remarks"
                                    value={product.remarks}
                                    onChange={(e) => handleProductChange(index, e)}
                                />
                            </Form.Group>
                            {formData.products.length > 1 && (
                                <Button variant="danger" onClick={() => removeProduct(index)}>
                                    הסרת מוצר
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button variant="secondary" onClick={addProduct}>
                        הוספת מוצר
                    </Button>
                    <Button variant="primary" type="submit">
                        בניית הצעת מחיר
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    סגירה
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PdfFormModal;
