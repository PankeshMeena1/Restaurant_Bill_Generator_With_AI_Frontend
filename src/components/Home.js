import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tab,
  Nav,
  Form,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assests/styles/HomePage.css";

const HomePage = ({ setOrder, order = [] }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/foods")
      .then((response) => setFoodItems(response.data))
      .catch(() => toast.error("Failed to fetch food items."));
  }, []);

  const isInOrder = (itemId) =>
    order.some((orderItem) => orderItem._id === itemId);

  const addToOrder = (item) => {
    if (isInOrder(item._id)) {
      toast.warning(`${item.name} is already in your order!`);
    } else {
      setOrder((prev) => [...prev, { ...item, quantity: 1 }]);
      toast.success(`${item.name} added to your order!`);
    }
  };

  const removeFromOrder = (itemId) => {
    setOrder((prev) => prev.filter((item) => item._id !== itemId));
    toast.info(`Item removed from your order.`);
  };

  const filterItems = () => {
    let items = [...foodItems];

    // Tab filter
    if (activeTab !== "all") {
      items = items.filter((item) => item.category === activeTab);
    }

    // Search filter
    if (search.trim()) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return items;
  };
  const popularItems = foodItems.filter(
    (item) => item.category === "Most Populer"
  );

  const renderItems = (items) => (
    <Row>
      {items.map((item) => {
        const alreadyAdded = isInOrder(item._id);
        return (
          <Col sm={12} md={6} lg={4} key={item._id} className="mb-4">
            <Card className="food-card shadow-sm">
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.name}
                className="food-image"
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ₹{item.price}
                </Card.Text>
                <Card.Text>
                  <strong>Discount:</strong> {item.discount}% Off
                </Card.Text>
                {alreadyAdded ? (
                  <Button
                    variant="danger"
                    onClick={() => removeFromOrder(item._id)}
                  >
                    Already Added
                  </Button>
                ) : (
                  <Button variant="success" onClick={() => addToOrder(item)}>
                    Add to Order
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  return (
    <div className="homepage-background">
      <ToastContainer />
      <Container className="py-5">
        <h1 className="text-center mb-4">
          Welcome to <span className="brand">EasyBill</span>
        </h1>

        {popularItems.length > 0 && (
          <>
            <h4 className="mb-3 text-warning text-center">
              🔥 Most Popular Dishes
            </h4>
            {renderItems(popularItems)}
          </>
        )}

        <Form.Group className="mb-4 mt-5">
          <Form.Control
            type="text"
            placeholder="Search your favorite dish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="shadow-sm"
          />
        </Form.Group>

        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs" className="mb-4 justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="all">All</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="food">Meals</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fast-food">Fast Food</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="cold-drinks">Cold Drinks</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey={activeTab}>
              {renderItems(filterItems())}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default HomePage;
