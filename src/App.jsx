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
import AddUser from "./components/AdminComponents/AddUsers";
import Appointments from "./components/SurvivorComponents/Appointments";
import { Toaster } from "react-hot-toast";
// import ReportModal from "./components/ReportModal";


const App = () => {
  const location = useLocation();

  // Routes where Navbar and Footer should be hidden
  const hiddenOnRoutes = [
    
    "/survivor-dashboard",
    "/admin-dashboard",
    "/doctor-dashboard" ,
    "/lawyer-dashboard",
    "/counselor-dashboard",
    "/appointment-form",
    "/user-form"


   
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
        <Route path="/user-form" element={<AddUser />} />
        <Route path="/appointment-form" element={<Appointments />} />
        {/* <Route path="/report-modal" element={<ReportModal />} /> */}
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            // background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#4caf50',
            },
          },
          error: {
            style: {
              background: '#f44336',
            },
          },
        }}
      />

      {!shouldHideNavbar && <Footer />}
    </div>
  );
};

export default App;