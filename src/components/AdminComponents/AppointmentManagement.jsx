import React, { useState, useEffect } from "react";
import {
  Clock,
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Video,
  User,
  FileText,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import useReports from "../../hooks/useReportStats";
import AppointmentModal from "../modals/AppointmentModal";
import ReportModal from "../ReportModal";
import { updateAppointment } from "../../services/appointments";
import { fetchReport } from "../../services/reportService";

export default function AppointmentsManagement({
  appointments_,
  allReports,
  proffessionals, 
}) {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [appointments, setAppointments] = useState(appointments_);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showViewAppointmentModal, setViewShowAppointmentModal] =
    useState(false);

  const [reportContent, setReportContent] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const { getAppointments } = useReports();

  useEffect(() => {
    if (showReportModal && selectedAppointment?.report_reference) {
      const fetch_Report = async () => {
        try {
          const res = await fetchReport(selectedAppointment?.report_reference);
          setReportContent(res);
        } catch (err) {
          console.error("Failed to fetch report:", err);



        }
      };

      fetch_Report();
    }
  }, [showReportModal, selectedAppointment]);

  const getAppointmentTypeColor = (type) => {
    const colors = {
      counseling: "bg-green-100 text-green-800",
      medical: "bg-blue-100 text-blue-800",
      legal: "bg-purple-100 text-purple-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      scheduled: {
        color: "bg-blue-100 text-blue-800",
        icon: Clock,
        label: "Scheduled",
      },
      completed: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        label: "Completed",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: XCircle,
        label: "Cancelled",
      },
      rescheduled: {
        color: "bg-orange-100 text-orange-800",
        icon: AlertCircle,
        label: "Rescheduled",
      },
    };

    const config = statusConfig[status] || statusConfig.scheduled;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const handleCancelAppointment = async (id) => {
    const confirmed = confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmed) return;

    try {
      const res = await updateAppointment({ status: "cancelled" }, id);

      const updated = await res;

      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? updated : appt))
      );
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

const safeIncludes = (field, term) =>
  (field || "").toLowerCase().includes((term || "").toLowerCase());

