import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Heart, Users, Phone, MessageCircle, MapPin, ArrowRight, Menu, X, Star, CheckCircle } from 'lucide-react';






export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
     

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-pulse">
              <Heart className="h-4 w-4 mr-2" />
              24/7 Support Available
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Safe Space for
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                Survivors
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with professional support, access resources, and find your path to healing in a secure, confidential environment designed with your safety in mind.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
                <Link to="/report">Get Immediate Help</Link>
                
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Call Helpline
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm">SSL Encrypted</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm">Confidential</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-sm">Trusted by 10k+ users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Support Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a range of services designed to support survivors at every stage of their journey toward healing and empowerment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Crisis Chat</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Anonymous, secure messaging with trained counselors available 24/7. Get immediate support when you need it most.
              </p>
              <button className="text-purple-600 font-semibold hover:text-purple-800 flex items-center group">
                Start Chat
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Support Groups</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connect with other survivors in moderated support groups. Share experiences and find strength in community.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-800 flex items-center group">
                Join Groups
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Resources</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Find shelters, legal aid, healthcare providers, and other essential services in your area with our resource locator.
              </p>
              <button className="text-green-600 font-semibold hover:text-green-800 flex items-center group">
                  <Link to="/resources">Find Resources</Link>                
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Your Safety is Our Priority
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
                    <p className="text-gray-600">All communications are encrypted and secure. Your conversations remain completely private.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Anonymous Support</h3>
                    <p className="text-gray-600">Access help without revealing your identity. No registration required for crisis support.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Trained Professionals</h3>
                    <p className="text-gray-600">Our team consists of licensed counselors and advocates specialized in trauma-informed care.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Online - Crisis Counselor</span>
                  </div>
                  <p className="text-white/90">Hi, I'm here to help. This is a safe space where you can share anything you're comfortable with. How are you feeling today?</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Type your message..."
                      className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white/50"
                      disabled
                    />
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            You Don't Have to Face This Alone
          </h2>
          <p className="text-xl text-purple-100 mb-12">
            Take the first step toward healing. Our compassionate team is ready to support you with complete confidentiality and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              <Link to="/report">Get Support Now</Link>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all">
             <Link to="/resources">Learn More</Link> 
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}