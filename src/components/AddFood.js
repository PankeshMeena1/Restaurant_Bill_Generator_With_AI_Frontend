import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    category: 'food',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.error("Please upload an image!");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append('image', imageFile);

    try {
      await axios.post('http://localhost:5000/api/foods', data);
      toast.success("Food added successfully!");
      navigate('/');
    } catch (err) {
      toast.error("Error adding food.");
      console.error(err);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-lg">
            <h2 className="mb-4 text-center">🍔 Add New Food Item</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Food Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control type="number" name="discount" value={formData.discount} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={formData.category} onChange={handleChange}>
                  <option value="food">Food</option>
                  <option value="fast-food">Fast Food</option>
                  <option value="cold-drinks">Cold Drinks</option>
                  <option value="Most Populer">Most Populer</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Food Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="success" size="lg">Submit</Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddFood;