const filteredAppointments = appointments.filter((appointment) => {
  const matchesSearch =
    safeIncludes(appointment.professional_name, searchTerm) ||
    safeIncludes(appointment.report_reference, searchTerm);

  if (selectedTab === "all") return matchesSearch;

  if (selectedTab === "upcoming")
    return matchesSearch && isUpcoming(appointment.scheduled_date);

  if (selectedTab === "past")
    return matchesSearch && !isUpcoming(appointment.scheduled_date);

  return matchesSearch && appointment.status === selectedTab;
});


  const tabs = [
    {
      id: "upcoming",
      label: "Upcoming",
      count: appointments.filter((a) => isUpcoming(a.scheduled_date)).length,
    },
    {
      id: "past",
      label: "Past",
      count: appointments.filter((a) => !isUpcoming(a.scheduled_date)).length,
    },
    {
      id: "completed",
      label: "Completed",
      count: appointments.filter((a) => a.status === "completed").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: appointments.filter((a) => a.status === "cancelled").length,
    },
    {
      id: "all",
      label: "All",
      count: appointments.length,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-purple-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Appointments Management
              </h2>
              <p className="text-gray-600">Manage and track all appointments</p>
            </div>
          </div>
          <button
            onClick={() => setShowAppointmentModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Appointment
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        
         
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedTab === tab.id
                  ? "text-purple-600 bg-purple-50 border border-purple-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Appointment Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Professional
              </th>
             
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => {
              const dateTime = formatDateTime(appointment.scheduled_date);
              return (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        #{appointment.id}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Ref: {appointment.report_reference}
                        </div>
                        <div className="text-sm text-gray-500">
                          Duration: {appointment.duration_minutes} mins
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.professional_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {appointment.professional}
                    </div>
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getAppointmentTypeColor(
                        appointment.appointment_type
                      )}`}
                    >
                      {appointment.appointment_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{dateTime.date}</div>
                    <div className="text-sm text-gray-500">{dateTime.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(appointment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      {appointment.is_virtual ? (
                        <div className="flex items-center text-blue-600">
                          <Video className="w-4 h-4 mr-1" />
                          Virtual
                        </div>
                      ) : appointment.location ? (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="truncate max-w-32">
                            {appointment.location}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">TBD</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="View Details"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setViewShowAppointmentModal(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        title="Edit Appointment"
                        onClick={() => {
                          setEditingAppointment(appointment);
                          setShowAppointmentModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="View Report"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowReportModal(true);
                        }}
                      >
                        <FileText className="w-4 h-4" />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Cancel Appointment"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-600 p-1 rounded"
                        title="More Options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No appointments found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? "Try adjusting your search criteria."
              : "Get started by creating a new appointment."}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </button>
            </div>
          )}
        </div>
      )}

      {/* Summary Cards */}
      {filteredAppointments.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">
                    Today's Appointments
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      appointments.filter((a) => {
                        const today = new Date().toDateString();
                        return (
                          new Date(a.scheduled_date).toDateString() === today
                        );
                      }).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      appointments.filter((a) => a.status === "completed")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-8 w-8 text-orange-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Upcoming</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      appointments.filter(
                        (a) =>
                          isUpcoming(a.scheduled_date) &&
                          a.status === "scheduled"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Video className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">
                    Virtual Sessions
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {appointments.filter((a) => a.is_virtual).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer with pagination */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredAppointments.length} of {appointments.length}{" "}
            appointments
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
              2
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
      {showAppointmentModal && (
        <AppointmentModal
          isOpen={showAppointmentModal}
          onClose={() => {
            setShowAppointmentModal(false);
            setEditingAppointment(null);
          }}
          onSubmit={(formData) => {
            console.log(formData);
            if (editingAppointment) {
              // handleEditAppointment(formData);
            } else {
              console.log("Submitting appointment");
              // handleCreateAppointment(formData);
            }
          }}
          editingAppointment={editingAppointment}
          allReports={allReports}
          professionals={proffessionals}
        />
      )}
      {showViewAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurred and dimmed background */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-200"
            onClick={() => setViewShowAppointmentModal(false)}
          />

          {/* Modal box */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-200 scale-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                      />
                    </svg>
                    Appointment Details
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    ID:{" "}
                    <span className="font-mono font-medium text-blue-600">
                      #{selectedAppointment.id}
                    </span>
                  </p>
                </div>

                {/* Close button */}
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 transition-colors duration-150 shadow-sm"
                  onClick={() => setViewShowAppointmentModal(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Status and Type Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {selectedAppointment.appointment_type
                    .replace("_", " ")
                    .toUpperCase()}
                </div>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    selectedAppointment.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : selectedAppointment.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : selectedAppointment.status === "scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {selectedAppointment.status === "cancelled" && "❌ "}
                  {selectedAppointment.status === "completed" && "✅ "}
                  {selectedAppointment.status === "scheduled" && "📅 "}
                  {selectedAppointment.status.toUpperCase()}
                </div>
                {selectedAppointment.is_virtual && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    💻 VIRTUAL
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Reference Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                    Reference
                  </h3>
                  <p className="text-sm text-gray-900 font-mono">
                    {selectedAppointment.report_reference}
                  </p>
                </div>

                {/* Professional Information */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Professional
                  </h3>
                  <p className="text-sm font-medium text-blue-900">
                    {selectedAppointment.professional_name}
                  </p>
                </div>

                {/* Schedule Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-900 uppercase tracking-wide mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7h8M8 7H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                        />
                      </svg>
                      Date
                    </h3>
                    <p className="text-sm font-medium text-green-900">
                      {formatDateTime(selectedAppointment.scheduled_date).date}
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-orange-900 uppercase tracking-wide mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Time
                    </h3>
                    <p className="text-sm font-medium text-orange-900">
                      {formatDateTime(selectedAppointment.scheduled_date).time}
                    </p>
                  </div>
                </div>

                {/* Duration & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-indigo-900 uppercase tracking-wide mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Duration
                    </h3>
                    <p className="text-sm font-medium text-indigo-900">
                      {selectedAppointment.duration_minutes} minutes
                    </p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-teal-900 uppercase tracking-wide mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Location
                    </h3>
                    <p className="text-sm font-medium text-teal-900">
                      {selectedAppointment.is_virtual
                        ? "💻 Virtual Meeting"
                        : selectedAppointment.location || "📍 Not specified"}
                    </p>
                  </div>
                </div>

                {/* Notes Section */}
                {selectedAppointment.notes &&
                  selectedAppointment.notes.trim() !== "" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-yellow-900 uppercase tracking-wide mb-2 flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Notes
                      </h3>
                      <div className="bg-white rounded border p-3">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {selectedAppointment.notes}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setViewShowAppointmentModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                >
                  Close
                </button>
                {selectedAppointment.status === "scheduled" && (
                  <>
                    <button className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-150">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showReportModal && selectedAppointment && (
        <ReportModal
          isOpen={showReportModal}
          reportContent={reportContent}
          onClose={() => {
            setShowReportModal(false);
            setReportContent(null);
            setSelectedAppointment(null);
          }}
          onExport={() => {
            
          }}
        />
      )}
    </div>
  );
}
