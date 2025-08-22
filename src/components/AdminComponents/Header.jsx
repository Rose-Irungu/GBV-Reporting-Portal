// src/components/AdminComponents/Header.js
import React from "react";
import { Menu, Bell, User } from "lucide-react";

const Header = ({
  activeSection = "dashboard",
  sidebarItems = [],
  urgentReports = [],
  adminUser = {},
  onSidebarToggle = () => {},
}) => {
  const activeLabel =
    sidebarItems.find((item) => item.id === activeSection)?.label || "Dashboard";

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

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700">
              {adminUser.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
