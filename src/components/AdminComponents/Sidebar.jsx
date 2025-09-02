
import React from 'react';
import { TrendingUp, AlertTriangle, MapPin, Clock, Bell } from 'lucide-react';

export const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        {trend && (
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">{trend}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color === 'text-red-600' ? 'bg-red-50' : color === 'text-orange-600' ? 'bg-orange-50' : 'bg-blue-50'}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

export const UrgentAlert = ({ report, onAssign }) => (
  <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          <span className="font-semibold text-gray-900">{report.id}</span>
          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
            report.urgency === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
          }`}>
            {report.urgency}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-1">{report.type}</p>
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="mr-3">{report.location}</span>
          <Clock className="w-3 h-3 mr-1" />
          <span>{report.timeAgo}</span>
        </div>
        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
          report.status === 'Unassigned' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {report.status}
        </span>
      </div>
      <button 
        onClick={() => onAssign && onAssign(report.id)}
        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        Assign Now
      </button>
    </div>
  </div>
);

export const UrgentAlertsCard = ({ urgentReports, onAssign, onViewAll }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Urgent Alerts</h3>
      <Bell className="w-5 h-5 text-red-500" />
    </div>
    <div className="space-y-3">
      {urgentReports.map((report) => (
        <UrgentAlert key={report.id} report={report} onAssign={onAssign} />
      ))}
    </div>
    <button 
      onClick={onViewAll}
      className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
    >
      View All Alerts
    </button>
  </div>
);

export const QuickActionsCard = ({ activities }) => {
  const defaultActivities = [
    {
      id: 1,
      message: 'New report GBV-2024-004 submitted',
      time: '2 minutes ago',
      type: 'new'
    },
    {
      id: 2,
      message: 'Case GBV-2024-002 assigned to Sarah Ochieng',
      time: '15 minutes ago',
      type: 'assigned'
    },
    {
      id: 3,
      message: 'Case GBV-2024-001 marked as resolved',
      time: '1 hour ago',
      type: 'resolved'
    }
  ];

  const displayActivities = activities || defaultActivities;

  const getActivityColor = (type) => {
    switch (type) {
      case 'new': return 'bg-blue-500';
      case 'assigned': return 'bg-green-500';
      case 'resolved': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <h4 className="text-md font-medium text-gray-900 mb-3">Recent Activity</h4>
      <div className="space-y-3">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full mr-3`}></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Table.jsx - Reports table component
import { Filter, Plus, Search, Eye, UserCheck } from 'lucide-react';

export const ReportsTable = ({ reports, onFilterClick, onNewReport, onViewReport, onAssignReport }) => {
  const defaultReports = [
    {
      id: 'GBV-2024-001',
      date: '2024-08-12',
      type: 'Domestic Violence',
      status: 'New',
      urgency: 'Critical',
      location: 'Nairobi Central',
      assignedTo: 'Unassigned'
    },
    {
      id: 'GBV-2024-002',
      date: '2024-08-12',
      type: 'Sexual Harassment',
      status: 'In Progress',
      urgency: 'High',
      location: 'Westlands',
      assignedTo: 'Sarah Ochieng'
    },
    {
      id: 'GBV-2024-003',
      date: '2024-08-11',
      type: 'Physical Assault',
      status: 'Closed',
      urgency: 'Medium',
      location: 'Kasarani',
      assignedTo: 'John Mwangi'
    }
  ];

  const displayReports = reports || defaultReports;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
          <div className="flex space-x-2">
            <button 
              onClick={onFilterClick}
              className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button 
              onClick={onNewReport}
              className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                  {report.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    report.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                    report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    report.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                    report.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {report.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.assignedTo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onViewReport && onViewReport(report.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onAssignReport && onAssignReport(report.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <UserCheck className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Sidebar.jsx - Navigation sidebar

import { Shield, User, X } from 'lucide-react';

export const Sidebar = ({ 
  sidebarItems, 
  activeSection, 
  sidebarOpen, 
  onSectionChange, 
  onSidebarClose,
  userInfo 
}) => {
  const defaultUserInfo = {
    name: 'Admin User',
    role: 'Super Administrator'
  };

  const displayUserInfo = userInfo || defaultUserInfo;

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-blue-600" />
          <span className="ml-2 text-xl font-semibold text-gray-900">GBV Admin</span>
        </div>
        <button
          onClick={onSidebarClose}
          className="lg:hidden text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activeSection === item.id ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{displayUserInfo.name}</p>
              <p className="text-xs text-gray-500">{displayUserInfo.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};