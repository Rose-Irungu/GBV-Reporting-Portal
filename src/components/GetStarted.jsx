import { Link } from "react-router-dom";

export default function AuthCard() {
  return (
    <div className="max-w-md mx-auto bg-[#F2F3F2] rounded-xl shadow-xl p-8 m-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
        <p className="text-gray-600">
          Please login or create an account to continue
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <button className="px-4 py-2 text-purple-600 hover:bg-purple-100 rounded-full border-2 border-purple-400 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
          <Link to="/login">Login</Link>
        </button>
        <button className="px-4 py-2 text-purple-600 hover:bg-purple-100 rounded-full border-2 border-purple-400 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
          <Link to="/signup">Sign up</Link>
        </button>
      </div>
    </div>
  );
}
