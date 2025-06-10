import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Resources from './pages/Resources';
import Report from './pages/Report';
// import Login from './pages/Login';
import Learn from './pages/Learn';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
      <div>
         <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/report" element={<Report />} />
        <Route path="/learn" element={<Learn />} /> 
      </Routes>

      <Footer />
      </div>
     
  );
};

export default App;
