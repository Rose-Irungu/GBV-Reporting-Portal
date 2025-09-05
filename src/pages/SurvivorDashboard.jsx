/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  BookOpen,
  Heart,
  Phone,
  FileText,
  User,
  Settings,
  Home,
  Bell,
  X,
  Eye,
  UserCheck,
  
} from "lucide-react";
import useReports from "../hooks/useReportStats";
import dayjs from "dayjs";
import AppointmentModal from "../components/modals/AppointmentModal.jsx";
import Header from "../components/AdminComponents/Header";
import AppointmentsManagement from "../components/AdminComponents/AppointmentManagement.jsx";
import ReportModal from "../components/ReportModal";
import { getAssignments } from "../services/assignment";

const SurvivorsDashboard = ({ userName }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showEducationModal, setShowEducationModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportContent, setReportContent] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const handleEmergencyExit = () => {
    window.location.replace("https://poki.com/en/g/subway-surfers");
  };

  const {
    dashboardData,
    appointments,
    setAppointments,
    allReports,
    proffessionals,
    loading: reportLoading,
  } = useReports();

  const caseProgress = {};

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      }
    };
    fetchAssignments();
  }, []);

  const handleOpenModal = () => {
    setEditingAppointment(null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

   const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
    setSelectedAppointment(report);
  };

  // Function to get recent activity from scheduled appointments
  const getRecentActivity = () => {
    if (!appointments || appointments.length === 0) {
      return [
        {
          id: 1,
          type: "info",
          message: "No recent appointments scheduled",
          date: dayjs(),
          color: "gray",
        }
      ];
    }

    // Get upcoming appointments (scheduled status) and sort by date
    const upcomingAppointments = appointments
      .filter(apt => apt.status === "scheduled")
      .sort((a, b) => dayjs(a.scheduled_date).diff(dayjs(b.scheduled_date)))
      .slice(0, 5); // Get the next 5 appointments

    // Get recently completed appointments
    const recentCompleted = appointments
      .filter(apt => apt.status === "completed")
      .sort((a, b) => dayjs(b.scheduled_date).diff(dayjs(a.scheduled_date)))
      .slice(0, 3); // Get the last 3 completed appointments

    const activities = [];

    // Add completed appointments
    recentCompleted.forEach(apt => {
      activities.push({
        id: `completed-${apt.id}`,
        type: "completed",
        message: `${apt.appointment_type} completed with ${apt.professional_name}`,
        date: dayjs(apt.scheduled_date),
        color: "green",
      });
    });

    // Add upcoming appointments
    upcomingAppointments.forEach(apt => {
      const appointmentDate = dayjs(apt.scheduled_date);
      const isToday = appointmentDate.isSame(dayjs(), 'day');
      const isTomorrow = appointmentDate.isSame(dayjs().add(1, 'day'), 'day');
      const isThisWeek = appointmentDate.diff(dayjs(), 'day') <= 7;
      
      let dateText;
      if (isToday) {
        dateText = "today";
      } else if (isTomorrow) {
        dateText = "tomorrow";
      } else if (isThisWeek) {
        dateText = `on ${appointmentDate.format('dddd')}`;
      } else {
        dateText = `on ${appointmentDate.format('MMM D')}`;
      }

      activities.push({
        id: `upcoming-${apt.id}`,
        type: "upcoming",
        message: `${apt.appointment_type} scheduled ${dateText} with ${apt.professional_name}`,
        date: appointmentDate,
        color: isToday ? "yellow" : "blue",
      });
    });

    // Sort all activities by date (most recent/upcoming first)
    return activities
      .sort((a, b) => {
        if (a.type === "completed" && b.type === "upcoming") return 1;
        if (a.type === "upcoming" && b.type === "completed") return -1;
        if (a.type === "upcoming" && b.type === "upcoming") {
          return a.date.diff(b.date);
        }
        return b.date.diff(a.date);
      })
      .slice(0, 5); // Show max 5 activities
  };

  const educationalContent = [
    {
      id: 1,
      title: "Immediate Steps After Sexual Assault",
      category: "Emergency Response",
      content: `
        <h3>What to Do Immediately After Sexual Assault</h3>
        <ul>
          <li><strong>Ensure Your Safety:</strong> Get to a safe place away from the perpetrator</li>
          <li><strong>Seek Medical Care:</strong> Go to the nearest hospital or call emergency services</li>
          <li><strong>Preserve Evidence:</strong> Don't shower, change clothes, or clean up if possible</li>
          <li><strong>Call for Support:</strong> Contact the National Sexual Assault Hotline: 1-800-656-4673</li>
          <li><strong>Consider Reporting:</strong> You can report to police when you're ready</li>
          <li><strong>Document Everything:</strong> Write down what happened while it's fresh in memory</li>
        </ul>
        <p><em>Remember: None of this was your fault. You are not alone.</em></p>
      `,
    },
    {
      id: 2,
      title: "Breathing Exercises for Anxiety",
      category: "Mental Health",
      content: `
        <h3>Simple Breathing Techniques</h3>
        <div style="margin: 20px 0;">
          <h4>4-7-8 Breathing:</h4>
          <ol>
            <li>Exhale completely through your mouth</li>
            <li>Inhale through your nose for 4 counts</li>
            <li>Hold your breath for 7 counts</li>
            <li>Exhale through your mouth for 8 counts</li>
            <li>Repeat 3-4 times</li>
          </ol>
        </div>
        <div style="margin: 20px 0;">
          <h4>Box Breathing:</h4>
          <ol>
            <li>Inhale for 4 counts</li>
            <li>Hold for 4 counts</li>
            <li>Exhale for 4 counts</li>
            <li>Hold empty for 4 counts</li>
            <li>Repeat 5-10 times</li>
          </ol>
        </div>
        <p><strong>Practice daily for best results. Use during panic attacks or high stress moments.</strong></p>
      `,
    },
    {
      id: 3,
      title: "Grounding Techniques",
      category: "Mental Health",
      content: `
        <h3>5-4-3-2-1 Grounding Technique</h3>
        <p>Use this when feeling overwhelmed or dissociated:</p>
        <ul>
          <li><strong>5 things you can SEE</strong> - Look around and name them</li>
          <li><strong>4 things you can TOUCH</strong> - Feel textures around you</li>
          <li><strong>3 things you can HEAR</strong> - Listen to sounds in your environment</li>
          <li><strong>2 things you can SMELL</strong> - Notice scents around you</li>
          <li><strong>1 thing you can TASTE</strong> - What taste is in your mouth?</li>
        </ul>
        <h4>Other Grounding Techniques:</h4>
        <ul>
          <li>Hold an ice cube in your hands</li>
          <li>Count backwards from 100 by 7s</li>
          <li>Name all the animals you can think of</li>
          <li>Describe your surroundings in detail</li>
        </ul>
      `,
    },
    {
      id: 4,
      title: "Building a Support Network",
      category: "Recovery",
      content: `
        <h3>Creating Your Support System</h3>
        <h4>Types of Support:</h4>
        <ul>
          <li><strong>Professional Support:</strong> Therapists, counselors, medical professionals</li>
          <li><strong>Peer Support:</strong> Support groups, other survivors</li>
          <li><strong>Personal Support:</strong> Trusted family and friends</li>
          <li><strong>Community Support:</strong> Religious/spiritual communities, advocacy groups</li>
        </ul>
        <h4>Tips for Building Support:</h4>
        <ul>
          <li>Start small - identify 1-2 trusted people</li>
          <li>Be clear about what kind of support you need</li>
          <li>Set boundaries about what you're comfortable sharing</li>
          <li>Join survivor support groups when ready</li>
          <li>Consider online communities for additional support</li>
        </ul>
        <p><strong>Remember:</strong> You deserve support and care. It's okay to ask for help.</p>
      `,
    },
  ];

  const handleCreateAppointment = (appointmentData) => {
    const newAppointment = {
      id: appointments.length + 1,
      ...appointmentData,
      status: "scheduled",
    };
    setAppointments([...appointments, newAppointment]);
    setShowAppointmentModal(false);
  };

  const handleEditAppointment = (appointmentData) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === editingAppointment.id ? { ...apt, ...appointmentData } : apt
      )
    );
    setEditingAppointment(null);
    setShowAppointmentModal(false);
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  const EducationModal = ({ content }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-200bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{content.title}</h3>
          <button
            onClick={() => setShowEducationModal(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-gray-600">
            <strong>Crisis Support:</strong> If you're in immediate danger, call
            911. For 24/7 support: National Sexual Assault Hotline
            1-800-656-4673
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={handleEmergencyExit}
        className="fixed bottom-4 right-4 z-50 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg flex items-center gap-2"
      >
        <X className="w-5 h-5" />
        Quick Exit
      </button>
      {/* Header */}
      <Header
      // activeSection={activeSection}
      // sidebarItems={sidebarItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "appointments", label: "Appointments", icon: Calendar },
              { id: "reports", label: "Case Progress", icon: CheckCircle },
              { id: "education", label: "Resources", icon: BookOpen },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-2xl text-white p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {userName}
              </h2>
              <p className="text-purple-100">
                You're taking brave steps towards healing and safety. We're here
                to support you every step of the way.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Welcome Back
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 hover:bg-blue-300 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-900">
                        My Reports
                      </p>
                      <p className="text-2xl font-semibold text-blue-600">
                        {dashboardData?.my_reports?.total}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 hover:bg-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-900">
                        Upcoming Appointments
                      </p>
                      <p className="text-2xl font-semibold text-green-600">
                        {
                          dashboardData?.appoinntments.filter(
                            (apt) => apt.status === "scheduled"
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 hover:bg-purple-300 rounded-lg p-4">
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-purple-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-purple-900">
                        Resources Available
                      </p>
                      <p className="text-2xl font-semibold text-purple-600">
                        {educationalContent.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-200 rounded-lg shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              {reportLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span className="ml-2 text-sm text-gray-600">Loading activity...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {getRecentActivity().map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.color === 'green' ? 'bg-green-500' :
                        activity.color === 'blue' ? 'bg-blue-500' :
                        activity.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}></div>
                      <span className="text-sm text-gray-600 flex-1">
                        {activity.message}
                      </span>
                      {activity.type === "upcoming" && (
                        <span className="text-xs text-gray-500">
                          {activity.date.format('MMM D, h:mm A')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <AppointmentsManagement 
            appointments_={appointments}
            allReports={allReports}
            proffessionals={proffessionals}
          /> 
          
        )}

        {activeTab === "reports" && (
          <div className="overflow-x-auto">
             <h3 className="text-lg font-semibold text-gray-900">
            My Reports
          </h3>
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
                         onClick={() => handleViewReport(reportContent)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
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
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Educational Resources & Support
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {educationalContent.map((content) => (
                  <div
                    key={content.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        {content.title}
                      </h3>
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {content.category}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowEducationModal(content)}
                      className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                    >
                      Read More →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Crisis Resources */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-red-900 mb-4">
                Crisis Support Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">Emergency</p>
                    <p className="text-sm text-red-700">911</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">
                      National Sexual Assault Hotline
                    </p>
                    <p className="text-sm text-red-700">
                      1-800-656-4673 (24/7)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">Crisis Text Line</p>
                    <p className="text-sm text-red-700">Text HOME to 741741</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">
                      Suicide Prevention Lifeline
                    </p>
                    <p className="text-sm text-red-700">988 (24/7)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAppointmentModal && <AppointmentModal />}
      {showEducationModal && <EducationModal content={showEducationModal} />}
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
};

export default SurvivorsDashboard;