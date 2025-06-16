import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace this with your actual backend endpoint
      console.log("Form submitted:", formData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would make your actual API call
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // simulating a successfull response
      setIsSubmitted(true);
      setSubmitMessage(`Welcome ${formData.name}! Your account has been created successfully. You can now access our support services.`);
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("There was an error creating your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewSignup = () => {
    setIsSubmitted(false);
    setSubmitMessage("");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] p-8 pt-16 rounded-xl flex">
        <div className="w-full flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-[#5b3c5a]">Account Created Successfully!</h2>
              <p className="text-gray-600 mb-6">{submitMessage}</p>
            </div>
            
            <div className="space-y-4">
              {/* <button
                onClick={handleNewSignup}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-indigo-400 text-white py-2 rounded hover:bg-purple-400 transition duration-200 ease-in-out transform hover:scale-105"
              >
                Create Another Account
              </button> */}
              
              <div className="text-sm text-gray-500">
                <p>Next steps:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Check your email for verification</li>
                  <li>• Complete your profile setup</li>
                  <li>• Explore our support services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] p-8 pt-16 rounded-xl flex">
      {/* Left Side */}
      <div className="w-1/2 bg-gradient-to-r from-purple-600 to-indigo-300 text-white flex items-center justify-center p-10 ">
        <div>
          <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-lg">
            You're one step closer to getting the help you need. Take action create an account and follow up on your case.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-[#5b3c5a]">Sign Up</h2>

          {submitMessage && !isSubmitted && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {submitMessage}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-indigo-400 text-white py-2 rounded hover:bg-purple-400 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}