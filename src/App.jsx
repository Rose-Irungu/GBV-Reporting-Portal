import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Learn from "./pages/Learn";
import Contactus from "./pages/Contactus";
import Dashboard from "./pages/AdminDashboard";
import SurvivorDashboard from "./pages/SurvivorDashboard";
import Services from "./pages/Services";
import DoctorDashboard from "./pages/DoctorDashboard";
import CounselorDashboard from "./pages/CounselorDashboard";
import LawyerDashboard from "./pages/LawyerDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GetStarted from "./components/GetStarted";


const App = () => {
  const location = useLocation();

  // Routes where Navbar and Footer should be hidden
  const hiddenOnRoutes = [
    
    "/survivor-dashboard",
    "/admin-dashboard",
    "/doctor-dashboard" ,
    "/lawyer-dashboard",
    "/counselor-dashboard",


   
  ];

  const shouldHideNavbar = hiddenOnRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/report" element={<Report />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/survivor-dashboard" element={<SurvivorDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
        <Route path="/counselor-dashboard" element={<CounselorDashboard />} />
        <Route path="/getstarted" element={<GetStarted />} />
      </Routes>

      {!shouldHideNavbar && <Footer />}
    </div>
  );
};

export default App;