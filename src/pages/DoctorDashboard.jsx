import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Camera, 
  Plus, 
  Edit3, 
  Save, 
  X, 
  CheckCircle,
  AlertCircle,
  Eye,
  Upload
} from 'lucide-react';
import Header from '../components/DoctorsComponents/Header';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('cases');
  const [selectedCase, setSelectedCase] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    date: '',
    time: '',
    type: 'consultation'
  });
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  // Sample data
  const [cases, setCases] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      age: 45,
      condition: 'Hypertension Follow-up',
      status: 'active',
      assignedDate: '2024-08-20',
      priority: 'medium',
      notes: [
        { id: 1, text: 'Patient shows improvement in BP readings', date: '2024-08-22', time: '10:30 AM' },
        { id: 2, text: 'Recommended lifestyle changes discussed', date: '2024-08-20', time: '2:15 PM' }
      ],
      images: []
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      age: 32,
      condition: 'Migraine Assessment',
      status: 'active',
      assignedDate: '2024-08-21',
      priority: 'high',
      notes: [
        { id: 1, text: 'Frequent headaches reported, duration 4-6 hours', date: '2024-08-21', time: '11:00 AM' }
      ],
      images: []
    },
    {
      id: 3,
      patientName: 'Michael Brown',
      age: 58,
      condition: 'Diabetes Management',
      status: 'closed',
      assignedDate: '2024-08-15',
      priority: 'medium',
      notes: [
        { id: 1, text: 'HbA1c levels within target range', date: '2024-08-18', time: '9:45 AM' },
        { id: 2, text: 'Patient education on insulin management completed', date: '2024-08-19', time: '3:20 PM' }
      ],
      images: []
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Emma Davis',
      date: '2024-08-27',
      time: '09:00',
      type: 'consultation',
      status: 'scheduled'
    },
    {
      id: 2,
      patientName: 'Robert Wilson',
      date: '2024-08-27',
      time: '11:30',
      type: 'follow-up',
      status: 'scheduled'
    },
    {
      id: 3,
      patientName: 'Lisa Chen',
      date: '2024-08-28',
      time: '14:00',
      type: 'consultation',
      status: 'scheduled'
    }
  ]);

  const addNote = (caseId) => {
    if (!newNote.trim()) return;
    
    setCases(cases.map(c => 
      c.id === caseId 
        ? {
            ...c,
            notes: [
              ...c.notes,
              {
                id: Date.now(),
                text: newNote,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })
              }
            ]
          }
        : c
    ));
    setNewNote('');
  };

  const updateCaseStatus = (caseId, newStatus) => {
    setCases(cases.map(c => 
      c.id === caseId ? { ...c, status: newStatus } : c
    ));
  };

  const addAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time) return;
    
    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        ...newAppointment,
        status: 'scheduled'
      }
    ]);
    setNewAppointment({ patientName: '', date: '', time: '', type: 'consultation' });
    setShowAppointmentForm(false);
  };

  const handleImageUpload = (caseId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCases(cases.map(c =>
        c.id === caseId
          ? {
              ...c,
              images: [
                ...c.images,
                {
                  id: Date.now(),
                  name: file.name,
                  url: e.target.result,
                  uploadDate: new Date().toISOString().split('T')[0]
                }
              ]
            }
          : c
      ));
    };
    reader.readAsDataURL(file);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-50';
      case 'closed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
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
                onClick={() => setActiveTab('cases')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'cases'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Cases</span>
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'appointments'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
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
          {activeTab === 'cases' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cases List */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Assigned Cases</h2>
                  <p className="text-gray-600 mt-1">Click on a case to view details</p>
                </div>
                <div className="divide-y">
                  {cases.map((case_) => (
                    <div
                      key={case_.id}
                      onClick={() => setSelectedCase(case_)}
                      className={`p-6 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedCase?.id === case_.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{case_.patientName}</h3>
                          <p className="text-gray-600 mt-1">{case_.condition}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">Age: {case_.age}</span>
                            <span className="text-sm text-gray-500">Assigned: {case_.assignedDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                            {case_.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                            {case_.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Details */}
              <div className="bg-white rounded-xl shadow-sm border">
                {selectedCase ? (
                  <div>
                    <div className="p-6 border-b">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{selectedCase.patientName}</h2>
                          <p className="text-gray-600 mt-1">{selectedCase.condition}</p>
                        </div>
                        <div className="flex space-x-2">
                          {selectedCase.status === 'active' && (
                            <button
                              onClick={() => updateCaseStatus(selectedCase.id, 'closed')}
                              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Mark Closed</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Patient Info */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Age:</span>
                            <span className="ml-2 text-gray-900">{selectedCase.age} years</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCase.status)}`}>
                              {selectedCase.status}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Priority:</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedCase.priority)}`}>
                              {selectedCase.priority}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Assigned:</span>
                            <span className="ml-2 text-gray-900">{selectedCase.assignedDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Notes Section */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Clinical Notes</h3>
                        <div className="space-y-3 mb-4">
                          {selectedCase.notes.map((note) => (
                            <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-900 mb-2">{note.text}</p>
                              <p className="text-xs text-gray-500">{note.date} at {note.time}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add a clinical note..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) => e.key === 'Enter' && addNote(selectedCase.id)}
                          />
                          <button
                            onClick={() => addNote(selectedCase.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Images Section */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Medical Images</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {selectedCase.images.map((image) => (
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
                          ))}
                        </div>
                        <label className="flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                          <Upload className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Upload Medical Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(selectedCase.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Case</h3>
                    <p className="text-gray-600">Choose a case from the list to view details and manage it</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
                      <p className="text-gray-600 mt-1">Manage your scheduled appointments</p>
                    </div>
                    <button
                      onClick={() => setShowAppointmentForm(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Appointment</span>
                    </button>
                  </div>
                </div>

                {showAppointmentForm && (
                  <div className="p-6 border-b bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-4">Schedule New Appointment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input
                        type="text"
                        placeholder="Patient Name"
                        value={newAppointment.patientName}
                        onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={newAppointment.type}
                        onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="consultation">Consultation</option>
                        <option value="follow-up">Follow-up</option>
                        <option value="procedure">Procedure</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={addAppointment}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setShowAppointmentForm(false)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="divide-y">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {appointment.type}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;