import { useState } from "react";
import {
  X,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  Clock,
  Shield,
  Eye,
  EyeOff,
  Edit,
  UserCheck,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Stethoscope,
  Scale,
  Heart,
} from "lucide-react";
import useReports from "../hooks/useReportStats";


export default function ReportDetailModal({
  isOpen,
  onClose,
  report,
  onEdit,
  onAssign,
}) {
  console.log(isOpen);

  const [activeTab, setActiveTab] = useState("details");
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    incident: true,
    reporter: true,
    status: true,
    actions: true,
  });

  const mockReport = report || {
    reference_code: "GBV3RQP1Y",
    name: "Jessy Senger",
    email: "test@test.com",
    phone: null,
    status: "pending",
    incident_date: "2025-07-15T17:50:00Z",
    incident_location: "kajiado",
    incident_type: "sexual",
    description: "fggfbfg",
    is_deleted: false,
    immediate_danger: true,
    needs_medical_attention: false,
    date_reported: "2025-07-23T14:51:24.242099Z",
    reporter: 1,
    assigned_to: null,
  };

  const mockAdditionalData = {
    reporter_details: {
      id: 1,
      name: "Mary Njeri",
      role: "survivor",
      phone: "+254700123456",
    },
    assigned_professional: null,
    case_notes: [
      {
        id: 1,
        author: "System",
        content:
          "Case automatically flagged as high priority due to immediate danger indicator",
        timestamp: "2025-07-23T14:51:24Z",
        type: "system",
      },
    ],
    related_appointments: [],
    timeline: [
      {
        id: 1,
        action: "Report Created",
        timestamp: "2025-07-23T14:51:24Z",
        actor: "Mary Njeri",
        details: "Initial report submitted",
      },
    ],
  };

  if (!isOpen) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
        label: "Pending Review",
      },
      in_progress: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Activity,
        label: "In Progress",
      },
      resolved: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
        label: "Resolved",
      },
      closed: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: XCircle,
        label: "Closed",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}
      >
        <IconComponent className="w-4 h-4 mr-2" />
        {config.label}
      </span>
    );
  };

  const getIncidentTypeBadge = (type) => {
    const typeConfig = {
      physical: {
        color: "bg-red-100 text-red-800",
        label: "Physical Violence",
      },
      sexual: {
        color: "bg-purple-100 text-purple-800",
        label: "Sexual Violence",
      },
      emotional: {
        color: "bg-orange-100 text-orange-800",
        label: "Emotional Abuse",
      },
      economic: { color: "bg-blue-100 text-blue-800", label: "Economic Abuse" },
      other: { color: "bg-gray-100 text-gray-800", label: "Other" },
    };

    const config = typeConfig[type] || typeConfig.other;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getPriorityIndicator = () => {
    const isHighPriority =
      report.immediate_danger || report.needs_medical_attention;
    return isHighPriority ? (
      <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <div>
          <p className="text-sm font-medium text-red-800">High Priority Case</p>
          <p className="text-xs text-red-600">
            {report.immediate_danger && "Immediate danger indicated. "}
            {report.needs_medical_attention &&
              "Medical attention required."}
          </p>
        </div>
      </div>
    ) : (
      <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
        <Shield className="w-5 h-5 text-green-600" />
        <div>
          <p className="text-sm font-medium text-green-800">
            Standard Priority
          </p>
          <p className="text-xs text-green-600">
            No immediate danger indicators
          </p>
        </div>
      </div>
    );
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const tabs = [
    { id: "details", label: "Case Details", icon: FileText },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "notes", label: "Case Notes", icon: MessageSquare },
    { id: "actions", label: "Actions", icon: Activity },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Case Report - {report.reference_code}
                  </h3>
                  <p className="text-purple-100 text-sm">
                    Reported on {formatDateTime(report.date_reported)}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Status and Priority */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-3">
                {getStatusBadge(report.status)}
                {getIncidentTypeBadge(report.incident_type)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit && onEdit(report)}
                  className="flex items-center px-3 py-1.5 text-sm text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                {!report.assigned_to && (
                  <button
                    onClick={() => onAssign && onAssign(report)}
                    className="flex items-center px-3 py-1.5 text-sm text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                  >
                    <UserCheck className="w-4 h-4 mr-1" />
                    Assign
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {/* Priority Alert */}
            <div className="mb-6">{getPriorityIndicator()}</div>

            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Reporter Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2 text-purple-600" />
                      Reporter Information
                    </h4>
                    <button
                      onClick={() => toggleSection("reporter")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedSections.reporter ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {expandedSections.reporter && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="text-sm font-medium text-gray-900">
                            {report.full_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-900">
                            {report.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-sm font-medium text-gray-900">
                            {report.phone_number || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <UserCheck className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Reporter ID</p>
                          <p className="text-sm font-medium text-gray-900">
                            #{report.reporter}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Incident Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-purple-600" />
                      Incident Details
                    </h4>
                    <button
                      onClick={() => toggleSection("incident")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedSections.incident ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {expandedSections.incident && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">
                              Incident Date
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDateTime(report.incident_date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {report.incident_location}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Incident Type
                        </p>
                        {getIncidentTypeBadge(report.incident_type)}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-500">Description</p>
                          <button
                            onClick={() =>
                              setShowSensitiveInfo(!showSensitiveInfo)
                            }
                            className="flex items-center text-xs text-gray-400 hover:text-gray-600"
                          >
                            {showSensitiveInfo ? (
                              <EyeOff className="w-3 h-3 mr-1" />
                            ) : (
                              <Eye className="w-3 h-3 mr-1" />
                            )}
                            {showSensitiveInfo ? "Hide" : "Show"} Details
                          </button>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          {showSensitiveInfo ? (
                            <p className="text-sm text-gray-900">
                              {report.description}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-400">
                              Click "Show Details" to view sensitive content
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-dashed border-red-200 bg-red-50">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="text-sm font-medium text-red-800">
                              Immediate Danger
                            </p>
                            <p className="text-xs text-red-600">
                              {report.immediate_danger
                                ? "Yes - Requires urgent attention"
                                : "No immediate danger reported"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-dashed border-blue-200 bg-blue-50">
                          <Stethoscope className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-blue-800">
                              Medical Attention
                            </p>
                            <p className="text-xs text-blue-600">
                              {report.needs_medical_attention
                                ? "Medical attention required"
                                : "No medical attention needed"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assignment Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-purple-600" />
                    Assignment Status
                  </h4>
                  {report.assigned_to ? (
                    <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Assigned Professional
                        </p>
                        <p className="text-xs text-green-600">
                          Professional ID: {report.assigned_to}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">
                            Unassigned
                          </p>
                          <p className="text-xs text-yellow-600">
                            This case needs to be assigned to a professional
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onAssign && onAssign(report)}
                        className="px-3 py-1 text-xs font-medium text-yellow-800 bg-yellow-200 hover:bg-yellow-300 rounded-lg transition-colors"
                      >
                        Assign Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Case Timeline
                </h4>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {mockAdditionalData.timeline.map((event, eventIdx) => (
                      <li key={event.id}>
                        <div className="relative pb-8">
                          {eventIdx !==
                          mockAdditionalData.timeline.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center ring-8 ring-white">
                                <Clock className="h-4 w-4 text-white" />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {event.action}
                                  </span>{" "}
                                  by {event.actor}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {event.details}
                                </p>
                              </div>
                              <div className="text-right text-xs whitespace-nowrap text-gray-500">
                                {formatDateTime(event.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Case Notes
                  </h4>
                  <button className="flex items-center px-3 py-1.5 text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Add Note
                  </button>
                </div>
                <div className="space-y-3">
                  {mockAdditionalData.case_notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            {note.content}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-xs text-gray-500">{note.author}</p>
                          <p className="text-xs text-gray-400">
                            {formatDateTime(note.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "actions" && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Schedule Counseling
                      </p>
                      <p className="text-sm text-gray-500">
                        Book a session with a counselor
                      </p>
                    </div>
                  </button>

                  <button className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Stethoscope className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Medical Appointment
                      </p>
                      <p className="text-sm text-gray-500">
                        Schedule medical examination
                      </p>
                    </div>
                  </button>

                  <button className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Scale className="w-8 h-8 text-purple-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Legal Consultation
                      </p>
                      <p className="text-sm text-gray-500">
                        Connect with legal advisor
                      </p>
                    </div>
                  </button>

                  <button className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="w-8 h-8 text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Generate Report
                      </p>
                      <p className="text-sm text-gray-500">
                        Create detailed case report
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Case ID: {mockReport.reference_code} • Last updated:{" "}
              {formatDateTime(mockReport.date_reported)}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => onEdit && onEdit(mockReport)}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Edit Case
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
