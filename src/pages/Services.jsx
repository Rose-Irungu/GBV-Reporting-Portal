import React from 'react';
import { Phone, MessageCircle, Scale, Home, Users, Shield, Heart, Clock } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Emergency Support",
      description: "24/7 crisis intervention and immediate safety assistance for survivors in urgent situations.",
      icon: Phone,
      color: "bg-red-500",
      features: ["24/7 Hotline", "Crisis Intervention", "Safety Planning", "Emergency Response"],
      available: "Available 24/7"
    },
    {
      id: 2,
      title: "Counseling Services",
      description: "Professional psychological support and therapy services for trauma recovery and healing.",
      icon: Heart,
      color: "bg-blue-500",
      features: ["Individual Therapy", "Group Counseling", "Trauma Recovery", "Family Support"],
      available: "Mon-Fri 8AM-6PM"
    },
    {
      id: 3,
      title: "Legal Aid",
      description: "Free legal consultation and representation for survivors seeking justice and protection.",
      icon: Scale,
      color: "bg-green-500",
      features: ["Legal Consultation", "Court Representation", "Protection Orders", "Rights Education"],
      available: "Mon-Fri 9AM-5PM"
    },
    {
      id: 4,
      title: "Safe Shelters",
      description: "Temporary housing and accommodation for survivors needing a safe place to stay.",
      icon: Home,
      color: "bg-purple-500",
      features: ["Temporary Housing", "Safe Environment", "Basic Necessities", "Security Support"],
      available: "24/7 Admission"
    },
    {
      id: 5,
      title: "Support Groups",
      description: "Peer support and community healing through guided group sessions and activities.",
      icon: Users,
      color: "bg-indigo-500",
      features: ["Peer Support", "Group Therapy", "Workshops", "Community Building"],
      available: "Weekly Sessions"
    },
    {
      id: 6,
      title: "Safety Resources",
      description: "Safety planning, risk assessment, and protective resources for ongoing security.",
      icon: Shield,
      color: "bg-orange-500",
      features: ["Safety Planning", "Risk Assessment", "Security Resources", "Protection Strategies"],
      available: "On Appointment"
    }
  ];

  const emergencyContacts = [
    { service: "Emergency Hotline", number: "911", description: "Immediate emergency response" },
    { service: "GBV Helpline", number: "1-195-GBV-HELP", description: "24/7 support and counseling" },
    { service: "Legal Aid Hotline", number: "1-800-LEGAL-AID", description: "Free legal consultation" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support services designed to empower survivors and provide safety, 
            healing, and justice for those affected by gender-based violence.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-600 text-white rounded-lg p-6 mb-12 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Phone className="h-8 w-8 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">Emergency? Need Immediate Help?</h3>
                <p className="text-red-100">Call our 24/7 crisis hotline now</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition-colors">
                Call 911
              </button>
              <button className="bg-red-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-800 transition-colors">
                GBV Helpline
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className={`${service.color} p-3 rounded-lg mr-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">What we offer:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.available}
                  </div>
                  <button className={`${service.color} text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{contact.service}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{contact.number}</p>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need to Talk to Someone?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              All our services are confidential and free of charge. Our trained professionals 
              are here to support you through your journey to safety and healing.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start a Chat
              </button>
              <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;