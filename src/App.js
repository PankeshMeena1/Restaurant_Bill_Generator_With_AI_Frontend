// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import HomePage from "./components/Home";
// import OrderPage from "./components/OrderPage";
// import BillPage from "./components/BillPage";
// import AddFood from "./components/AddFood";
// import OpeningBanner from "./components/OpeningBanner";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";

// function App() {
//   const [order, setOrder] = useState([]);
//   const [isOpened, setIsOpened] = useState(false);

//   return (
//     <Router>
//       {!isOpened && <OpeningBanner onOpen={() => setIsOpened(true)} />}
//       {isOpened && (
//         <>
//           <Header />
//           <div className="main-content">
//             <Routes>
//               <Route path="/" element={<HomePage setOrder={setOrder} order={order} />} />
//               <Route path="/order" element={<OrderPage order={order} setOrder={setOrder} />} />
//               <Route path="/bill" element={<BillPage order={order} />} />
//               <Route path="/add-food" element={<AddFood />} />
//             </Routes>
//           </div>
//           <Footer />
//         </>
//       )}
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRCodeDisplay from './components/QRCodeDisplay';
import ImageGallery from './components/ImageGallery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeDisplay />} />
        <Route path="/gallery" element={<ImageGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
