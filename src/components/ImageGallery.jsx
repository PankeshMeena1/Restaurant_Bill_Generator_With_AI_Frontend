// import React, { useState } from 'react';
// import images from '../assests/images';
// import './Gallery.css';
// import { Container, Row, Col, Button } from 'react-bootstrap';

// const ImageGallery = () => {
//   const [index, setIndex] = useState(0);

//   const prevImage = () => {
//     setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const nextImage = () => {
//     setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <Container className="text-center mt-4">
//       <h2 className="mb-4">Image Album</h2>
//       <div className="gallery-container">
//         <img
//           src={images[index].url}
//           alt={`Image ${index}`}
//           className="gallery-image"
//         />
//       </div>
//       <div className="mt-3">
//         <Button variant="primary" onClick={prevImage} className="me-2">
//           ⬅ Prev
//         </Button>
//         <Button variant="success" onClick={nextImage}>
//           Next ➡
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default ImageGallery;
