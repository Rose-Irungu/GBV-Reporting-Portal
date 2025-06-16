import React from 'react';
import { Phone, Mail, MapPin, Clock, AlertTriangle, Users, Shield, Heart } from 'lucide-react';


export default function Contactus() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-10">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-sm font-medium">
            <AlertTriangle className="w-4 h-4" />
            <span>EMERGENCY? Call our 24/7 hotline: +254-700-000-000</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to support you. Reach out to us for assistance, resources, or to report incidents. 
            Your safety and privacy are our top priorities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* About Our Support */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Heart className="w-6 h-6 text-purple-600" />
                <span>We're Here for You</span>
              </h2>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Our dedicated team provides comprehensive support to survivors of gender-based violence. 
                  We understand the courage it takes to reach out, and we're committed to providing a safe, 
                  confidential, and supportive environment.
                </p>
                
                <p>
                  Whether you need immediate assistance, information about our services, or want to connect 
                  with resources in your area, we're available 24/7 to help. Your safety and wellbeing are 
                  our highest priorities.
                </p>
              </div>

              <div className="mt-6 bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Our Services Include:</h3>
                <ul className="text-purple-800 space-y-1">
                  <li>• Crisis intervention and emotional support</li>
                  <li>• Safety planning and risk assessment</li>
                  <li>• Legal advocacy and court accompaniment</li>
                  <li>• Referrals to counseling and therapy services</li>
                  <li>• Connection to emergency shelter and housing</li>
                  <li>• Economic empowerment programs</li>
                </ul>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Our Support Team</span>
              </h3>
              
              <div className="space-y-4 text-gray-600 text-sm">
                <p>
                  <strong>Crisis Support Specialists:</strong> Trained professionals available 24/7 
                  to provide immediate assistance and safety planning.
                </p>
                
                <p>
                  <strong>Legal Advocates:</strong> Experienced advocates who can help navigate 
                  the legal system and provide court support.
                </p>
                
                <p>
                  <strong>Social Workers:</strong> Licensed professionals who provide case management 
                  and connection to community resources.
                </p>
                
                <p>
                  <strong>Peer Counselors:</strong> Survivors who have completed specialized training 
                  to provide peer support and mentorship.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information & Resources */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">24/7 Hotline</p>
                    <p className="text-gray-600">+254-700-000-000</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-gray-600">support@gbvplatform.org</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Office Location</p>
                    <p className="text-gray-600">Nairobi, Kenya<br />CBD Area</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Office Hours</p>
                    <p className="text-gray-600">Mon-Fri: 8AM-6PM<br />Sat: 9AM-3PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Resources */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Emergency Resources</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-red-900">Police Emergency</p>
                  <p className="text-red-700">999 or 911</p>
                </div>
                
                <div>
                  <p className="font-medium text-red-900">GBV Helpline</p>
                  <p className="text-red-700">1195 (Toll-free)</p>
                </div>
                
                <div>
                  <p className="font-medium text-red-900">Medical Emergency</p>
                  <p className="text-red-700">999</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-red-200">
                <p className="text-sm text-red-800">
                  If you're in immediate danger, contact emergency services first, 
                  then reach out to us for additional support.
                </p>
              </div>
            </div>

            {/* Additional Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Additional Support</h3>
              
              <div className="space-y-3 text-sm">
                <p className="text-blue-800">
                  <strong>Legal Aid:</strong> Free legal consultation available
                </p>
                
                <p className="text-blue-800">
                  <strong>Counseling:</strong> Professional psychological support
                </p>
                
                <p className="text-blue-800">
                  <strong>Safe Houses:</strong> Temporary secure accommodation
                </p>
                
                <p className="text-blue-800">
                  <strong>Economic Support:</strong> Financial assistance programs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}