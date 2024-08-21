import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { generateAccountDetailsPdf } from '../../api/pdf'; // You'll need to implement this API function

function AccountDetailsPdfModal({ show, onHide }) {
    const [formData, setFormData] = useState({
        clientName: '',
        projectName: '',
        company: '',
        city: '',
        phone: '',
        email: '',
        createdBy: '',
        products: [
            { productName: '', unitOfMeasure: '', quantity: '', unitPrice: '', total: '' },
        ],
        works: [
            { month: '', product: '', installationPlace: '', unitOfMeasure: '', quantity: '', amount: '', amountWithVat: '' },
        ]
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
            products: [...formData.products, { productName: '', unitOfMeasure: '', quantity: '', unitPrice: '', total: '' }],
        });
    };

    const removeProduct = (index) => {
        const updatedProducts = [...formData.products];
        updatedProducts.splice(index, 1);
        setFormData({ ...formData, products: updatedProducts });
    };

    const handleWorkChange = (index, e) => {
        const { name, value } = e.target;
        const updatedWorks = [...formData.works];
        updatedWorks[index][name] = value;
        setFormData({ ...formData, works: updatedWorks });
    };

    const addWork = () => {
        setFormData({
            ...formData,
            works: [...formData.works, { month: '', product: '', installationPlace: '', unitOfMeasure: '', quantity: '', amount: '', amountWithVat: '' }],
        });
    };

    const removeWork = (index) => {
        const updatedWorks = [...formData.works];
        updatedWorks.splice(index, 1);
        setFormData({ ...formData, works: updatedWorks });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await generateAccountDetailsPdf(formData);
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
                <Modal.Title>יצירת פירוט חשבון</Modal.Title>
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
                        <Form.Label>נוצר על ידי</Form.Label>
                        <Form.Control
                            type="text"
                            name="createdBy"
                            value={formData.createdBy}
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
                    {formData.products.map((product, index) => (
                        <div key={index}>
                            <h5>מוצר {index + 1}</h5>
                            <Form.Group>
                                <Form.Label>שם מוצר</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productName"
                                    value={product.productName}
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
                                <Form.Label>מחיר ליחידה</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="unitPrice"
                                    value={product.unitPrice}
                                    onChange={(e) => handleProductChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>סה"כ</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="total"
                                    value={product.total}
                                    onChange={(e) => handleProductChange(index, e)}
                                    required
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
                    <hr />
                    {formData.works.map((work, index) => (
                        <div key={index}>
                            <h5>עבודה {index + 1}</h5>
                            <Form.Group>
                                <Form.Label>חודש</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="month"
                                    value={work.month}
                                    onChange={(e) => handleWorkChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>מוצר</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="product"
                                    value={work.product}
                                    onChange={(e) => handleWorkChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>מקום התקנה</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="installationPlace"
                                    value={work.installationPlace}
                                    onChange={(e) => handleWorkChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>יחידת מידה</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="unitOfMeasure"
                                    value={work.unitOfMeasure}
                                    onChange={(e) => handleWorkChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>כמות</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={work.quantity}
                                    onChange={(e) => handleWorkChange(index, e)}
                                    required
                                />
                            </Form.Group>
                          
                            <Form.Group>
                                <Form.Label>סכום </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    value={work.amount}
                                    onChange={(e) => handleWorkChange(index, e)}
                                    required
                                />
                            </Form.Group>
                            {formData.works.length > 1 && (
                                <Button variant="danger" onClick={() => removeWork(index)}>
                                    הסרת עבודה
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button variant="secondary" onClick={addWork}>
                        הוספת עבודה
                    </Button>
                    <Button variant="primary" type="submit" className="mt-3">
                        בניית פירוט חשבון
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

export default AccountDetailsPdfModal;
