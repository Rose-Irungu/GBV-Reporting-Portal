import { useState } from "react";
import { motion } from "framer-motion";

export default function Report() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmergencyExit = () => {
    window.location.href = "https://tetris.com"; // redirect to safe game
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optionally send data to a server here
    setSubmitted(true); // Show thank you card
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 relative">
      {/* Emergency Exit Button */}
      <button
        onClick={handleEmergencyExit}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition"
      >
        Quick Exit
      </button>

      {/* Initial View */}
      {!showForm && !submitted && (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Need to Report Gender-Based Violence?</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-800 text-white px-6 py-3 rounded hover:bg-purple-700 transition text-lg"
          >
            Start Reporting
          </button>
        </div>
      )}

      {/* Report Form */}
      {showForm && !submitted && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Report GBV Incident</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input type="text" className="w-full mt-1 border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Email</label>
              <input type="text" className="w-full mt-1 border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" className="w-full mt-1 border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Incident Location</label>
              <input type="text" className="w-full mt-1 border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Incident</label>
              <input type="date" className="w-full mt-1 border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Describe What Happened</label>
              <textarea className="w-full mt-1 border border-gray-300 rounded px-3 py-2" rows="5" required></textarea>
            </div>
            <button
              type="submit"
              className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Submit Report
            </button>
          </form>
        </motion.div>
      )}

      {/* Thank You Card */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-purple-100 border-l-4 border-purple-500 p-6 rounded-lg text-center mt-10"
        >
          <h3 className="text-2xl font-bold text-white-700 mb-2">Thank you for your report</h3>
          <p className="text-white-800">
            We've received your information. You're not alone — we've got your back and will get back to you as soon as possible.
          </p>
        </motion.div>
      )}
    </div>
  );
}
