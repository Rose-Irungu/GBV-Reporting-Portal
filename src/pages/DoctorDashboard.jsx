import React, { useState } from 'react';
import { 
  FileText, 
  User, 
  Clock, 
  AlertTriangle, 
  Upload, 
  Plus, 
  Search,
  Filter,
  Eye,
  Edit3,
  Calendar,
  Stethoscope,
  Heart,
  Activity,
  BookOpen,
  Shield,
  Phone,
  AlertCircle,
  Users,
  Brain,
  Home
} from 'lucide-react';

import Header from '../components/DoctorsComponents/Header';
import { getAssignments } from '../services/assignment';




const DoctorDashboard = () => {

  const [reports, setReports] = useState([
    {
      id: 1,
      victimName: "John Doe",
      contactInfo: "john.doe@email.com | (555) 123-4567",
      incidentDescription: "Workplace injury - fall from height resulting in suspected spinal injury",
      dateReported: "2025-01-15",
      priority: "critical",
      medicalNotes: [],
      documents: [],
      status: "pending",
      lastUpdated: "2025-01-15"
    },
    {
      id: 2,
      victimName: "Maria Rodriguez",
      contactInfo: "maria.r@email.com | (555) 987-6543",
      incidentDescription: "Assault case with head trauma and multiple contusions",
      dateReported: "2025-01-14",
      priority: "high",
      medicalNotes: [
        {
          id: 1,
          date: "2025-01-14",
          doctor: "Dr. Smith",
          diagnosis: "Mild concussion, multiple contusions",
          treatment: "Pain management, observation",
          recommendations: "Follow-up in 48 hours, CT scan if symptoms worsen"
        }
      ],
      documents: ["initial_assessment.pdf"],
      status: "in-progress",
      lastUpdated: "2025-01-14"
    },
    {
      id: 3,
      victimName: "Sarah Johnson",
      contactInfo: "s.johnson@email.com | (555) 456-7890",
      incidentDescription: "Motor vehicle accident with suspected internal injuries",
      dateReported: "2025-01-13",
      priority: "critical",
      medicalNotes: [
        {
          id: 1,
          date: "2025-01-13",
          doctor: "Dr. Williams",
          diagnosis: "Internal bleeding, broken ribs",
          treatment: "Emergency surgery, blood transfusion",
          recommendations: "ICU monitoring, follow-up surgery in 72 hours"
        }
      ],
      documents: ["xray_results.pdf", "surgery_report.pdf"],
      status: "completed",
      lastUpdated: "2025-01-13"
    }
  ]);

  // Educational resources data
  const [educationalResources] = useState([
    {
      id: 1,
      title: "What to Do If You've Been Assaulted",
      category: "assault",
      icon: Shield,
      content: [
        {
          step: "Immediate Safety",
          details: "Get to a safe place immediately. If you're in immediate danger, call emergency services (911)."
        },
        {
          step: "Seek Medical Attention",
          details: "Even if you feel fine, get medical care. Some injuries may not be immediately apparent, and evidence can be collected."
        },
        {
          step: "Don't Clean Up",
          details: "Don't shower, brush teeth, or change clothes before medical examination if possible - this preserves evidence."
        },
        {
          step: "Contact Support",
          details: "Reach out to trusted friends, family, or professional counselors. You don't have to go through this alone."
        },
        {
          step: "Report When Ready",
          details: "You can report to police when you're ready. There's no time limit for reporting assault."
        },
        {
          step: "Document Everything",
          details: "Keep records of medical visits, counseling sessions, and any communications related to the incident."
        }
      ]
    },
    {
      id: 2,
      title: "Workplace Injury Response",
      category: "workplace",
      icon: AlertTriangle,
      content: [
        {
          step: "Immediate Response",
          details: "Stop work immediately and assess the severity of the injury. Call for help if needed."
        },
        {
          step: "Notify Supervisor",
          details: "Inform your supervisor or manager about the injury as soon as possible."
        },
        {
          step: "Seek Medical Care",
          details: "Get appropriate medical attention. Your employer should provide information about approved healthcare providers."
        },
        {
          step: "Document the Incident",
          details: "Report the injury officially and ensure an incident report is filed with your employer."
        },
        {
          step: "Know Your Rights",
          details: "You have rights to workers' compensation and safe working conditions. Don't let anyone discourage you from reporting."
        },
        {
          step: "Follow Up",
          details: "Attend all medical appointments and keep detailed records of your treatment and recovery."
        }
      ]
    },
    {
      id: 3,
      title: "Domestic Violence Support",
      category: "domestic",
      icon: Home,
      content: [
        {
          step: "Safety Planning",
          details: "Create a safety plan including safe places to go, important documents to keep ready, and trusted contacts."
        },
        {
          step: "Emergency Contacts",
          details: "National Domestic Violence Hotline: 1-800-799-7233 (available 24/7, free and confidential)."
        },
        {
          step: "Document Abuse",
          details: "Keep records of incidents, take photos of injuries, and save threatening messages or emails."
        },
        {
          step: "Seek Medical Care",
          details: "Get medical attention for injuries and ask healthcare providers to document abuse-related injuries."
        },
        {
          step: "Legal Protection",
          details: "Consider obtaining a protective order or restraining order through the court system."
        },
        {
          step: "Build Support Network",
          details: "Connect with local domestic violence organizations, counselors, and trusted friends or family."
        }
      ]
    },
    {
      id: 4,
      title: "Mental Health Crisis Support",
      category: "mental-health",
      icon: Brain,
      content: [
        {
          step: "Immediate Crisis",
          details: "If you're having thoughts of suicide, call 988 (Suicide & Crisis Lifeline) available 24/7."
        },
        {
          step: "Recognize Warning Signs",
          details: "Persistent sadness, hopelessness, withdrawal from activities, changes in sleep or appetite."
        },
        {
          step: "Reach Out for Help",
          details: "Contact a mental health professional, trusted friend, family member, or crisis helpline."
        },
        {
          step: "Emergency Situations",
          details: "Go to the nearest emergency room or call 911 if you're in immediate danger."
        },
        {
          step: "Follow-up Care",
          details: "Engage with mental health services, attend therapy appointments, and take prescribed medications as directed."
        },
        {
          step: "Build Coping Strategies",
          details: "Learn healthy coping mechanisms through therapy, support groups, and self-care practices."
        }
      ]
    }
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [activeTab, setActiveTab] = useState('reports');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({
    diagnosis: '',
    treatment: '',
    recommendations: ''
  });

  // Filter reports based on search and priority
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.victimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.incidentDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || report.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAddNote = () => {
    if (selectedReport && newNote.diagnosis) {
      const updatedReports = reports.map(report => {
        if (report.id === selectedReport.id) {
          return {
            ...report,
            medicalNotes: [
              ...report.medicalNotes,
              {
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                doctor: "Dr. Current User",
                diagnosis: newNote.diagnosis,
                treatment: newNote.treatment,
                recommendations: newNote.recommendations
              }
            ],
            lastUpdated: new Date().toISOString().split('T')[0],
            status: 'in-progress'
          };
        }
        return report;
      });
      
      setReports(updatedReports);
      setSelectedReport(updatedReports.find(r => r.id === selectedReport.id));
      setNewNote({ diagnosis: '', treatment: '', recommendations: '' });
      setShowNewNoteForm(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedReport) {
      const updatedReports = reports.map(report => {
        if (report.id === selectedReport.id) {
          return {
            ...report,
            documents: [...report.documents, file.name]
          };
        }
        return report;
      });
      setReports(updatedReports);
      setSelectedReport(updatedReports.find(r => r.id === selectedReport.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Panel - Reports List */}
          <div className="w-1/2 bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Medical Reports</h2>
                <div className="text-sm text-gray-500">
                  {filteredReports.filter(r => r.status === 'pending').length} pending review
                </div>
              </div>
              
              {/* Search and Filter */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Reports List */}
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedReport?.id === report.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {report.anonymous ? 'Anonymous Patient' : report.victimName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status)}`}></div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(report.priority)}`}>
                        {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {report.incidentDescription}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{report.dateReported}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-3 w-3" />
                      <span>{report.medicalNotes.length} notes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Report Details */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border">
            {selectedReport ? (
              <div className="h-full">
                {/* Report Header */}
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedReport.anonymous ? 'Anonymous Patient' : selectedReport.victimName}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Case #{selectedReport.id}</span>
                        <span>•</span>
                        <span>Reported: {selectedReport.dateReported}</span>
                        <span>•</span>
                        <span>Last Updated: {selectedReport.lastUpdated}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(selectedReport.priority)}`}>
                      {selectedReport.priority.charAt(0).toUpperCase() + selectedReport.priority.slice(1)} Priority
                    </div>
                  </div>

                  {/* Incident Description */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Incident Description</h4>
                    <p className="text-gray-700">{selectedReport.incidentDescription}</p>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {/* Tabs */}
                  <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'notes' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab('notes')}
                    >
                      Medical Notes ({selectedReport.medicalNotes.length})
                    </button>
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'documents' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab('documents')}
                    >
                      Documents ({selectedReport.documents.length})
                    </button>
                  </div>

                  {/* Medical Notes Tab */}
                  {activeTab === 'notes' && (
                    <div className="space-y-4">
                      {/* Add New Note Button */}
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">Medical History & Notes</h4>
                        <button
                          onClick={() => setShowNewNoteForm(!showNewNoteForm)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Note</span>
                        </button>
                      </div>

                      {/* New Note Form */}
                      {showNewNoteForm && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                          <h5 className="font-medium text-blue-900">Add Medical Note</h5>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Diagnosis Summary *
                              </label>
                              <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="2"
                                placeholder="Enter diagnosis..."
                                value={newNote.diagnosis}
                                onChange={(e) => setNewNote({...newNote, diagnosis: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Treatment Given
                              </label>
                              <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="2"
                                placeholder="Describe treatment..."
                                value={newNote.treatment}
                                onChange={(e) => setNewNote({...newNote, treatment: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Recommendations
                              </label>
                              <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="2"
                                placeholder="Follow-up recommendations..."
                                value={newNote.recommendations}
                                onChange={(e) => setNewNote({...newNote, recommendations: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={handleAddNote}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              disabled={!newNote.diagnosis}
                            >
                              Save Note
                            </button>
                            <button
                              onClick={() => {
                                setShowNewNoteForm(false);
                                setNewNote({ diagnosis: '', treatment: '', recommendations: '' });
                              }}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Existing Notes */}
                      <div className="space-y-4">
                        {selectedReport.medicalNotes.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p>No medical notes yet</p>
                            <p className="text-sm">Add the first medical assessment</p>
                          </div>
                        ) : (
                          selectedReport.medicalNotes.map((note) => (
                            <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-2">
                                  <Heart className="h-4 w-4 text-red-500" />
                                  <span className="font-medium text-gray-900">{note.doctor}</span>
                                </div>
                                <span className="text-sm text-gray-500">{note.date}</span>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <h6 className="text-sm font-medium text-gray-700 mb-1">Diagnosis</h6>
                                  <p className="text-gray-900">{note.diagnosis}</p>
                                </div>
                                {note.treatment && (
                                  <div>
                                    <h6 className="text-sm font-medium text-gray-700 mb-1">Treatment</h6>
                                    <p className="text-gray-900">{note.treatment}</p>
                                  </div>
                                )}
                                {note.recommendations && (
                                  <div>
                                    <h6 className="text-sm font-medium text-gray-700 mb-1">Recommendations</h6>
                                    <p className="text-gray-900">{note.recommendations}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Documents Tab */}
                  {activeTab === 'documents' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">Medical Documents</h4>
                        <label className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                          <Upload className="h-4 w-4" />
                          <span>Upload Document</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx,.jpg,.png"
                          />
                        </label>
                      </div>

                      <div className="space-y-3">
                        {selectedReport.documents.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <Upload className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p>No documents uploaded</p>
                            <p className="text-sm">Upload medical reports, images, or test results</p>
                          </div>
                        ) : (
                          selectedReport.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <span className="text-gray-900">{doc}</span>
                              </div>
                              <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* No Report Selected */
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Stethoscope className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Select a Report</h3>
                  <p>Choose a medical report from the list to review details and add notes</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;