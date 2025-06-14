import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assests/styles/Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-highlight">
          🍽️ EasyBill
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/order" active={location.pathname === '/order'}>Order</Nav.Link>
            <Nav.Link as={Link} to="/bill" active={location.pathname === '/bill'}>Bill</Nav.Link>
            <Button variant="outline-light" className="ms-3" onClick={() => navigate('/add-food')}>
              ➕ Add Food
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
