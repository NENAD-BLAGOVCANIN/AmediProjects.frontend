import React, { useState , useEffect  } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Assuming you have react-toastify installed
import { generatePdf , fetchPriceOffers } from '../../api/pdf'; // Import the API function
import PriceOfferPreview from './PriceOfferPreview';

function PdfFormPage() {
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

    const [showPreview, setShowPreview] = useState(false);
    const [priceOffers, setPriceOffers] = useState([]);
    const [selectedOfferId, setSelectedOfferId] = useState('');
    const [freeTextInput, setFreeTextInput] = useState('');

// start style
const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    overflowY: 'auto',
  };
  
  const modalContentStyle = {
    backgroundColor: '#fff',
    margin: '5% auto',
    padding: '20px',
    width: '80%',
    maxWidth: '800px',
    position: 'relative',
  };
  
  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
  };
  
// end style

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

    useEffect(() => {
        loadPriceOffers();
    }, []);

    const loadPriceOffers = async () => {
        try {
            const response = await fetchPriceOffers(); // API call to fetch PriceOffers
            setPriceOffers(response.data);
        } catch (error) {
            toast.error('Error loading PriceOffers');
        }
    };


    const handleSelectOffer = (offerId) => {
        const selectedOffer = priceOffers.find((offer) => offer.id === offerId);
        if (selectedOffer) {
            setFormData({
                ...formData,
                clientName: selectedOffer.clientName,
                projectName: selectedOffer.projectName,
                company: selectedOffer.company,
                city: selectedOffer.city,
                phone: selectedOffer.phone,
            });
        }
    };
  

    const addProduct = () => {
        setFormData({
            ...formData,
            products: [...formData.products, { description: '', price: '', unitOfMeasure: '', quantity: '', remarks: '' }],
        });
    };

    const handleFreeTextImport = () => {
        if (!freeTextInput.trim()) {
            toast.error('Please enter free text');
            return;
        }

        const lines = freeTextInput.trim().split('\n');
        const importedProducts = [];

        lines.forEach((line, index) => {
            const parts = line.split(',');
            if (parts.length < 4) {
                toast.error(`Error in line ${index + 1}: Not enough fields.`);
                return;
            }

            const [description, price, unitOfMeasure, quantity, remarks = ''] = parts.map((part) => part.trim());
            const productPrice = parseFloat(price);
            const productQuantity = parseFloat(quantity);
            
            // if (isNaN(productPrice) || isNaN(productQuantity)) {
            //     toast.error(`Error in line ${index + 1}: Price or quantity is not a valid number.`);
            //     return;
            // }

            importedProducts.push({
                description,
                price: productPrice,
                unitOfMeasure,
                quantity: productQuantity,
                remarks,
            });
        });

        if (importedProducts.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                products: [...prevData.products, ...importedProducts],
            }));
            setFreeTextInput('');
            toast.success('Products imported successfully.');
        }
    };

    const handlePreview = async () => {
        try {
            setShowPreview(true);
            // await generatePdf({ ...formData, preview: true });
            toast.success('PDF preview generated');
        } catch (error) {
            toast.error('Error generating PDF preview');
        }
    };

    const removeProduct = (index) => {
        const updatedProducts = [...formData.products];
        updatedProducts.splice(index, 1);
        setFormData({ ...formData, products: updatedProducts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Calculate totals
          const subtotal = formData.products.reduce((sum, item) => sum + (parseFloat(item.price) * parseFloat(item.quantity) || 0), 0);
          const vat = subtotal * 0.17;
          const totalWithVat = subtotal + vat;
      
          // Create data object to send to the backend
          const data = {
            ...formData,
            subtotal,
            vat,
            totalWithVat,
          };
      
          const response = await generatePdf(data);
          toast.success('הצעת מחיר נשלחה בהצלחה');
        } catch (error) {
          toast.error('Error generating PDF');
        }
      };
      

    return (
        <Container dir="rtl" className="bg-white rounded p-3 shadow-sm mt-4">
            <h1 className="mb-4">יצירת הצעת מחיר</h1>

            {/* Select Price Offer */}
            <Form.Group className="mb-4">
                <Form.Label>טעינת הצעת מחיר קיימת</Form.Label>
                <Form.Select
                    value={selectedOfferId}
                    onChange={(e) => {
                        setSelectedOfferId(e.target.value);
                        handleSelectOffer(e.target.value);
                    }}
                >
                    <option value="">בחר הצעת מחיר</option>
                    {priceOffers.map((offer) => (
                        <option key={offer.id} value={offer.id}>
                            {offer.clientName} - {offer.projectName}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
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
                    </div>
                    <div className="col-md-6 mb-3">
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
                    </div>
                    <div className="col-md-6 mb-3">
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
                    </div>
                    <div className="col-md-6 mb-3">
                        <Form.Group>
                            <Form.Label>עיר</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-6 mb-3">
                        <Form.Group>
                            <Form.Label>טלפון</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-6 mb-3">
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
                    </div>
                    <div className="col-md-6 mb-3">
                        <Form.Group>
                            <Form.Label>נכתב ע"י</Form.Label>
                            <Form.Control
                                type="text"
                                name="writtenBy"
                                value={formData.writtenBy}
                                onChange={handleChange}
                                
                            />
                        </Form.Group>
                    </div>
                </div>

                <h5 className="mt-4">פרטי מוצרים</h5>
                {formData.products.map((product, index) => (
                    <div key={index} className="border p-3 mb-3">
                        <h6>מוצר {index + 1}</h6>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <Form.Group>
                                    <Form.Label>תיאור מוצר</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={product.description}
                                        onChange={(e) => handleProductChange(index, e)}
                                        
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-2 mb-3">
                                <Form.Group>
                                    <Form.Label>מחיר</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        value={product.price}
                                        onChange={(e) => handleProductChange(index, e)}
                                        
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-2 mb-3">
                                <Form.Group>
                                    <Form.Label>יחידות מידה</Form.Label>
                                    <Form.Select
                                        name="unitOfMeasure"
                                        value={product.unitOfMeasure}
                                        onChange={(e) => handleProductChange(index, e)}
                                        
                                    >
                                        <option value="">בחר יחידת מידה</option>
                                        <option value="מ.א">מ"א</option>
                                        <option value="מ.ר">מ"ר</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-2 mb-3">
                                <Form.Group>
                                    <Form.Label>כמות</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={(e) => handleProductChange(index, e)}
                                        
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-2 mb-3">
                                <Form.Group>
                                    <Form.Label>הערות</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="remarks"
                                        value={product.remarks}
                                        onChange={(e) => handleProductChange(index, e)}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        {formData.products.length > 1 && (
                            <Button variant="danger" onClick={() => removeProduct(index)} className="mb-3">
                                הסרת מוצר
                            </Button>
                        )}
                    </div>
                ))}

                <Button variant="secondary" onClick={addProduct} className="mb-3">
                    הוספת מוצר
                </Button>

                {/* Free text import */}
                <Form.Group className="mb-3">
                    <Form.Label>ייבוא פרטי מוצרים מטקסט חופשי</Form.Label>
                    <p>תיאור מוצר, מחיר, יחידות מידה, כמות, הערות </p>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={freeTextInput}
                        onChange={(e) => setFreeTextInput(e.target.value)}
                        placeholder="תיאור מוצר, מחיר, יחידות מידה, כמות, הערות"
                    />
                    <Button variant="primary" onClick={handleFreeTextImport} className="mt-2">
                        ייבא פריטים מטקסט חופשי
                    </Button>
                </Form.Group>

                {/* Submit and preview buttons */}
                <Button variant="success" type="submit">
                    בניית הצעת מחיר
                </Button>
                <Button variant="info" onClick={handlePreview} className="ms-2">
                    תצוגה מקדימה
                </Button>
            </Form>
            {showPreview && (
  <div className="preview-modal" style={modalStyle}>
    <div className="preview-content" style={modalContentStyle}>
      <button onClick={() => setShowPreview(false)} style={closeButtonStyle}>סגור תצוגה מקדימה</button>
      <PriceOfferPreview data={formData} />
    </div>
  </div>
)}

        </Container>
        
    );
}

export default PdfFormPage;
