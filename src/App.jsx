import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Resources from './pages/Resources';
import Report from './pages/Report';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Learn from './pages/Learn';
import Contactus from './pages/Contactus';
import Dashboard from './pages/Dashboard';
import SurvivorDashboard from './pages/SurvivorDashboard';
import Services from './pages/Services'
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App = () => {
  return (
      <div>
      < Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/report" element={<Report />} />
        <Route path="/learn" element={<Learn />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/survivordashboard" element={<SurvivorDashboard />} />
       
      </Routes>
      
      < Footer />     
      </div>
     
  );
};

export default App;
