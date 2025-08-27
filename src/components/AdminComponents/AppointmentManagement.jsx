import { use, useEffect, useState } from "react";
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

import useAppointments from "../../hooks/useAppointment";

export default function AppointmentsManagement() {
  const { appointments, loading, error } = useAppointments();
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
      const getAppointment = async (id) => {
    try {
      setLoading(true);
      const data = await getAppointment(id);
      setAppointment(data);
      return data;
    } catch (err) {
      console.error("Error fetching appointment:", err);
      setError("Something went wrong while fetching appointment.");
      return null;
    } finally {
      setLoading(false);
    }
  };
     getAppointment();
  }, []);

  // const { getAppointments } = useReports();

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

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.professional_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.report_reference
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

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
            onClick={() => window.open("/appointment-form", "_blank")}
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
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </button>
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
                Client
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
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-xs">
                        {/* {appointment.client_name.split(' ').map(n => n[0]).join('')} */}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.client_name}
                        </div>
                      </div>
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
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        title="Edit Appointment"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="View Report"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Cancel Appointment"
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
                onClick={() => window.open("/appointment-form", "_blank")}
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
    </div>
  );
}
