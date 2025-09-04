import { useState } from "react";
import {
  Calendar,
  FileText,
  Plus,
  CheckCircle,
  Eye,
  Upload,
} from "lucide-react";
import Header from "../components/AdminComponents/Header";
import useReports from "../hooks/useReportStats";
import ReportModal from "../components/ReportModal";
import AppointmentsManagement from "../components/AdminComponents/AppointmentManagement";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("cases");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [newNote, setNewNote] = useState("");

  const { allReports, appointments, proffessionals} = useReports();

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const addNote = (reportId) => {
    if (!newNote.trim()) return;

    setNewNote("");
  };

  const updateReportStatus = (reportId, newStatus) => {
    // In a real app, you'd make an API call to update the status
    // For now, we'll just log it
    console.log(`Updating report ${reportId} status to ${newStatus}`);
    // You might want to trigger a refetch of reports here
  };


  const handleImageUpload = (reportId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // In a real app, you'd upload the image to your server
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(`Uploading image for report ${reportId}:`, file.name);
      // Handle image upload logic here
    };
    reader.readAsDataURL(file);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };


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
                <FileText className="w-5 h-5" />
                <span className="font-medium">Cases</span>
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
                <span className="font-medium">Appointments</span>
              </button>
            </div>
          </div>
        </nav>

      

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "cases" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reports List */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Assigned Cases
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Click on a case to view details
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
                            <h3 className="font-semibold text-gray-900">
                              {report.full_name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {report.reference_code}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-500">
                                Date Reported: {report.date_reported || "N/A"}
                              </span>
                              <span className="text-sm text-gray-500">
                                Incident Type: {report.incident_type || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                report.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {report.status || "pending"}
                            </span>
                            {report.priority && (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                  report.priority
                                )}`}
                              >
                                {report.priority}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No reports assigned to you
                    </div>
                  )}
                </div>
              </div>

              {/* Report Details */}
              <div className="bg-white rounded-xl shadow-sm border">
                {selectedReport ? (
                  <div>
                    <div className="p-6 border-b">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">
                            {selectedReport.full_name}
                          </h2>
                          <p className="text-gray-600 mt-1">
                            {selectedReport.reference_code}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {/* {selectedReport.status != "closed" && (
                            <button
                              onClick={() =>
                                updateReportStatus(selectedReport.id, "closed")
                              }
                              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Mark Closed</span>
                            </button>
                          )} */}
                          <button
                            onClick={() => handleViewReport(selectedReport)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Full Report</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Survivor Info */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Survivor Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Case ID:</span>
                            <span className="ml-2 text-gray-900">
                              {selectedReport.reference_code}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                selectedReport.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {selectedReport.status || "pending"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">
                              Date Reported:
                            </span>
                            <span className="ml-2 text-gray-900">
                              {selectedReport.date_reported || "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">
                              Incident Type:
                            </span>
                            <span className="ml-2 text-gray-900">
                              {selectedReport.incident_type || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Clinical Notes Section */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Clinical Notes
                        </h3>
                        <div className="space-y-3 mb-4">
                          {selectedReport.notes &&
                          selectedReport.notes.length > 0 ? (
                            selectedReport.notes.map((note) => (
                              <div
                                key={note.id}
                                className="bg-gray-50 rounded-lg p-4"
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
                              No clinical notes added yet
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add a clinical note..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) =>
                              e.key === "Enter" && addNote(selectedReport.id)
                            }
                          />
                          <button
                            onClick={() => addNote(selectedReport.id)}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg  text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Images Section */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Medical Images
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {selectedReport.images &&
                          selectedReport.images.length > 0 ? (
                            selectedReport.images.map((image) => (
                              <div key={image.id} className="relative">
                                <img
                                  src={image.url}
                                  alt={image.name}
                                  className="w-full h-32 object-cover rounded-lg border"
                                />
                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                  {image.name}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="col-span-2 text-gray-500 text-sm">
                              No images uploaded yet
                            </p>
                          )}
                        </div>
                        <label className="flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                          <Upload className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">
                            Upload Medical Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(selectedReport.id, e)
                            }
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a Case
                    </h3>
                    <p className="text-gray-600">
                      Choose a case from the list to view details and manage it
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <AppointmentsManagement
              appointments_={appointments} 
              allReports={allReports} 
              proffessionals={proffessionals}
            />
          )}
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
        onExport={() => {}}
      />
    </div>
  );
};

export default DoctorDashboard;
