import React, { useState } from "react";
import { Eye, EyeOff, Shield, Heart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const navigate = useNavigate();
  const handleEmergencyExit = () => {
    window.location.replace("https://poki.com/en/g/subway-surfers");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await authService.loginUser(formData);

      if (result.result_code === 0) {
        const { access, refresh, user } = result.data;

        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("userRole", user.user_type);

        setIsLoggedIn(true);
        setSubmitMessage(
          "Welcome back! You have successfully logged into your secure account."
        );
        console.log(user.user_type);
        
        switch (user.user_type) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "survivor":
            navigate("/survivor-dashboard");
            break;
          case "doctor":
            navigate("/doctor-dashboard");
            break;
          case "lawyer":
            navigate("/lawyer-dashboard");
            break;
          case "counselor":
            navigate("/counselor-dashboard");
            break;
          default:
            throw new Error("Unknown role. Contact support.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setFormData({ email: "", password: "" });
    setSubmitMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <button
        onClick={handleEmergencyExit}
        className="fixed bottom-4 right-4 z-50 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg flex items-center gap-2"
      >
        <X className="w-5 h-5" />
        Quick Exit
      </button>
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 space-y-6">
        <div className="flex justify-center items-center gap-2 mb-4 text-primary font-semibold text-xl">
          <Shield className="w-6 h-6" /> Secure Login{" "}
          <Heart className="w-6 h-6 text-red-500" />
        </div>

        {isLoggedIn && submitMessage ? (
          <div className="text-green-600 text-center">
            <p>{submitMessage}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-sm text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block font-medium text-sm text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-indigo-400 text-white py-2 rounded transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-sm">
              <Link to="/signup" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
