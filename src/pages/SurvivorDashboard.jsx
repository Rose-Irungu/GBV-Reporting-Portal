/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
} from "lucide-react";
import useReports from "../hooks/useReportStats";
import dayjs from "dayjs";
import AppointmentModal from "../components/modals/AppointmentModal.jsx";
import Header from "../components/AdminComponents/Header";
import AppointmentsManagement from "../components/AdminComponents/AppointmentManagement.jsx";

const SurvivorsDashboard = ({ userName }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showEducationModal, setShowEducationModal] = useState(null);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Medical examination completed on Aug 20
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Counseling session scheduled for Aug 25
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Legal consultation upcoming on Aug 28
                  </span>
                </div>
              </div>
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
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                My Reports
              </h2>
              {allReports && allReports.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Report ID
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Type
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Date Submitted
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Assigned to
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allReports.map((report, index) => (
                        <tr key={report.reference_code} className="border-t">
                          <td className="px-4 py-2 text-sm text-gray-700">
                            {report.reference_code}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700">
                            {report.incident_type || "N/A"}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                report.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600">
                            {dayjs(report.incident_date).format("YYYY-MM-DD")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No reports submitted yet.
                </p>
              )}
            </div>
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
    </div>
  );
};

export default SurvivorsDashboard;
