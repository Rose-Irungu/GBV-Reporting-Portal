/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";
import { authService } from "../../services/authService";

export default function GBVUserForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim())
      newErrors.email = "Email is required";
    if (!formData.phone_number.trim())
      newErrors.phone_number = "Phone number is required";
    if (!formData.role)
      newErrors.role = "Role is required";
    if (!formData.password)
      newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm password";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (basic)
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    if (formData.phone_number && !phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Please enter a valid phone number";
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the payload for API submission (exclude confirmPassword)
      const { confirmPassword, ...submitData } = formData;

      console.log("Form submitted:", submitData);

      // Here you would make your API call
      const response = await authService.addUser(submitData);

      if (response.result_code === 0) {
        // Reset form on success
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          role: "",
          password: "",
          confirmPassword: "",
        });
        alert("User registration successful!");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  GBV Platform - Add New User
                </h1>
                <p className="text-purple-100 mt-1">
                  Create a new user account
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6">
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-purple-600" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.first_name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                      }`}
                    placeholder="Enter first name"
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.last_name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                      }`}
                    placeholder="Enter last name"
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-purple-600" />
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                      }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.phone_number
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                      }`}
                    placeholder="+254 700 000 000"
                  />
                  {errors.phone_number && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-8 ">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-600" />
                User Role *
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* <label
                  className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${formData.role === "survivor"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="survivor"
                    checked={formData.role === "survivor"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <User className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-medium text-gray-800">Survivor</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Seeking support and resources
                    </p>
                  </div>
                </label> */}

                <label
                  className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${formData.role === "admin"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-medium text-gray-800">
                      Administrator
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      System administration access
                    </p>
                  </div>
                </label>

                <label
                  className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${formData.role === "doctor"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="doctor"
                    checked={formData.role === "doctor"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-medium text-gray-800">
                      Doctor
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Medical professional
                    </p>
                  </div>
                </label>

                <label
                  className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${formData.role === "counselor"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="counselor"
                    checked={formData.role === "counselor"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <User className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-medium text-gray-800">
                      Counselor
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Mental health support
                    </p>
                  </div>
                </label>

                <label
                  className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${formData.role === "lawyer"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="lawyer"
                    checked={formData.role === "lawyer"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-medium text-gray-800">
                      Lawyer
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Legal assistance
                    </p>
                  </div>
                </label>
              </div>
              {errors.role && (
                <p className="mt-2 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Password Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-600" />
                Account Security
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.password
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                        }`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${errors.confirmPassword
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                        }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-8 py-4 rounded-lg font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 transform hover:scale-105"
                  } focus:ring-4 focus:ring-purple-200`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating User...</span>
                  </div>
                ) : (
                  "Create User Account"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}