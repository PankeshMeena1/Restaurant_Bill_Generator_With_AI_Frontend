import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assests/styles/Footer.css'; // Import custom styles for Footer

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} EasyBill. All rights reserved.</p>
            <p>Designed with ❤️ by Your Company</p> {/* Optional extra text */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
