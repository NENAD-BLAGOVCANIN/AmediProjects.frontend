import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function PdfPreviewModal({ show, onHide, pdfUrl }) {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Preview PDF</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {pdfUrl ? (
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        title="PDF Preview"
                    />
                ) : (
                    <p>Loading PDF...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => window.open(pdfUrl)}>
                    Download PDF
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PdfPreviewModal;
