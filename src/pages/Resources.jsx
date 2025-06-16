import React, { useState } from 'react';
import { 
  Search,
  Filter,
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  Download,
  BookOpen,
  Heart,
  Shield,
  Scale,
  Users,
  Clock,
  Star,
  ChevronRight,
  FileText,
  Video,
  Headphones,
  Globe,
  Mail,
  Calendar
} from 'lucide-react';

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const categories = [
    { id: 'all', name: 'All Resources', icon: Globe, count: 24 },
    { id: 'emergency', name: 'Emergency Help', icon: Phone, count: 6 },
    { id: 'legal', name: 'Legal Support', icon: Scale, count: 5 },
    { id: 'counseling', name: 'Counseling', icon: Heart, count: 8 },
    { id: 'shelters', name: 'Safe Houses', icon: Shield, count: 4 },
    { id: 'education', name: 'Educational', icon: BookOpen, count: 7 },
    { id: 'support-groups', name: 'Support Groups', icon: Users, count: 3 }
  ];

  const resources = [
    // Emergency Resources
    {
      id: 1,
      title: 'National GBV Hotline',
      description: 'Free 24/7 confidential crisis support and information hotline for survivors of gender-based violence.',
      category: 'emergency',
      type: 'hotline',
      contact: '1195',
      availability: '24/7',
      languages: ['English', 'Swahili', 'Kikuyu'],
      rating: 4.9,
      isVerified: true,
      tags: ['Crisis Support', 'Confidential', 'Free'],
      website: 'https://gbvhotline.ke',
      lastUpdated: '2025-06-10'
    },
    {
      id: 2,
      title: 'Police Gender Desk',
      description: 'Specialized police units trained to handle gender-based violence cases with sensitivity and professionalism.',
      category: 'emergency',
      type: 'service',
      contact: '999 or 112',
      availability: '24/7',
      languages: ['English', 'Swahili'],
      rating: 4.2,
      isVerified: true,
      tags: ['Law Enforcement', 'Immediate Response'],
      locations: ['All Police Stations'],
      lastUpdated: '2025-06-08'
    },
    {
      id: 3,
      title: 'Coalition on Violence Against Women (COVAW)',
      description: 'Provides comprehensive support including legal aid, counseling, and safe house referrals.',
      category: 'emergency',
      type: 'organization',
      contact: '+254 20 2731313',
      availability: 'Mon-Fri 8AM-6PM',
      languages: ['English', 'Swahili'],
      rating: 4.8,
      isVerified: true,
      tags: ['Legal Aid', 'Counseling', 'Safe Houses'],
      website: 'https://covaw.or.ke',
      location: 'Nairobi',
      lastUpdated: '2025-06-12'
    },

    // Legal Resources
    {
      id: 4,
      title: 'Legal Aid Centre',
      description: 'Free legal representation and advice for survivors of gender-based violence.',
      category: 'legal',
      type: 'service',
      contact: '+254 20 2713114',
      availability: 'Mon-Fri 8AM-5PM',
      languages: ['English', 'Swahili'],
      rating: 4.5,
      isVerified: true,
      tags: ['Free Legal Aid', 'Court Representation'],
      website: 'https://legalaid.go.ke',
      location: 'Multiple Locations',
      lastUpdated: '2025-06-11'
    },
    {
      id: 5,
      title: 'Kenya Women Lawyers Association (FIDA)',
      description: 'Legal aid and advocacy organization focusing on women\'s rights and gender justice.',
      category: 'legal',
      type: 'organization',
      contact: '+254 20 3874938',
      availability: 'Mon-Fri 8AM-5PM',
      languages: ['English', 'Swahili'],
      rating: 4.7,
      isVerified: true,
      tags: ['Women\'s Rights', 'Legal Advocacy'],
      website: 'https://fidakenya.org/',
      location: 'Nairobi & Branches',
      lastUpdated: '2025-06-09'
    },

    // Counseling Resources
    {
      id: 6,
      title: 'Amani Counselling Centre',
      description: 'Professional trauma counseling and therapy services for survivors and their families.',
      category: 'counseling',
      type: 'service',
      contact: '+254 722 885000',
      availability: 'Mon-Sat 8AM-6PM',
      languages: ['English', 'Swahili', 'Kikuyu'],
      rating: 4.9,
      isVerified: true,
      tags: ['Trauma Counseling', 'Family Therapy'],
      website: 'https://amanicounselling.org',
      location: 'Nairobi',
      lastUpdated: '2025-06-12'
    },
    {
      id: 7,
      title: 'Befrienders Kenya',
      description: 'Emotional support and suicide prevention helpline with trained volunteers.',
      category: 'counseling',
      type: 'hotline',
      contact: '+254 722 178177',
      availability: '24/7',
      languages: ['English', 'Swahili'],
      rating: 4.4,
      isVerified: true,
      tags: ['Emotional Support', 'Crisis Intervention'],
      website: 'https://befrienderskenya.org',
      lastUpdated: '2025-06-10'
    },

    // Shelter Resources
    {
      id: 8,
      title: 'Grace House Shelter',
      description: 'Safe temporary accommodation for women and children escaping domestic violence.',
      category: 'shelters',
      type: 'shelter',
      contact: '+254 733 123456',
      availability: '24/7 Emergency',
      capacity: '20 women + children',
      languages: ['English', 'Swahili'],
      rating: 4.6,
      isVerified: true,
      tags: ['Emergency Shelter', 'Women & Children'],
      location: 'Confidential Location',
      services: ['Accommodation', 'Meals', 'Counseling'],
      lastUpdated: '2025-06-11'
    },

    // Educational Resources
    {
      id: 9,
      title: 'Understanding Your Rights - Digital Handbook',
      description: 'Comprehensive guide covering legal rights, reporting procedures, and available support services.',
      category: 'education',
      type: 'document',
      format: 'PDF',
      languages: ['English', 'Swahili'],
      rating: 4.8,
      isVerified: true,
      tags: ['Legal Rights', 'Self-Help Guide'],
      downloadUrl: '#',
      size: '2.5 MB',
      lastUpdated: '2025-06-01'
    },
    {
      id: 10,
      title: 'Safety Planning Workshop Videos',
      description: 'Step-by-step video series on creating personal safety plans and risk assessment.',
      category: 'education',
      type: 'video',
      duration: '45 minutes',
      languages: ['English', 'Swahili'],
      rating: 4.7,
      isVerified: true,
      tags: ['Safety Planning', 'Risk Assessment'],
      website: 'https://safetyvideos.ke',
      lastUpdated: '2025-05-28'
    },

    // Support Groups
    {
      id: 11,
      title: 'Survivors Circle - Nairobi',
      description: 'Weekly support group meetings for survivors to share experiences and healing journeys.',
      category: 'support-groups',
      type: 'group',
      schedule: 'Wednesdays 6PM-8PM',
      contact: '+254 700 111222',
      languages: ['English', 'Swahili'],
      rating: 4.9,
      isVerified: true,
      tags: ['Peer Support', 'Healing'],
      location: 'Community Center, Westlands',
      facilitator: 'Licensed Therapist',
      lastUpdated: '2025-06-10'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hotline': return <Phone className="w-5 h-5" />;
      case 'service': return <Users className="w-5 h-5" />;
      case 'organization': return <Shield className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'shelter': return <Shield className="w-5 h-5" />;
      case 'group': return <Users className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'hotline': return 'bg-red-100 text-red-700';
      case 'service': return 'bg-blue-100 text-blue-700';
      case 'organization': return 'bg-purple-100 text-purple-700';
      case 'document': return 'bg-green-100 text-green-700';
      case 'video': return 'bg-orange-100 text-orange-700';
      case 'shelter': return 'bg-pink-100 text-pink-700';
      case 'group': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-300 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Support Resources</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Find verified, confidential support services and educational resources to help you or someone you care about.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {filteredResources.length} resources found
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-5 h-5" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-purple-200 text-purple-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Emergency Notice */}
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Emergency?</h3>
                    <p className="text-sm text-red-700 mb-2">
                      If you're in immediate danger, call:
                    </p>
                    <div className="space-y-1">
                      <div className="font-bold text-red-800">999 or 112</div>
                      <div className="text-sm text-red-700">GBV Hotline: 1195</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="flex-1">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                          {getTypeIcon(resource.type)}
                        </div>
                        {resource.isVerified && (
                          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{resource.tags.length - 2} more</span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      {resource.contact && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{resource.contact}</span>
                        </div>
                      )}
                      {resource.availability && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{resource.availability}</span>
                        </div>
                      )}
                      {resource.location && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{resource.location}</span>
                        </div>
                      )}
                      {resource.languages && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Globe className="w-4 h-4" />
                          <span>{resource.languages.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      {resource.website && (
                        <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                          <ExternalLink className="w-4 h-4" />
                          <span>Visit</span>
                        </button>
                      )}
                      {resource.downloadUrl && (
                        <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                        
                          <Download className="w-4 h-4" />
                          <span><a href='https://library.fes.de/pdf-files/bueros/mosambik/14983.pdf'>Download</a></span>
                        </button>
                      )}
                      {resource.contact && !resource.website && !resource.downloadUrl && (
                        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Contact</span>
                        </button>
                      )}
                    </div>

                    {/* Last Updated */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Updated {resource.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or selecting a different category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}