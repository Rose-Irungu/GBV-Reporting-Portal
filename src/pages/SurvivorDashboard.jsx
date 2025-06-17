import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  FileText, 
  Shield, 
  Heart, 
  Users, 
  MapPin, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronRight, 
  AlertTriangle,
  Clock,
  User,
  Book,
  Home,
  Scale
} from 'lucide-react';

const SurvivorsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(4);

  // Mock data for demonstration
  const upcomingAppointments = [
    { id: 1, type: 'Counseling Session', date: '2024-06-18', time: '10:00 AM', counselor: 'Dr. Sarah Johnson' },
    { id: 2, type: 'Legal Consultation', date: '2024-06-20', time: '2:00 PM', counselor: 'Adv. Michael Brown' },
    { id: 3, type: 'Support Group', date: '2024-06-22', time: '6:00 PM', counselor: 'Group Session' }
  ];

  const recentActivities = [
    { id: 1, action: 'Safety plan updated', date: '2024-06-15', time: '3:30 PM' },
    { id: 2, action: 'Counseling session completed', date: '2024-06-14', time: '10:00 AM' },
    { id: 3, action: 'Resource document downloaded', date: '2024-06-13', time: '2:15 PM' }
  ];

  const quickActions = [
    { 
      id: 1, 
      title: 'Emergency Help', 
      description: 'Get immediate assistance', 
      icon: Phone, 
      color: 'bg-red-500', 
      urgent: true 
    },
    { 
      id: 2, 
      title: 'Chat with Counselor', 
      description: 'Start a secure conversation', 
      icon: MessageCircle, 
      color: 'bg-blue-500' 
    },
    { 
      id: 3, 
      title: 'Book Appointment', 
      description: 'Schedule your next session', 
      icon: Calendar, 
      color: 'bg-green-500' 
    },
    { 
      id: 4, 
      title: 'Safety Resources', 
      description: 'Access safety planning tools', 
      icon: Shield, 
      color: 'bg-purple-500' 
    }
  ];

  const services = [
    { 
      id: 1, 
      title: 'Counseling Services', 
      description: 'Professional support and therapy', 
      icon: Heart, 
      status: 'Available',
      nextSession: 'June 18, 10:00 AM'
    },
    { 
      id: 2, 
      title: 'Legal Aid', 
      description: 'Free legal consultation and support', 
      icon: Scale, 
      status: 'Available',
      nextSession: 'June 20, 2:00 PM'
    },
    { 
      id: 3, 
      title: 'Support Groups', 
      description: 'Connect with others who understand', 
      icon: Users, 
      status: 'Available',
      nextSession: 'June 22, 6:00 PM'
    },
    { 
      id: 4, 
      title: 'Safe Housing', 
      description: 'Temporary accommodation assistance', 
      icon: Home, 
      status: 'Contact Required',
      nextSession: 'Call for availability'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah</h2>
        <p className="text-purple-100">You're taking brave steps towards healing and safety. We're here to support you every step of the way.</p>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">Need immediate help?</h3>
            <p className="text-sm text-red-700">Emergency services are available 24/7</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            Call Now
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Next Appointment</p>
              <p className="text-lg font-semibold">June 18</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Sessions This Month</p>
              <p className="text-lg font-semibold">4</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Safety Plan</p>
              <p className="text-lg font-semibold">Updated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                className={`${action.urgent ? 'ring-2 ring-red-500' : ''} bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left`}
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
        <div className="bg-white rounded-lg shadow-sm border">
          {upcomingAppointments.map((appointment, index) => (
            <div key={appointment.id} className={`p-4 ${index !== upcomingAppointments.length - 1 ? 'border-b' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{appointment.type}</h4>
                    <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                    <p className="text-sm text-gray-500">with {appointment.counselor}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Available Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <IconComponent className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  service.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {service.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {service.nextSession}
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  Access Service
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resources & Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <Book className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Safety Planning Guide</h3>
          <p className="text-sm text-gray-600 mb-4">Create and update your personal safety plan</p>
          <button className="text-blue-600 font-medium text-sm hover:text-blue-700">
            View Guide →
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <FileText className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Legal Resources</h3>
          <p className="text-sm text-gray-600 mb-4">Know your rights and legal options</p>
          <button className="text-green-600 font-medium text-sm hover:text-green-700">
            Learn More →
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <Heart className="h-8 w-8 text-pink-600 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Self-Care Tips</h3>
          <p className="text-sm text-gray-600 mb-4">Tools and techniques for emotional wellness</p>
          <button className="text-pink-600 font-medium text-sm hover:text-pink-700">
            Explore →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">SafeSpace Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Sarah M.</span>
              </div>
              
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Home },
              { id: 'services', label: 'Services', icon: Heart },
              { id: 'resources', label: 'Resources', icon: Book }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <main>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'services' && renderServices()}
          {activeTab === 'resources' && renderResources()}
        </main>
      </div>
    </div>
  );
};

export default SurvivorsDashboard;