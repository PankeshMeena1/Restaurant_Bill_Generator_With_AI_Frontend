import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assests/styles/OrderPage.css';

const OrderPage = ({ order, setOrder }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (index, operation) => {
    const newOrder = [...order];
    if (operation === 'increment' && newOrder[index]?.quantity < 10) {
      newOrder[index].quantity += 1;
    }
    if (operation === 'decrement' && newOrder[index]?.quantity > 1) {
      newOrder[index].quantity -= 1;
    }
    setOrder(newOrder);
  };

  const handleRemoveItem = (index) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
  };

  const calculateTotal = () => {
    return order?.reduce((acc, item) => acc + (item?.price * item?.quantity), 0);
  };

  const handleGenerateBill = async () => {
    try {
      // Step 1: Create the order
      const items = order.map(item => ({
        foodId: item._id,   // must match your backend schema
        quantity: item.quantity,
      }));
  
      const orderRes = await axios.post('http://localhost:5000/api/orders', { items });
      const orderId = orderRes.data._id;
  
      // Step 2: Generate the bill
      const billRes = await axios.post('http://localhost:5000/api/bills', { orderId });
  
      // Step 3: Navigate to BillPage with details
      navigate('/bill', {
        state: {
          order: order,                   // item details with image, name, price, quantity
          bill: billRes.data              // bill details: totalAmount, tax, discount
        }
      });
  
      setOrder([]); // Optional: Clear cart after bill
    } catch (error) {
      console.error('Error generating bill:', error);
      alert('Failed to generate bill.');
    }
  };
  
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Your Order</h1>
      <Row>
        {order?.map((item, index) => (
          <Col sm={12} md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow-lg border-0 rounded-3">
              <Card.Img variant="top" src={item.image} className="order-image" />
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">{item.name}</Card.Title>
                <Card.Text className="text-muted">₹{item.price}</Card.Text>
                <div className="quantity-control mb-2">
                  <Button variant="outline-primary" onClick={() => handleQuantityChange(index, 'decrement')}>-</Button>
                  <span className="mx-3">{item.quantity}</span>
                  <Button variant="outline-primary" onClick={() => handleQuantityChange(index, 'increment')}>+</Button>
                </div>
                <Card.Text className="fw-bold">Total: ₹{item.price * item.quantity}</Card.Text>
                <Button variant="danger" size="sm" onClick={() => handleRemoveItem(index)}>Remove</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {order?.length > 0 && (
        <div className="text-center mb-5">
          <h4 className="fw-bold mt-3">Grand Total: ₹{calculateTotal()}</h4>
          <Button variant="success" size="lg" className="mt-3" onClick={handleGenerateBill}>Generate Bill</Button>
        </div>
      )}
      {order?.length === 0 && (
        <h5 className="text-center text-muted mt-5">Your order is empty. Go back and add some items.</h5>
      )}
    </Container>
  );
};

export default OrderPage;
