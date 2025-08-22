import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Calendar,
  FileText,
  Shield,
  Heart,
  Users,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  AlertTriangle,
  Clock,
  User,
  Book,
  Home,
  Scale,
} from 'lucide-react';

const SurvivorsDashboard = ({
  userName = 'User',
  notifications = 0,
  quickActions = [],
  upcomingAppointments = [],
  services = [],
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}</h2>
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
              <p className="text-lg font-semibold">
                {upcomingAppointments[0]?.date || 'None'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Sessions This Month</p>
              <p className="text-lg font-semibold">{upcomingAppointments.length}</p>
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
            <div
              key={appointment.id}
              className={`p-4 ${index !== upcomingAppointments.length - 1 ? 'border-b' : ''}`}
            >
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
                  service.status === 'Available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
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
          <p className="text-sm text-gray-600 mb-4">Strategies to manage stress and anxiety</p>
          <button className="text-pink-600 font-medium text-sm hover:text-pink-700">
            Explore Tips →
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
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
              <Settings className="h-6 w-6 text-gray-600" />
              <LogOut className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex space-x-4">
            {['overview', 'services', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'resources' && renderResources()}
      </div>
    </div>
  );
};

export default SurvivorsDashboard;
