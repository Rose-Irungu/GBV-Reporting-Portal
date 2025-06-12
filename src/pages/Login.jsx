import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Heart } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-[80vh] p-8 pt-16 rounded-xl flex">
      {/* Left Side - Welcome Message */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#A776B4] bg-opacity-20"
        style={{
        background: "linear-gradient(to right, #a776b4, #f3e8ff)",
      }}
        ></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center space-y-6">
            <div className="flex justify-center mb-8">
              <div className="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight">
              Welcome Back
            </h1>
            
            <div className="space-y-4 text-lg">
              <p className="font-semibold text-blue-300">
                We've got your back
              </p>
              <p className="text-black leading-relaxed">
                <span className="text-black">You're not alone </span>in this journey. Our platform provides a safe, confidential space where you can access support, resources, and connect with <span className="text-black">those who understand.</span>
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Heart className="w-5 h-5 text-pink-300" fill="currentColor" />
              <span className="text-blue-300 font-medium">Safe • Confidential • Supportive</span>
              <Heart className="w-5 h-5 text-pink-300" fill="currentColor" />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-purple-200 bg-opacity-10 rounded-full"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile welcome message */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-300 p-3 rounded-full">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-purple-600 font-medium">We've got your back</p>
          </div>

          <div>
            <h2 className="hidden lg:block text-3xl font-bold text-gray-900 text-center mb-2">
              Sign In
            </h2>
            <p className="hidden lg:block text-center text-gray-600 mb-8">
              Access your secure account
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4C334C] bg-gradient-to-r hover:from-purple-700 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 ease-in-out transform hover:scale-105"
              >
                Sign In Securely
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="font-medium text-purple-600 hover:text-purple-500 transition duration-200">
                  Signup
                </a>
              </p>
            </div>

            {/* Security notice */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Your privacy is protected</p>
                  <p>All data is encrypted and your activity remains confidential.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}