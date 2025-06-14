import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import '../assests/styles/BillPage.css';

const BillPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef();

  const { order, bill } = location.state || {};

  if (!order || !bill) {
    return <h4 className="text-center mt-5">No bill data found. Go back and order food.</h4>;
  }

  const total = bill.totalAmount;
  const tax = bill.tax;
  const discount = bill.discount;
  const grandTotal = total + tax - discount;

  const handleDownload = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'EasyBill-Restaurant-Bill.png';
      link.click();
    });
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <div
        ref={componentRef}
        className="p-4 bg-white shadow"
        style={{
          width: '350px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontFamily: "'Courier New', monospace",
          background: '#fff'
        }}
      >
        <div className="text-center mb-3">
          <h5>EasyBill Restaurant</h5>
          <small>Table: 12 | Guests: 9</small><br />
          <small>Date: {new Date().toLocaleDateString()} | Time: {new Date().toLocaleTimeString()}</small>
        </div>

        <hr />

        <ul className="list-unstyled mb-2">
          {order.map((item, idx) => (
            <li key={idx} className="d-flex justify-content-between">
              <span>{item.quantity} × {item.name}</span>
              <span>₹{(item.quantity * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <hr />

        <div className="d-flex justify-content-between">
          <strong>Subtotal</strong>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <strong>Tax</strong>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <strong>Discount</strong>
          <span>-₹{discount.toFixed(2)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between fs-5">
          <strong>Total</strong>
          <strong>₹{grandTotal.toFixed(2)}</strong>
        </div>

        <div className="text-center mt-3">
          <small>Thank you for dining with us!</small><br />
          <small>Visit Again 😊</small>
        </div>
      </div>

      <div className="text-center mt-4 mb-5">
        <Button variant="primary" className="me-3" onClick={handleDownload}>
          Download Bill as Image
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </Container>
  );
};

export default BillPage;
