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