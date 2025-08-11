import React, { useState } from 'react';
import { 
  Scale,
  FileText, 
  User, 
  Calendar, 
  AlertTriangle, 
  Upload, 
  Plus, 
  Search,
  Filter,
  Eye,
  MessageCircle,
  Gavel,
  Clock,
  CheckCircle,
  UserCheck,
  Flag,
  Building,
  Briefcase,
  Phone,
  Mail,
  Users,
  BookOpen,
  AlertCircle,
  Send,
  Paperclip
} from 'lucide-react';

const LawyerDashboard = () => {
  // Sample data - in a real app this would come from an API
  const [cases, setCases] = useState([
    {
      id: 1,
      clientName: "Sarah Johnson",
      contactInfo: "s.johnson@email.com | (555) 456-7890",
      incidentType: "workplace",
      incidentDescription: "Workplace harassment and wrongful termination after reporting safety violations",
      dateReported: "2025-01-15",
      priority: "high",
      assignedLawyer: null,
      legalStatus: "needs-review",
      legalDocuments: [],
      courtDate: null,
      lastUpdated: "2025-01-15",
      safetyAssessment: "Low risk - employer retaliation concerns",
      estimatedDamages: "$50,000 - $100,000"
    },
    {
      id: 2,
      clientName: "Maria Rodriguez",
      contactInfo: "maria.r@email.com | (555) 987-6543",
      incidentType: "assault",
      incidentDescription: "Physical assault by former partner, seeking restraining order and criminal charges",
      dateReported: "2025-01-14",
      priority: "urgent",
      assignedLawyer: "Jennifer Williams",
      legalStatus: "filed",
      legalDocuments: ["restraining_order.pdf", "criminal_complaint.pdf"],
      courtDate: "2025-02-15",
      lastUpdated: "2025-01-20",
      safetyAssessment: "High risk - immediate protection needed",
      estimatedDamages: "Criminal case + civil damages TBD"
    },
    {
      id: 3,
      clientName: "David Chen",
      contactInfo: "d.chen@email.com | (555) 234-5678",
      incidentType: "discrimination",
      incidentDescription: "Racial discrimination in hiring practices and hostile work environment",
      dateReported: "2025-01-10",
      priority: "medium",
      assignedLawyer: "Michael Thompson",
      legalStatus: "drafted",
      legalDocuments: ["discrimination_complaint.pdf", "evidence_summary.pdf"],
      courtDate: null,
      lastUpdated: "2025-01-18",
      safetyAssessment: "Low risk - employment discrimination case",
      estimatedDamages: "$25,000 - $75,000"
    },
    {
      id: 4,
      clientName: "Lisa Anderson",
      contactInfo: "l.anderson@email.com | (555) 345-6789",
      incidentType: "sexual-violence",
      incidentDescription: "Sexual harassment by supervisor, creating hostile work environment",
      dateReported: "2025-01-12",
      priority: "high",
      assignedLawyer: "Jennifer Williams",
      legalStatus: "court-scheduled",
      legalDocuments: ["harassment_complaint.pdf", "witness_statements.pdf", "eeoc_filing.pdf"],
      courtDate: "2025-03-01",
      lastUpdated: "2025-01-22",
      safetyAssessment: "Medium risk - ongoing workplace harassment",
      estimatedDamages: "$75,000 - $150,000"
    }
  ]);

  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      caseId: 2,
      sender: "Dr. Smith",
      role: "Doctor",
      message: "Patient shows signs of trauma consistent with assault. Medical records available.",
      timestamp: "2025-01-20 10:30 AM"
    },
    {
      id: 2,
      caseId: 2,
      sender: "Jennifer Williams",
      role: "Lawyer",
      message: "Thank you. I'll need copies of medical records for the restraining order hearing.",
      timestamp: "2025-01-20 11:15 AM"
    },
    {
      id: 3,
      caseId: 4,
      sender: "Sarah Connor",
      role: "Counselor",
      message: "Client is responding well to therapy. Ready to proceed with legal action when you advise.",
      timestamp: "2025-01-22 2:15 PM"
    }
  ]);

  // Filter cases based on search, type, and status
  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.incidentDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || case_.incidentType === filterType;
    const matchesStatus = filterStatus === 'all' || case_.legalStatus === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'needs-review': return 'bg-gray-500';
      case 'drafted': return 'bg-blue-500';
      case 'filed': return 'bg-yellow-500';
      case 'court-scheduled': return 'bg-purple-500';
      case 'closed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'needs-review': return 'Needs Review';
      case 'drafted': return 'Drafted';
      case 'filed': return 'Filed';
      case 'court-scheduled': return 'Court Scheduled';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  const getIncidentTypeIcon = (type) => {
    switch (type) {
      case 'assault': return AlertTriangle;
      case 'sexual-violence': return Flag;
      case 'workplace': return Building;
      case 'discrimination': return Users;
      default: return FileText;
    }
  };

  const handleClaimCase = () => {
    if (selectedCase) {
      const updatedCases = cases.map(case_ => {
        if (case_.id === selectedCase.id) {
          return {
            ...case_,
            assignedLawyer: "Current User", // In real app, would be current user
            legalStatus: case_.legalStatus === 'needs-review' ? 'drafted' : case_.legalStatus,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return case_;
      });
      setCases(updatedCases);
      setSelectedCase(updatedCases.find(c => c.id === selectedCase.id));
    }
  };

  const handleStatusUpdate = (newStatus) => {
    if (selectedCase) {
      const updatedCases = cases.map(case_ => {
        if (case_.id === selectedCase.id) {
          return {
            ...case_,
            legalStatus: newStatus,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return case_;
      });
      setCases(updatedCases);
      setSelectedCase(updatedCases.find(c => c.id === selectedCase.id));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedCase) {
      const updatedCases = cases.map(case_ => {
        if (case_.id === selectedCase.id) {
          return {
            ...case_,
            legalDocuments: [...case_.legalDocuments, file.name]
          };
        }
        return case_;
      });
      setCases(updatedCases);
      setSelectedCase(updatedCases.find(c => c.id === selectedCase.id));
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedCase) {
      const message = {
        id: Date.now(),
        caseId: selectedCase.id,
        sender: "Current User",
        role: "Lawyer",
        message: newMessage,
        timestamp: new Date().toLocaleString()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const getCaseMessages = (caseId) => {
    return messages.filter(msg => msg.caseId === caseId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Scale className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Legal Dashboard</h1>
                <p className="text-sm text-gray-500">Manage legal cases and client support</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Briefcase className="h-4 w-4" />
                <span>{filteredCases.length} Active Cases</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-red-600">
                <AlertTriangle className="h-4 w-4" />
                <span>{filteredCases.filter(c => c.priority === 'urgent').length} Urgent</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                <Calendar className="h-4 w-4" />
                <span>{filteredCases.filter(c => c.courtDate).length} Court Dates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Panel - Cases List */}
          <div className="w-1/2 bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Legal Cases</h2>
                <div className="text-sm text-gray-500">
                  {filteredCases.filter(c => c.legalStatus === 'needs-review').length} need review
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cases..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="assault">Assault</option>
                  <option value="sexual-violence">Sexual Violence</option>
                  <option value="workplace">Workplace</option>
                  <option value="discrimination">Discrimination</option>
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="needs-review">Needs Review</option>
                  <option value="drafted">Drafted</option>
                  <option value="filed">Filed</option>
                  <option value="court-scheduled">Court Scheduled</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Cases List */}
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredCases.map((case_) => {
                const IconComponent = getIncidentTypeIcon(case_.incidentType);
                return (
                  <div
                    key={case_.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedCase?.id === case_.id ? 'bg-purple-50 border-r-4 border-purple-500' : ''
                    }`}
                    onClick={() => setSelectedCase(case_)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{case_.clientName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(case_.legalStatus)}`}></div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(case_.priority)}`}>
                          {case_.priority.charAt(0).toUpperCase() + case_.priority.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {case_.incidentDescription}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>{case_.incidentType.replace('-', ' ')}</span>
                        <span>•</span>
                        <span>{case_.dateReported}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {case_.assignedLawyer ? (
                          <UserCheck className="h-3 w-3 text-green-500" />
                        ) : (
                          <User className="h-3 w-3 text-gray-400" />
                        )}
                        <span>{case_.assignedLawyer || 'Unassigned'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Case Details */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border">
            {selectedCase ? (
              <div className="h-full">
                {/* Case Header */}
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedCase.clientName}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>Case #{selectedCase.id}</span>
                        <span>•</span>
                        <span>{selectedCase.contactInfo}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>Reported: {selectedCase.dateReported}</span>
                        <span>•</span>
                        <span>Updated: {selectedCase.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(selectedCase.priority)}`}>
                        {selectedCase.priority.charAt(0).toUpperCase() + selectedCase.priority.slice(1)} Priority
                      </span>
                      <button
                        onClick={() => setShowChatPanel(!showChatPanel)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Status and Assignment */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedCase.legalStatus)}`}></div>
                        <span className="font-medium text-gray-900">
                          Status: {getStatusText(selectedCase.legalStatus)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {selectedCase.assignedLawyer || 'Unassigned'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!selectedCase.assignedLawyer && (
                        <button
                          onClick={handleClaimCase}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Claim Case
                        </button>
                      )}
                      <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        value={selectedCase.legalStatus}
                        onChange={(e) => handleStatusUpdate(e.target.value)}
                      >
                        <option value="needs-review">Needs Review</option>
                        <option value="drafted">Drafted</option>
                        <option value="filed">Filed</option>
                        <option value="court-scheduled">Court Scheduled</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {/* Tabs */}
                  <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'details' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab('details')}
                    >
                      Case Details
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'documents' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab('documents')}
                    >
                      Documents ({selectedCase.legalDocuments.length})
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'timeline' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab('timeline')}
                    >
                      Timeline
                    </button>
                  </div>

                  {/* Case Details Tab */}
                  {activeTab === 'details' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-3">Incident Information</h4>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium text-blue-800">Type:</span>
                              <span className="ml-2 text-blue-700">{selectedCase.incidentType.replace('-', ' ')}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-blue-800">Date Reported:</span>
                              <span className="ml-2 text-blue-700">{selectedCase.dateReported}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-blue-800">Estimated Damages:</span>
                              <span className="ml-2 text-blue-700">{selectedCase.estimatedDamages}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-medium text-yellow-900 mb-3">Safety Assessment</h4>
                          <p className="text-yellow-800">{selectedCase.safetyAssessment}</p>
                          {selectedCase.courtDate && (
                            <div className="mt-3 pt-3 border-t border-yellow-200">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-800">Court Date:</span>
                                <span className="text-yellow-700">{selectedCase.courtDate}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Incident Description</h4>
                        <p className="text-gray-700 leading-relaxed">{selectedCase.incidentDescription}</p>
                      </div>
                    </div>
                  )}

                  {/* Documents Tab */}
                  {activeTab === 'documents' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">Legal Documents</h4>
                        <label className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
                          <Upload className="h-4 w-4" />
                          <span>Upload Document</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx"
                          />
                        </label>
                      </div>

                      <div className="space-y-3">
                        {selectedCase.legalDocuments.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p>No legal documents uploaded</p>
                            <p className="text-sm">Upload legal filings, contracts, or evidence</p>
                          </div>
                        ) : (
                          selectedCase.legalDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-purple-500" />
                                <span className="text-gray-900">{doc}</span>
                              </div>
                              <button className="text-purple-600 hover:text-purple-800 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Timeline Tab */}
                  {activeTab === 'timeline' && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Case Timeline</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-gray-900">Case Reported</p>
                            <p className="text-sm text-gray-500">{selectedCase.dateReported}</p>
                          </div>
                        </div>
                        {selectedCase.assignedLawyer && (
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                              <p className="font-medium text-gray-900">Lawyer Assigned</p>
                              <p className="text-sm text-gray-500">{selectedCase.assignedLawyer}</p>
                            </div>
                          </div>
                        )}
                        {selectedCase.legalStatus !== 'needs-review' && (
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                              <p className="font-medium text-gray-900">Status: {getStatusText(selectedCase.legalStatus)}</p>
                              <p className="text-sm text-gray-500">{selectedCase.lastUpdated}</p>
                            </div>
                          </div>
                        )}
                        {selectedCase.courtDate && (
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <div>
                              <p className="font-medium text-gray-900">Court Date Scheduled</p>
                              <p className="text-sm text-gray-500">{selectedCase.courtDate}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* No Case Selected */
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Scale className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Select a Case</h3>
                  <p>Choose a legal case from the list to review details and manage documents</p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Panel */}
          {showChatPanel && selectedCase && (
            <div className="w-80 bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Team Chat</h3>
                  <button
                    onClick={() => setShowChatPanel(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <p className="text-sm text-gray-500">Case #{selectedCase.id} - {selectedCase.clientName}</p>
              </div>

              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {getCaseMessages(selectedCase.id).map((message) => (
                  <div key={message.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.role}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-700">{message.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;