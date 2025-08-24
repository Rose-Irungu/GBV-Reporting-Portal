import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, User, Settings, Lock, LogOut, Edit3 } from "lucide-react";

const Header = ({
  activeSection = "dashboard",
  sidebarItems = [],
  urgentReports = [],
  adminUser = { name: "Admin User", email: "admin@example.com", role: "Administrator" },
  onSidebarToggle = () => {},
  onEditProfile = () => {},
  onChangePassword = () => {},
  onLogout = () => {},
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const activeLabel =
    sidebarItems.find((item) => item.id === activeSection)?.label || "Dashboard";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMenuAction = (action) => {
    setIsUserMenuOpen(false);
    if (action === 'edit') {
      onEditProfile();
    } else if (action === 'password') {
      onChangePassword();
    } else if (action === 'logout') {
      onLogout();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-4 lg:ml-0 text-xl font-semibold text-gray-900">
            {activeLabel}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
            {urgentReports.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={handleUserMenuToggle}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                {adminUser.name}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {adminUser.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {adminUser.email}
                      </p>
                      {adminUser.role && (
                        <p className="text-xs text-blue-600 font-medium">
                          {adminUser.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => handleMenuAction('edit')}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 className="w-4 h-4 mr-3" />
                    Edit Profile
                  </button>
                  
                  <button
                    onClick={() => handleMenuAction('password')}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Lock className="w-4 h-4 mr-3" />
                    Change Password
                  </button>
                  
                  <button
                    onClick={() => handleMenuAction('settings')}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Account Settings
                  </button>
                </div>

                {/* Logout Section */}
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={() => handleMenuAction('logout')}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Example usage component to demonstrate the functionality
const App = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  
  const sampleSidebarItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "reports", label: "Reports" },
    { id: "users", label: "Users" },
    { id: "settings", label: "Settings" }
  ];

  const sampleAdminUser = {
    name: "John Smith",
    email: "john.smith@company.com",
    role: "System Administrator"
  };

  const handleEditProfile = () => {
    alert("Opening Edit Profile modal...");
    // Here you would typically open a modal or navigate to an edit profile page
  };

  const handleChangePassword = () => {
    alert("Opening Change Password modal...");
    // Here you would typically open a modal for changing password
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      alert("Signing out...");
      // Here you would handle the logout logic
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeSection={currentSection}
        sidebarItems={sampleSidebarItems}
        urgentReports={[1, 2]} // Sample urgent reports
        adminUser={sampleAdminUser}
        onSidebarToggle={() => console.log("Toggle sidebar")}
        onEditProfile={handleEditProfile}
        onChangePassword={handleChangePassword}
        onLogout={handleLogout}
      />
      
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Click the user icon in the header to see the dropdown menu
          </h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">
              The user dropdown includes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>User profile information display</li>
              <li>Edit Profile option</li>
              <li>Change Password option</li>
              <li>Account Settings option</li>
              <li>Sign Out option</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;