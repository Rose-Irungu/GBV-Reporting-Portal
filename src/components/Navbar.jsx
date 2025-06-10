import { Link } from "react-router-dom";



export default function Navbar() {
  return (
    <nav className="bg-purple-500 text-white px-4 py-3 shadow">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo + Site Name */}
        <div className="flex items-center gap-3">
          <img
            src="/images/Logo.png"
            alt="GBV Support Logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-xl font-bold">GBV Support</h1>
        </div>

        {/* Center: Navigation Links */}
        <ul className="flex gap-6">
          <li>
             <Link to="/">Home</Link>   
          </li>
          <li>
             <Link to="/report">Report</Link>   
          </li>
          <li>

            <Link to="/resources">Resources</Link>             
          </li>
        </ul>

        {/* Right: Sign Up and Login Buttons */}
        <div className="flex gap-4">
          <a
            href="/signup"
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-purple-800 transition"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="px-4 py-2 bg-white text-purple-800 rounded hover:bg-purple-700 hover:text-white transition"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}
