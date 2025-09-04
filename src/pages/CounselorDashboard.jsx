import React, { useState } from "react";
import {
  Calendar,
  Clock,
  FileText,
  MessageCircle,
  UserCheck,
  Upload,
  Phone,
  Video,
  Mail,
  Download,
  Plus,
  Edit,
  Check,
  AlertCircle,
  Heart,
  Shield,
  BookOpen,
  Users,
} from "lucide-react";
import dayjs from "dayjs";
import Header from "../components/AdminComponents/Header";
import useReports from "../hooks/useReportStats";
import ReportModal from "../components/ReportModal";
import AppointmentsManagement from "../components/AdminComponents/AppointmentManagement";

const CounselorDashboard = () => {
  const [activeTab, setActiveTab] = useState("reports");
  const [selectedVictim, setSelectedVictim] = useState(null);
  const [showNewSession, setShowNewSession] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newSessionNotes, setNewSessionNotes] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const { allReports, appointments } = useReports();

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const [sessions, setSessions] = useState([
    {
      id: "S001",
      victimId: "RPT001",
      date: "2024-07-22",
      duration: "60 minutes",
      type: "Individual Therapy",
      notes:
        "Client showed improvement in expressing emotions. Discussed coping strategies for anxiety.",
      outcome: "Positive progress",
      followUpNeeded: true,
      status: "Completed",
    },
    {
      id: "S002",
      victimId: "RPT003",
      date: "2024-07-23",
      duration: "45 minutes",
      type: "Support Session",
      notes:
        "Focused on building self-confidence and workplace boundary setting.",
      outcome: "Good engagement",
      followUpNeeded: true,
      status: "Completed",
    },
  ]);


  const [resources] = useState([
    {
      id: 1,
      name: "Trauma Recovery Guide",
      type: "PDF",
      uploadDate: "2024-07-20",
    },
    {
      id: 2,
      name: "Breathing Exercises Video",
      type: "MP4",
      uploadDate: "2024-07-19",
    },
    {
      id: 3,
      name: "Crisis Contact Numbers",
      type: "PDF",
      uploadDate: "2024-07-18",
    },
    {
      id: 4,
      name: "Self-Care Strategies",
      type: "PDF",
      uploadDate: "2024-07-17",
    },
  ]);

  const getRiskLevelColor = (level) => {
    switch (level) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddSession = () => {
    if (newSessionNotes.trim() && selectedVictim) {
      const newSession = {
        id: `S${String(sessions.length + 1).padStart(3, "0")}`,
        victimId: selectedVictim.id,
        date: new Date().toISOString().split("T")[0],
        duration: "60 minutes",
        type: "Individual Therapy",
        notes: newSessionNotes,
        outcome: "Session completed",
        followUpNeeded: true,
        status: "Completed",
      };
      setSessions([...sessions, newSession]);
      setNewSessionNotes("");
      setShowNewSession(false);
    }
  };

  const VictimDetailsModal = ({ victim, onClose, report }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Victim Details - {victim.victimName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Basic Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {report.full_name}
                </p>

                <p>
                  <span className="font-medium">Case ID:</span>{" "}
                  {report.reference_code}
                </p>
                <p>
                  <span className="font-medium">Date Reported:</span>{" "}
                  {report.dateReported}
                </p>
                <p>
                  <span className="font-medium">Incident Type:</span>{" "}
                  {report.incident_type}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Risk Level:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs border ${getRiskLevelColor(
                      victim.riskLevel
                    )}`}
                  >
                    {victim.riskLevel}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Counseling Progress
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Status:</span> {report.status}
                </p>
                <p>
                  <span className="font-medium">Sessions Completed:</span>{" "}
                  {victim.sessionsCompleted}
                </p>
                <p>
                  <span className="font-medium">Last Session:</span>{" "}
                  {victim.lastSession || "None"}
                </p>
                <p>
                  <span className="font-medium">Next Appointment:</span>{" "}
                  {victim.nextAppointment || "Not scheduled"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Case Summary
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Client presenting with symptoms related to{" "}
                {victim.incidentType.toLowerCase()}.
                {victim.sessionsCompleted > 0
                  ? ` Has completed ${victim.sessionsCompleted} counseling sessions with positive engagement. `
                  : " Awaiting initial assessment. "}
                {victim.riskLevel === "High"
                  ? "Requires immediate attention and frequent check-ins."
                  : victim.riskLevel === "Medium"
                  ? "Regular monitoring and support recommended."
                  : "Stable progress with routine follow-up care."}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowNewSession(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                New Session
              </button>
              <button
                onClick={() => setShowScheduleForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Calendar className="w-4 h-4" />
                Schedule Appointment
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <MessageCircle className="w-4 h-4" />
                Send Message
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                <UserCheck className="w-4 h-4" />
                Refer to Specialist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NewSessionModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Record New Session
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Notes
            </label>
            <textarea
              value={newSessionNotes}
              onChange={(e) => setNewSessionNotes(e.target.value)}
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Record session details, progress, observations, and outcomes..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSession}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              {
                id: "reports",
                label: "Reports for Counseling",
                icon: FileText,
              },
              {
                id: "sessions",
                label: "Counseling Sessions",
                icon: MessageCircle,
              },
              { id: "appointments", label: "Appointments", icon: Calendar },
              // { id: 'resources', label: 'Support Resources', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Reports Requiring Counseling
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Filter by:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>All Priority Levels</option>
                  <option>High Priority</option>
                  <option>Medium Priority</option>
                  <option>Low Priority</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {allReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-purple-400">
                          {report.full_name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <span className="text-gray-700">Case ID:</span>
                          <p className="font-medium">{report.reference_code}</p>
                        </div>
                        <div>
                          <span className="text-gray-700">Full Name:</span>
                          <p className="font-medium">{report.full_name}</p>
                        </div>
                        <div>
                          <span className="text-gray-700">Incident Type:</span>
                          <p className="font-medium">{report.incident_type}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Sessions:</span>
                          <p className="font-medium">
                            {report.sessionsCompleted}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Date Reported:</span>
                          <p className="font-medium">
                            {dayjs(report.incident_date).format("YYYY-MM-DD")}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>

                          <p
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {report.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewReport(report)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all text-white rounded-lg  text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Counseling Sessions
              </h2>
              <button
                onClick={() => setShowNewSession(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Record New Session
              </button>
            </div>

            <div className="grid gap-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Session {session.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Client:{" "}
                        {
                          allReports.find((r) => r.id === session.victimId)
                            ?.victimName
                        }
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        session.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <p className="font-medium">{session.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <p className="font-medium">{session.duration}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <p className="font-medium">{session.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Outcome:</span>
                      <p className="font-medium">{session.outcome}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-gray-500 text-sm">
                      Session Notes:
                    </span>
                    <p className="mt-1 text-gray-700">{session.notes}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {session.followUpNeeded && (
                        <span className="flex items-center gap-1 text-sm text-orange-600">
                          <AlertCircle className="w-4 h-4" />
                          Follow-up needed
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <AppointmentsManagement 
          appointments_={appointments}
          allReports={allReports}
          />
        )}

        {activeTab === "resources" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Support Resources
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Upload className="w-4 h-4" />
                Upload Resource
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {resource.name}
                        </h3>
                        <p className="text-sm text-gray-600">{resource.type}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    Uploaded: {resource.uploadDate}
                  </p>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "referrals" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Referrals & Specialist Contacts
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                <UserCheck className="w-4 h-4" />
                New Referral
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Medical Referrals
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Dr. Sarah Wilson</p>
                      <p className="text-sm text-gray-600">Trauma Specialist</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Dr. Michael Chen</p>
                      <p className="text-sm text-gray-600">Psychiatrist</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Legal Referrals
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Attorney Jennifer Davis</p>
                      <p className="text-sm text-gray-600">Family Law</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Legal Aid Society</p>
                      <p className="text-sm text-gray-600">Pro Bono Services</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedVictim && (
        <VictimDetailsModal
          victim={selectedVictim}
          onClose={() => setSelectedVictim(null)}
          report={{}}
        />
      )}

      <ReportModal
        isOpen={showReportModal}
        reportContent={selectedReport}
        onClose={() => {
          setSelectedReport(null);
          setShowReportModal(false);
        }}
        onExport={() => {}}
      />

      {showNewSession && (
        <NewSessionModal onClose={() => setShowNewSession(false)} />
      )}

      {showScheduleForm && (
        <ScheduleAppointmentModal
          onClose={() => setShowScheduleForm(false)}
          reports={allReports}
          setAppointments={setAppointments}
        />
      )}
    </div>
  );
};

const ScheduleAppointmentModal = ({ onClose, reports, setAppointments }) => {
  const [selectedVictim, setSelectedVictim] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("Follow-up Session");

  const handleSchedule = () => {
    if (selectedVictim && appointmentDate && appointmentTime) {
      const newAppointment = {
        id: `A${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
        victimId: selectedVictim,
        date: appointmentDate,
        time: appointmentTime,
        type: appointmentType,
        status: "Scheduled",
      };
      setAppointments((prev) => [...prev, newAppointment]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Schedule Appointment
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Client
            </label>
            <select
              value={selectedVictim}
              onChange={(e) => setSelectedVictim(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a client...</option>
              {reports.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.victimName} ({report.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Type
            </label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Follow-up Session</option>
              <option>Initial Assessment</option>
              <option>Progress Review</option>
              <option>Crisis Intervention</option>
              <option>Group Therapy</option>
              <option>Family Session</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSchedule}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all text-white rounded-lg"
            >
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;
