import React from 'react';
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