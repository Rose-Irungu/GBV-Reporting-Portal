import { useState } from "react";
import {
  Calendar,
  FileText,
  Plus,
  CheckCircle,
  Eye,
  Upload,
  Shield,
  AlertTriangle,
  Gavel,
  Scale,
  MessageSquare,
  Phone,
  Bell,
  Search,
  User,
  X,
  Clock,
  MapPin
} from "lucide-react";
import Header from "../components/AdminComponents/Header";
import useReports from "../hooks/useReportStats";
import ReportModal from "../components/ReportModal";
import AppointmentsManagement from "../components/AdminComponents/AppointmentManagement";

const LawyerDashboard = () => {
  const [activeTab, setActiveTab] = useState("cases");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const [newNote, setNewNote] = useState("");

  // Mock data - replace with actual API calls
  const { allReports } = useReports();

  const [appointments] = useState([
    {
      id: 'A001',
      client_name: 'Sarah M.',
      appointment_type: 'Court Preparation',
      appointment_date: '2025-09-08',
      appointment_time: '10:00 AM',
      location: 'Office - Safe Room',
      notes: 'Prepare for restraining order hearing',
      status: 'Confirmed'
    },
    {
      id: 'A002',
      client_name: 'Maria L.',
      appointment_type: 'Follow-up Consultation',
      appointment_date: '2025-09-10',
      appointment_time: '2:00 PM',
      location: 'Video Call (Secure)',
      notes: 'Review case progress and safety plan',
      status: 'Confirmed'
    },
    {
      id: 'A003',
      client_name: 'New Client',
      appointment_type: 'Initial Consultation',
      appointment_date: '2025-09-09',
      appointment_time: '11:30 AM',
      location: 'Office - Safe Room',
      notes: 'Emergency referral from crisis center',
      status: 'Pending'
    }
  ]);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const addNote = (reportId) => {
    if (!newNote.trim()) return;

    // In a real app, you'd make an API call to save the note
    console.log(`Adding legal note to case ${reportId}:`, newNote);
    setNewNote("");
  };

  const updateReportStatus = (reportId, newStatus) => {
    // In a real app, you'd make an API call to update the legal status
    console.log(`Updating case ${reportId} legal status to ${newStatus}`);
  };

  const handleDocumentUpload = (reportId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // In a real app, you'd upload the legal document to your server
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(`Uploading legal document for case ${reportId}:`, file.name);
      // Handle document upload logic here
    };
    reader.readAsDataURL(file);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "high":
        return "text-orange-600 bg-orange-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getSafetyColor = (level) => {
    if (level?.includes('High')) return 'text-red-600 bg-red-50';
    if (level?.includes('Medium')) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const getCaseTypeIcon = (caseType) => {
    switch (caseType?.toLowerCase()) {
      case 'domestic violence':
        return <Shield className="w-5 h-5" />;
      case 'sexual assault':
        return <AlertTriangle className="w-5 h-5" />;
      case 'restraining order':
        return <Scale className="w-5 h-5" />;
      default:
        return <Gavel className="w-5 h-5" />;
    }
  };

  // Header Component
  <Header />

  // Report Modal Component
  const ReportModal = ({ isOpen, reportContent, onClose }) => {
    if (!isOpen || !reportContent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto m-4 w-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Full Case Report - {reportContent.full_name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Case Details</h3>
                  <p><strong>Reference:</strong> {reportContent.reference_code}</p>
                  <p><strong>Type:</strong> {reportContent.incident_type}</p>
                  <p><strong>Date Reported:</strong> {reportContent.date_reported}</p>
                  <p><strong>Status:</strong> {reportContent.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Safety Information</h3>
                  <p><strong>Priority Level:</strong> {reportContent.priority}</p>
                  <p><strong>Safety Assessment:</strong> {reportContent.safety_level}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Case Notes</h3>
                {reportContent.notes?.map((note) => (
                  <div key={note.id} className="bg-gray-50 p-4 rounded-lg mb-2">
                    <p>{note.text}</p>
                    <p className="text-sm text-gray-500 mt-2">{note.date} at {note.time}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Documents</h3>
                {reportContent.documents?.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>{doc.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{doc.upload_date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Appointments Management Component
  const AppointmentsManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Legal Consultations</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Consultation
        </button>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{appointment.client_name}</h3>
                <p className="text-sm text-gray-600">{appointment.appointment_type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                appointment.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {appointment.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-900">{appointment.appointment_date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-900">{appointment.appointment_time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-900">{appointment.location}</span>
              </div>
            </div>

            {appointment.notes && (
              <div className="mb-4">
                <p className="text-sm text-gray-600"><strong>Notes:</strong> {appointment.notes}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                Join/Start
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Reschedule
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700">
                Send Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Emergency Resources Component
  const EmergencyResources = () => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
      <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
        <Phone className="h-5 w-5 mr-2" />
        Emergency Resources
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-lg">
          <p className="font-medium text-gray-900">National DV Hotline</p>
          <p className="text-red-600 font-mono">1-800-799-7233</p>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <p className="font-medium text-gray-900">RAINN Hotline</p>
          <p className="text-red-600 font-mono">1-800-656-4673</p>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <p className="font-medium text-gray-900">Crisis Center</p>
          <p className="text-red-600 font-mono">(555) 123-4567</p>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <p className="font-medium text-gray-900">Legal Aid</p>
          <p className="text-red-600 font-mono">(555) 456-7890</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <div className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("cases")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "cases"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Gavel className="w-5 h-5" />
                <span className="font-medium">Legal Cases</span>
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "appointments"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Legal Consultations</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "cases" && (
            <div>
              {/* Emergency Resources */}
              <EmergencyResources />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cases List */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Assigned Legal Cases
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Click on a case to view legal details and manage documentation
                    </p>
                  </div>
                  <div className="divide-y">
                    {allReports && allReports.length > 0 ? (
                      allReports.map((report) => (
                        <div
                          key={report.id}
                          onClick={() => setSelectedReport(report)}
                          className={`p-6 cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedReport?.id === report.id
                              ? "bg-blue-50 border-l-4 border-blue-500"
                              : ""
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                {getCaseTypeIcon(report.incident_type)}
                                <h3 className="font-semibold text-gray-900">
                                  {report.full_name}
                                </h3>
                              </div>
                              <p className="text-gray-600 mt-1">
                                Case: {report.reference_code}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-gray-500">
                                  Filed: {report.date_reported || "N/A"}
                                </span>
                                <span className="text-sm text-gray-500">
                                  Type: {report.incident_type || "N/A"}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  report.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : report.status === "Active"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {report.status || "Pending Review"}
                              </span>
                              {report.priority && (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                    report.priority
                                  )}`}
                                >
                                  {report.priority} Priority
                                </span>
                              )}
                              {report.safety_level && (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(
                                    report.safety_level
                                  )}`}
                                >
                                  <Shield className="h-3 w-3 inline mr-1" />
                                  {report.safety_level}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        No legal cases assigned to you
                      </div>
                    )}
                  </div>
                </div>

                {/* Case Details */}
                <div className="bg-white rounded-xl shadow-sm border">
                  {selectedReport ? (
                    <div>
                      <div className="p-6 border-b">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              {getCaseTypeIcon(selectedReport.incident_type)}
                              <h2 className="text-xl font-semibold text-gray-900">
                                {selectedReport.full_name}
                              </h2>
                            </div>
                            <p className="text-gray-600 mt-1">
                              Legal Case: {selectedReport.reference_code}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewReport(selectedReport)}
                              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Full Case</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-6">
                        {/* Case Information */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">
                            Case Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Case ID:</span>
                              <span className="ml-2 text-gray-900">
                                {selectedReport.reference_code}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Legal Status:</span>
                              <span
                                className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                  selectedReport.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : selectedReport.status === "Active"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {selectedReport.status || "Pending Review"}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Date Filed:</span>
                              <span className="ml-2 text-gray-900">
                                {selectedReport.date_reported || "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Case Type:</span>
                              <span className="ml-2 text-gray-900">
                                {selectedReport.incident_type || "N/A"}
                              </span>
                            </div>
                            {selectedReport.safety_level && (
                              <div>
                                <span className="text-gray-500">Safety Assessment:</span>
                                <span
                                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(
                                    selectedReport.safety_level
                                  )}`}
                                >
                                  <Shield className="h-3 w-3 inline mr-1" />
                                  {selectedReport.safety_level}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Legal Notes Section */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">
                            Legal Notes & Case Updates
                          </h3>
                          <div className="space-y-3 mb-4">
                            {selectedReport.notes &&
                            selectedReport.notes.length > 0 ? (
                              selectedReport.notes.map((note) => (
                                <div
                                  key={note.id}
                                  className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500"
                                >
                                  <p className="text-gray-900 mb-2">
                                    {note.text}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {note.date} at {note.time}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">
                                No legal notes added yet
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder="Add legal note or case update..."
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              onKeyPress={(e) =>
                                e.key === "Enter" && addNote(selectedReport.id)
                              }
                            />
                            <button
                              onClick={() => addNote(selectedReport.id)}
                              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Legal Documents Section */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">
                            Legal Documents & Evidence
                          </h3>
                          <div className="grid grid-cols-1 gap-3 mb-4">
                            {selectedReport.documents &&
                            selectedReport.documents.length > 0 ? (
                              selectedReport.documents.map((doc) => (
                                <div
                                  key={doc.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <div>
                                      <p className="font-medium text-gray-900">
                                        {doc.name}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Uploaded: {doc.upload_date}
                                      </p>
                                    </div>
                                  </div>
                                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                                    View
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">
                                No legal documents uploaded yet
                              </p>
                            )}
                          </div>
                          <label className="flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                            <Upload className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">
                              Upload Legal Document
                            </span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={(e) =>
                                handleDocumentUpload(selectedReport.id, e)
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Gavel className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Select a Legal Case
                      </h3>
                      <p className="text-gray-600">
                        Choose a case from the list to view legal details and manage documentation
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "appointments" && <AppointmentsManagement />}
        </main>
      </div>

      {/* Report Modal */}

       {showReportModal && selectedReport && (
              <ReportModal
                report={selectedReport}
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
              />
            )}
      <ReportModal
        isOpen={showReportModal}
        reportContent={selectedReport}
        onClose={() => {
          setSelectedReport(null);
          setShowReportModal(false);
        }}
      />
    </div>
  );
};

export default LawyerDashboard;