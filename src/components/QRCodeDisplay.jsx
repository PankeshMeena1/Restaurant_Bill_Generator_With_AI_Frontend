import React from 'react';
import QRCode from 'qrcode.react';
import { Container, Row, Col } from 'react-bootstrap';

const QRCodeDisplay = () => {
  const albumUrl = `${window.location.origin}/gallery`;

  return (
    <Container className="text-center mt-5">
      <h2 className="mb-4">Scan to View Image Gallery</h2>
      <QRCode value={albumUrl} size={256} />
      <p className="mt-3">{albumUrl}</p>
    </Container>
  );
};

export default QRCodeDisplay;
