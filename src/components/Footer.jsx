import React from "react";
import { Shield } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">SafeHaven</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Providing safe, confidential support for survivors of gender-based violence.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Crisis Chat</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Emergency Hotline</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Safety Planning</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Resources</a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Community Guidelines</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency</h3>
            <div className="bg-red-600 p-4 rounded-lg">
              <p className="text-sm mb-2">If you're in immediate danger:</p>
              <p className="text-2xl font-bold">Call 911</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SafeHaven. All rights reserved. Your safety and privacy are our commitment.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
