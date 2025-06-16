import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Heart } from 'lucide-react';
import { Link  } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      // Handle login logic here
      console.log('Login attempt:', formData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would make your actual API call
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Invalid credentials');
      // }
      
      // For now, we'll simulate a successful login
      setIsLoggedIn(true);
      setSubmitMessage(`Welcome back! You have successfully logged into your secure account.`);
      
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSubmitMessage("");
    setFormData({
      email: '',
      password: ''
    });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-[80vh] p-8 pt-16 rounded-xl flex">
        <div className="w-full flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Login Successful!</h2>
              <p className="text-gray-600 mb-6">{submitMessage}</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-pink-500 mr-2" fill="currentColor" />
                  <span className="text-blue-800 font-medium">You're in a safe space</span>
                  <Heart className="w-5 h-5 text-pink-500 ml-2" fill="currentColor" />
                </div>
                <p className="text-sm text-blue-700">
                  Access your dashboard to view resources, connect with support, and track your progress.
                </p>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-105">
                 <Link to="/SuvivorDashboard">Go to Dashboard</Link> 
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 rounded-lg font-medium transition duration-200"
                >
                  Sign Out
                </button>
              </div>
              
              <div className="text-sm text-gray-500 mt-4">
                <p className="font-medium mb-2">Quick access:</p>
                <div className="space-y-1">
                  <p>• View support services</p>
                  <p>• Connect with counselors</p>
                  <p>• Access safety resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] p-8 pt-16 rounded-xl flex">
      {/* Left Side - Welcome Message */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-300 bg-opacity-20"></div>
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
              <p className="text-white leading-relaxed">
               You're not alone in this journey. Our platform provides a safe, confidential space where you can access support, resources, and connect with those who understand.
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
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 bg-opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-200 bg-opacity-5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-purple-200 bg-opacity-10 rounded-full animate-bounce"></div>
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
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}

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
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded disabled:cursor-not-allowed"
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
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In Securely"
                )}
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