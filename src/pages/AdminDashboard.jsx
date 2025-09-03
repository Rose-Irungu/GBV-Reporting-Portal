/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Shield,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  User,
  TrendingUp,
  Activity,
  Eye,
  UserCheck,
  X,
  Plus,
  AlertCircle,
  Home,
  Trash2,
  Icon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/AdminComponents/Header";
import { assignReport } from "../services/assignment";
import { deleteReport } from "../services/reportService";
import { authService } from "../services/authService";
import useReports from "../hooks/useReportStats";
import getUserFromStorage from "../utils/userData";
import UsersManagement from "../components/AdminComponents/UserManagement";
import AppointmentsManagement from "../components/AdminComponents/AppointmentManagement";
import dayjs from "dayjs";
import ReportModal from "../components/ReportModal";
import toast from "react-hot-toast";

const GBVAdminDashboard = ({
  stats = {},
  platformName = "GBV Reporting Platform",
}) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const storedUser = getUserFromStorage();

  const [selectedReport, setSelectedReport] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [assigneeName, setAssigneeName] = useState("");
  const adminUser = storedUser || {
    name: "Admin User",
    role: "Super Administrator",
  };

  const onCreateUser = () => {
    navigate("/user-form");
  };

  const onCreateAppointment = () => {
    navigate("/appointment-form");
  };

  const fetchUsers = async () => {
    try {
      const res = await authService.allUsers();
      if (res.result_code === 0) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    authService.logoutUser();
  };
  const {
    // dashboardData,
    loading: reportLoading,
    error: reportError,
    totalReports,
    appointments,
    allReports,
    pendingReports,
    // underReviewReports,
    resolvedReports,
    assignedReports,
    urgentCases,
    proffessionals,
    refreshReports,
    setAllReports,
  } = useReports();

  const defaultStats = {
    activeReports: 0,
    pendingAssignments: 0,
    assignedCases: 0,
    closedCases: 0,
    ...stats,
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const onDeleteReport = async (referenceCode) => {
    if (
      window.confirm(
        "Are you sure you want to delete this case? This action cannot be undone."
      )
    ) {
      await deleteReport(referenceCode);
      setAllReports((prevReports) =>
        prevReports.filter((report) => report.reference_code !== referenceCode)
      );
      toast.success(`Case ${referenceCode} has been deleted.`);
    }
  };

  const onAssignReport = (referenceCode) => {
    setSelectedCase(referenceCode);
    const report = allReports.find((r) => r.reference_code === referenceCode);
    setAssigneeName(report?.assigned_to || "");
    setShowAssignModal(true);
  };
  
  const onSearchReports = () => {};

  const handleAssignSubmit = async () => {
    if (assigneeName) {
      try {
        await assignReport(selectedCase, assigneeName);
        setAllReports((prevReports) =>
          prevReports.map((report) =>
            report.reference_code === selectedCase
              ? { ...report, assigned_to: assigneeName, status: "under_review" }
              : report
          )
        );
        setShowAssignModal(false);
        setSelectedCase(null);
        setAssigneeName("");
        toast.success(`Case ${selectedCase} has been assigned to ${assigneeName}`);
      } catch (error) {
        console.error("Error assigning report:", error);
      }
    }
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      badge: reportLoading
        ? "..."
        : totalReports > 0
        ? totalReports.toString()
        : null,
    },
    { id: "users", label: "Users", icon: Users },
    { id: "appointments", label: "Appointments", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
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
        <div
          className={`p-3 rounded-full ${
            color === "text-red-600"
              ? "bg-red-50"
              : color === "text-orange-600"
              ? "bg-orange-50"
              : color === "text-green-600"
              ? "bg-green-50"
              : color === "text-purple-600"
              ? "bg-purple-50"
              : "bg-blue-50"
          }`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const UrgentAlert = ({ report }) => (
    <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <span className="font-semibold text-gray-900">
              {report.reference_code}
            </span>
            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
              {report.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Name: {report.full_name}</p>
          <p className="text-sm text-gray-600 mb-1">Email: {report.email}</p>
          <p className="text-sm text-gray-600 mb-1">Phone: {report.phone}</p>
        </div>
        <button
          onClick={() => handleViewReport(report)}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const ReportsTable = ({ onView }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Reports
          </h3>
          <div className="flex space-x-2"></div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            onChange={(e) => onSearchReports(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allReports && allReports.length > 0 ? (
              allReports.map((report) => (
                <tr key={report.reference_code} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                    {report.reference_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.full_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dayjs(report.incident_date).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.incident_type || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : report.status === "under_review"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.incident_location || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.assigned_to_name || "Unassigned"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onView(report)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onAssignReport(report.reference_code)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteReport(report.reference_code)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete Case"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  {reportLoading
                    ? "Loading reports..."
                    : "No reports available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Assign Case {selectedCase}
              </h3>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a proffesional
              </label>
              <select
                value={assigneeName}
                onChange={(e) => setAssigneeName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an assignee...</option>
                {proffessionals.map((member) => (
                  <option key={member} value={member.id}>
                    {member.first_name} {member.last_name} ( {member.role} )
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAssignSubmit}
                disabled={!assigneeName}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-md  disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Assign Case
              </button>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedCase(null);
                  setAssigneeName("");
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-blue-600" />
          <span className="ml-2 text-xl font-semibold text-gray-900">
            GBV Admin
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {adminUser.email}
              </p>
              <p className="text-xs text-gray-500">{adminUser.user_type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    // Error handling display
    if (reportError) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{reportError}</span>
            <button
              onClick={refreshReports}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Header with refresh button */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <button
                onClick={refreshReports}
                disabled={reportLoading}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transition-all text-white rounded-lg disabled:opacity-50"
              >
                {reportLoading ? "Loading..." : "Refresh Data"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Reports"
                value={reportLoading ? "..." : totalReports}
                icon={FileText}
                color="text-blue-600"
                trend={defaultStats.reportsTrend}
              />
              <StatCard
                title="Pending Cases"
                value={reportLoading ? "..." : pendingReports}
                icon={Clock}
                color="text-orange-600"
              />
              <StatCard
                title="Assigned Cases"
                value={reportLoading ? "..." : assignedReports}
                icon={UserCheck}
                color="text-green-600"
                trend={defaultStats.responseTimeTrend}
              />
              <StatCard
                title="Resolved Cases"
                value={reportLoading ? "..." : resolvedReports}
                icon={FileText}
                color="text-purple-600"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Urgent Alerts */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Urgent Cases
                    </h3>
                    <Bell className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="space-y-3">
                    {reportLoading ? (
                      <div className="text-center text-gray-500 py-4">
                        Loading...
                      </div>
                    ) : urgentCases && urgentCases.length > 0 ? (
                      urgentCases.map((report) => (
                        <UrgentAlert
                          key={report.reference_code}
                          report={report}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No urgent alerts</p>
                      </div>
                    )}
                  </div>
                  {urgentCases && urgentCases.length > 0 && (
                    <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View All Alerts ({urgentCases.length})
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-md font-medium text-gray-900 mb-3">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {reportLoading ? (
                      <div className="text-center text-gray-500 py-4">
                        Loading activity...
                      </div>
                    ) : urgentCases && urgentCases.length > 0 ? (
                      urgentCases.slice(0, 3).map((report, index) => (
                        <div
                          key={report.reference_code}
                          className="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-3 ${
                              index === 0
                                ? "bg-blue-500"
                                : index === 1
                                ? "bg-green-500"
                                : "bg-orange-500"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              Report {report.reference_code} -{" "}
                              {report.full_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {report.email}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <Activity className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No recent activity</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "reports":
        return <ReportsTable onView={handleViewReport} />;

      case "users":
        return <UsersManagement Users={users} fetchUsers={fetchUsers} />;

      case "appointments":
        return (
          <AppointmentsManagement
            onCreateAppointment={onCreateAppointment}
            appointments_={appointments}
            allReports={allReports}
            proffessionals={proffessionals}
          />
        );

      case "settings":
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              System Settings
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  General Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Platform Name</span>
                    <input
                      type="text"
                      value={platformName}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                      readOnly
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-900"
                    >
                      LOGOUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          activeSection={activeSection}
          sidebarItems={sidebarItems}
          urgentReports={urgentCases || []}
          adminUser={adminUser}
          onSidebarToggle={() => setSidebarOpen(true)}
        />

        <ReportModal
          isOpen={showReportModal}
          reportContent={selectedReport}
          onClose={() => {
            setSelectedReport(null);
            setShowReportModal(false);
          }}
          onExport={() => {}}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default GBVAdminDashboard;
