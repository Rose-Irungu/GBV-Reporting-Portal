import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your backend logic or API call here
  };

  return (
      <div className="min-h-[80vh] p-8 pt-16 rounded-xl flex">
      {/* Left Side */}
      <div className="w-1/2 bg-[#A776B4] text-white flex items-center justify-center p-10"
       style={{
        background: "linear-gradient(to right, #a776b4, #f3e8ff)",
      }}
      >
        <div>
          <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-lg">
            You're one step closer to getting the help you need. Take action create an account and follow up on your case.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#5b3c5a]">Sign Up</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4C334C] text-white py-2 rounded hover:bg-purple-400 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
