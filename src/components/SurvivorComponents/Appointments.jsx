import React, { useState } from 'react';
import { Calendar, Clock, MessageCircle, User } from 'lucide-react';

const BookAppointmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    sessionType: '',
    date: '',
    time: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: Add validation here

    if (onSubmit) {
      onSubmit(formData);
    }

    setSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      sessionType: '',
      date: '',
      time: '',
      message: '',
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Book an Appointment</h2>

      {submitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg">
          ✅ Your appointment request has been submitted. We'll contact you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700">
              Type of Session
            </label>
            <select
              name="sessionType"
              id="sessionType"
              required
              value={formData.sessionType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select a session type</option>
              <option value="counseling">Counseling</option>
              <option value="legal">Legal Aid</option>
              <option value="support_group">Support Group</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Preferred Date
              </label>
              <div className="mt-1 relative">
                <Calendar className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Preferred Time
              </label>
              <div className="mt-1 relative">
                <Clock className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                <input
                  type="time"
                  name="time"
                  id="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Additional Notes (optional)
            </label>
            <div className="mt-1 relative">
              <MessageCircle className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Any specific concerns or topics you’d like to address"
                className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookAppointmentForm;
