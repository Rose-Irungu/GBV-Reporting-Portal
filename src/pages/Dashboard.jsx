import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  UserCheck, 
  Calendar, 
  AlertTriangle, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle,
  XCircle,
  MoreVertical,
  Bell,
  Settings,
  LogOut,
  Shield,
  Gavel,
  Heart,
  Stethoscope
} from 'lucide-react';

export default function AdminDashboard() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningReport, setAssigningReport] = useState(null);

  // Mock data for reports
  const reports = [
    {
      id: 'RPT-2025-001',
      submittedAt: '2025-06-12 09:30',
      priority: 'high',
      status: 'pending',
      type: 'Physical Violence',
      assignedTo: null,
      location: 'Nairobi Central',
      urgency: 'Immediate',
      summary: 'Domestic violence incident requiring immediate intervention...'
    },
    {
      id: 'RPT-2025-002',
      submittedAt: '2025-06-12 08:15',
      priority: 'medium',
      status: 'assigned',
      type: 'Sexual Harassment',
      assignedTo: 'Dr. Sarah Kimani',
      location: 'Westlands',
      urgency: 'Within 24hrs',
      summary: 'Workplace harassment case requiring counseling support...'
    },
    {
      id: 'RPT-2025-003',
      submittedAt: '2025-06-11 16:45',
      priority: 'high',
      status: 'in-progress',
      type: 'Domestic Violence',
      assignedTo: 'Adv. John Mwangi',
      location: 'Karen',
      urgency: 'Immediate',
      summary: 'Legal intervention required for ongoing domestic situation...'
    },
    {
      id: 'RPT-2025-004',
      submittedAt: '2025-06-11 14:20',
      priority: 'low',
      status: 'resolved',
      type: 'Emotional Abuse',
      assignedTo: 'Dr. Grace Wanjiku',
      location: 'Kilimani',
      urgency: 'Within 7 days',
      summary: 'Counseling support provided, case successfully resolved...'
    }
  ];

  const representatives = [
    { id: 1, name: 'Adv. John Mwangi', type: 'legal', specialty: 'Family Law', available: true },
    { id: 2, name: 'Adv. Mary Njeri', type: 'legal', specialty: 'Criminal Law', available: false },
    { id: 3, name: 'Dr. Grace Wanjiku', type: 'counselor', specialty: 'Trauma Counseling', available: true },
    { id: 4, name: 'Dr. Peter Kiprotich', type: 'counselor', specialty: 'Family Therapy', available: true },
    { id: 5, name: 'Dr. Sarah Kimani', type: 'doctor', specialty: 'Emergency Medicine', available: true },
    { id: 6, name: 'Dr. James Ochieng', type: 'doctor', specialty: 'Psychiatry', available: false }
  ];

  const stats = [
    { title: 'Total Reports', value: '24', change: '+12%', icon: FileText, color: 'blue' },
    { title: 'Pending Cases', value: '8', change: '-5%', icon: Clock, color: 'yellow' },
    { title: 'Active Cases', value: '11', change: '+8%', icon: AlertTriangle, color: 'red' },
    { title: 'Resolved Cases', value: '5', change: '+15%', icon: CheckCircle, color: 'green' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRepresentativeIcon = (type) => {
    switch (type) {
      case 'legal': return <Gavel className="w-4 h-4" />;
      case 'counselor': return <Heart className="w-4 h-4" />;
      case 'doctor': return <Stethoscope className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const handleAssignReport = (reportId, representative) => {
    // Handle assignment logic here
    console.log(`Assigning report ${reportId} to ${representative.name}`);
    setShowAssignModal(false);
    setAssigningReport(null);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">GBV Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AD</span>
                </div>
                <span className="text-gray-700 font-medium">Admin User</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredReports.length} of {reports.length} reports
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Case Reports</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.id}</div>
                      <div className="text-sm text-gray-500">Urgency: {report.urgency}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.type}</div>
                      <div className="text-sm text-gray-500">{report.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(report.priority)}`}>
                        {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {report.assignedTo ? (
                        <div className="text-sm text-gray-900">{report.assignedTo}</div>
                      ) : (
                        <button
                          onClick={() => {
                            setAssigningReport(report);
                            setShowAssignModal(true);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-purple-50 hover:bg-purple-100"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Assign
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {report.submittedAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assign Report {assigningReport?.id}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Select a representative to assign this case to:
            </p>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {representatives.map((rep) => (
                <div
                  key={rep.id}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    !rep.available ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => rep.available && handleAssignReport(assigningReport.id, rep)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getRepresentativeIcon(rep.type)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{rep.name}</div>
                        <div className="text-sm text-gray-500">{rep.specialty}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${rep.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-xs text-gray-500">
                        {rep.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Report Details</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Report ID</label>
                  <p className="text-gray-900">{selectedReport.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="text-gray-900">{selectedReport.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-gray-900">{selectedReport.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(selectedReport.priority)}`}>
                    {selectedReport.priority.charAt(0).toUpperCase() + selectedReport.priority.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Summary</label>
                <p className="text-gray-900 mt-1">{selectedReport.summary}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}