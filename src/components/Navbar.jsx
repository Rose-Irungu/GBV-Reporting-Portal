import React, { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-400 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#a776b4] to-purple-400 bg-clip-text text-transparent">
              SafeHaven
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/Services" className="text-gray-700 hover:text-purple-600 transition-colors">
              Services
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-purple-600 transition-colors">
              Resources
            </Link>
            <Link to="/contactus" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
              <button className="px-4 py-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors">
                <Link to="/signup">Sign Up</Link>
              </button>
                <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all">
                <Link to="/login">Login</Link>
              </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all">
              <Link to="/report">Get Help Now</Link>
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-md">Home</a>
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-md">Services</a>
            <a href="/resources" className="block px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-md">Resources</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-md">Contact</a>
            <div className="flex flex-col space-y-2 px-3 pt-2">
              <button className="px-4 py-2 text-purple-600 border border-purple-200 rounded-lg">Sign In</button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">Get Help Now</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
