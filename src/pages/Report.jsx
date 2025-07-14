import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Shield, Phone, X, Check, Eye, EyeOff } from "lucide-react";

// API configuration - Update this to match your Django backend URL
const API_BASE_URL = 'http://localhost:8000/api';

export default function Report() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [referenceCode, setReferenceCode] = useState('');
  const [showTracking, setShowTracking] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    incident_date: '',
    incident_location: '',
    incident_type: 'physical',
    description: '',
    immediate_danger: false,
    needs_medical_attention: false,
    contact_method: 'none',
    contact_info: '',
    // Optional fields for identification
    name: '',
    email: '',
    phone: ''
  });

  const handleEmergencyExit = () => {
    // Clear browser history
    window.location.replace("https://poki.com/en/g/subway-surfers");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare data for API
      const submitData = {
        incident_date: new Date(formData.incident_date).toISOString(),
        incident_location: formData.incident_location,
        incident_type: formData.incident_type,
        description: formData.description,
        immediate_danger: formData.immediate_danger,
        needs_medical_attention: formData.needs_medical_attention,
        contact_method: formData.contact_method,
      };

      // Add contact info based on method
      if (formData.contact_method !== 'none') {
        if (formData.contact_method === 'email') {
          submitData.contact_info = formData.email;
        } else if (formData.contact_method === 'phone') {
          submitData.contact_info = formData.phone;
        }
      }

      const response = await fetch(`${API_BASE_URL}/reports/anonymous/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();

      if (response.ok) {
        setReferenceCode(data.reference_code);
        setSubmitted(true);
        
        // Store reference code in localStorage for easy access
        const savedReports = JSON.parse(localStorage.getItem('gbv_reports') || '[]');
        savedReports.push({
          reference_code: data.reference_code,
          date: new Date().toISOString()
        });
        localStorage.setItem('gbv_reports', JSON.stringify(savedReports));
      } else {
        setError(data.error || 'Failed to submit report');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const trackReport = async () => {
    if (!trackingCode) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/reports/track/${trackingCode}/`);
      const data = await response.json();

      if (response.ok) {
        setTrackingResult(data);
      } else {
        setError('Invalid reference code');
      }
    } catch (err) {
      setError('Failed to track report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 ">
      {/* Emergency Exit Button */}
      <button
        onClick={handleEmergencyExit}
        className="fixed bottom-4 right-4 z-50 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg flex items-center gap-2"
      >
        <X className="w-5 h-5" />
        Quick Exit
      </button>

      <div className="max-w-4xl mx-auto -mt-17">
        {/* Initial View */}
        {!showForm && !submitted && !showTracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-20"
          >
            <Shield className="w-20 h-20 mx-auto mb-6 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              You Are Not Alone
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Your safety is our priority. Report incidents anonymously and get the help you deserve.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Report an Incident
              </button>
              
              <button
                onClick={() => setShowTracking(true)}
                className="w-full sm:w-auto bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 ml-0 sm:ml-4 transition-all"
              >
                Track Existing Report
              </button>
            </div>

            {/* Emergency Numbers */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Police</span>
                  <a href="tel:999" className="text-purple-600 font-bold flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 999
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">GBV Hotline</span>
                  <a href="tel:1195" className="text-purple-600 font-bold flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 1195
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Report Form */}
        {showForm && !submitted && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-xl p-8 mt-10"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Report an Incident</h2>
            
            {/* Safety Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800">
                    Your report can be completely anonymous. Only provide contact information if you want us to reach out to you.
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Required Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Required Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Incident *
                    </label>
                    <input
                      type="datetime-local"
                      name="incident_date"
                      value={formData.incident_date}
                      onChange={handleInputChange}
                      max={new Date().toISOString().slice(0, 16)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type of Incident *
                    </label>
                    <select
                      name="incident_type"
                      value={formData.incident_type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="physical">Physical Violence</option>
                      <option value="sexual">Sexual Violence</option>
                      <option value="emotional">Emotional/Psychological</option>
                      <option value="economic">Economic Violence</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location of Incident *
                  </label>
                  <input
                    type="text"
                    name="incident_location"
                    value={formData.incident_location}
                    onChange={handleInputChange}
                    placeholder="e.g., Nairobi, Westlands"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description of Incident *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Please describe what happened..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Safety Questions */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700">Safety Assessment</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="immediate_danger"
                    checked={formData.immediate_danger}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700">I am in immediate danger</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="needs_medical_attention"
                    checked={formData.needs_medical_attention}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700">I need medical attention</span>
                </label>
              </div>

              {/* Optional Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Optional Contact Information</h3>
                <p className="text-sm text-gray-600">
                  Only provide if you want us to contact you. Your report will be processed even without this information.
                </p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    name="contact_method"
                    value={formData.contact_method}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="none">Do not contact me</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="in_person">In Person</option>
                  </select>
                </div>

                {formData.contact_method !== 'none' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    {(formData.contact_method === 'email' || formData.contact_method === 'phone') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {formData.contact_method === 'email' ? 'Email Address' : 'Phone Number'}
                        </label>
                        <input
                          type={formData.contact_method === 'email' ? 'email' : 'tel'}
                          name={formData.contact_method}
                          value={formData[formData.contact_method]}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required={formData.contact_method !== 'none'}
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tracking Form */}
        {showTracking && !submitted && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-xl p-8 mt-10 max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Track Your Report</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference Code
                </label>
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  placeholder="e.g., ABC12345"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}
              
              {trackingResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-purple-50 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">Report Status</h3>
                  <p className="text-gray-600">
                    Status: <span className="font-semibold">{trackingResult.report.status_display}</span>
                  </p>
                  <p className="text-gray-600">
                    Submitted: {new Date(trackingResult.report.created_at).toLocaleDateString()}
                  </p>
                  {trackingResult.can_create_account && (
                    <p className="mt-2 text-green-600 text-sm">
                      Your report has been reviewed. You can now create an account for more features.
                    </p>
                  )}
                </motion.div>
              )}
              
              <div className="flex gap-4">
                <button
                  onClick={trackReport}
                  disabled={loading || !trackingCode}
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'Checking...' : 'Track Report'}
                </button>
                <button
                  onClick={() => {
                    setShowTracking(false);
                    setTrackingResult(null);
                    setTrackingCode('');
                    setError(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Back
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-8 mt-10 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Report Submitted Successfully
              </h2>
              
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <p className="text-lg font-semibold text-purple-800 mb-2">
                  Your Reference Code:
                </p>
                <p className="text-3xl font-mono font-bold text-purple-600">
                  {referenceCode}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Please save this code to track your report
                </p>
              </div>
              
              <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">What happens next?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    Your report will be reviewed within 24 hours
                  </li>
                  {formData.contact_method !== 'none' && (
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      We will contact you via {formData.contact_method} within 24-48 hours
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    You can track your report status using the reference code
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    All information is kept strictly confidential
                  </li>
                </ul>
              </div>
              
              {(formData.immediate_danger || formData.needs_medical_attention) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-red-800 mb-2">
                    Immediate Assistance Required
                  </h3>
                  <p className="text-red-700 mb-3">
                    Based on your responses, please contact emergency services immediately:
                  </p>
                  <div className="space-y-2">
                    <a href="tel:999" className="flex items-center gap-2 text-red-800 font-semibold">
                      <Phone className="w-5 h-5" /> Police: 999
                    </a>
                    <a href="tel:999" className="flex items-center gap-2 text-red-800 font-semibold">
                      <Phone className="w-5 h-5" /> Medical Emergency: 999
                    </a>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setShowForm(false);
                    setFormData({
                      incident_date: '',
                      incident_location: '',
                      incident_type: 'physical',
                      description: '',
                      immediate_danger: false,
                      needs_medical_attention: false,
                      contact_method: 'none',
                      contact_info: '',
                      name: '',
                      email: '',
                      phone: ''
                    });
                  }}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
                >
                  Submit Another Report
                </button>
                <button
                  onClick={() => {
                    setShowTracking(true);
                    setSubmitted(false);
                    setTrackingCode(referenceCode);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Track This Report
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}