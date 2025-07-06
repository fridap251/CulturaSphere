import React, { useState } from 'react';
import { Users, Search, Filter, Star, MapPin, Calendar, MessageCircle, Heart, Share2, Plus } from 'lucide-react';
import { apiService } from '../services/apiService';

const CollaborationHub = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [aiRecommendations, setAiRecommendations] = useState<any>(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'creators', name: 'Content Creators' },
    { id: 'artists', name: 'Artists' },
    { id: 'brands', name: 'Brands' },
    { id: 'agencies', name: 'Agencies' },
    { id: 'researchers', name: 'Researchers' }
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'north-america', name: 'North America' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia-pacific', name: 'Asia Pacific' },
    { id: 'latin-america', name: 'Latin America' },
    { id: 'global', name: 'Global' }
  ];

  const collaborators = [
    {
      id: 1,
      name: 'Maya Rodriguez',
      type: 'Content Creator',
      specialties: ['Fashion', 'Sustainability', 'Lifestyle'],
      location: 'Barcelona, Spain',
      followers: '245K',
      engagementRate: '4.2%',
      culturalReach: ['Europe', 'Latin America'],
      recentWork: 'Sustainable Fashion Campaign with EcoThreads',
      matchScore: 95,
      avatar: '🌿',
      verified: true
    },
    {
      id: 2,
      name: 'Kai Chen',
      type: 'Digital Artist',
      specialties: ['K-Pop', 'Digital Art', 'Gaming'],
      location: 'Seoul, South Korea',
      followers: '89K',
      engagementRate: '6.8%',
      culturalReach: ['Asia Pacific', 'Global'],
      recentWork: 'Virtual Concert Design for HYBE Entertainment',
      matchScore: 87,
      avatar: '🎨',
      verified: true
    },
    {
      id: 3,
      name: 'Alex Thompson',
      type: 'Brand Strategist',
      specialties: ['Cultural Insights', 'Brand Positioning', 'Gen Z'],
      location: 'London, UK',
      followers: '45K',
      engagementRate: '3.9%',
      culturalReach: ['Europe', 'North America'],
      recentWork: 'Cultural Localization Strategy for Nike Europe',
      matchScore: 82,
      avatar: '🧠',
      verified: false
    },
    {
      id: 4,
      name: 'Zara Okafor',
      type: 'Music Producer',
      specialties: ['Afrobeats', 'Music Production', 'Cultural Fusion'],
      location: 'Lagos, Nigeria',
      followers: '127K',
      engagementRate: '5.4%',
      culturalReach: ['Africa', 'Global'],
      recentWork: 'Cross-cultural album with Latin Grammy nominees',
      matchScore: 91,
      avatar: '🎵',
      verified: true
    },
    {
      id: 5,
      name: 'Jamie Silva',
      type: 'Researcher',
      specialties: ['Cultural Anthropology', 'Consumer Behavior', 'Trends'],
      location: 'São Paulo, Brazil',
      followers: '23K',
      engagementRate: '7.1%',
      culturalReach: ['Latin America', 'Global'],
      recentWork: 'Cultural Impact Study on Latin Music Globalization',
      matchScore: 79,
      avatar: '📊',
      verified: false
    }
  ];

  const myCollaborations = [
    {
      id: 1,
      project: 'Global Sustainability Campaign',
      collaborators: ['Maya Rodriguez', 'Alex Thompson'],
      status: 'Active',
      startDate: '2025-01-05',
      description: 'Cross-cultural campaign promoting sustainable fashion practices'
    },
    {
      id: 2,
      project: 'K-Pop Cultural Bridge',
      collaborators: ['Kai Chen'],
      status: 'Planning',
      startDate: '2025-01-15',
      description: 'Digital art series exploring K-Pop global influence'
    },
    {
      id: 3,
      project: 'Afrobeats Fusion Study',
      collaborators: ['Zara Okafor', 'Jamie Silva'],
      status: 'Completed',
      startDate: '2024-12-01',
      description: 'Research collaboration on African music cultural export'
    }
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Netflix Original Series Cultural Consultant',
      type: 'Consulting',
      budget: '$15,000 - $25,000',
      duration: '3 months',
      skills: ['Cultural Analysis', 'Content Strategy', 'Localization'],
      regions: ['Asia Pacific', 'Latin America'],
      deadline: '2025-01-20',
      applicants: 12
    },
    {
      id: 2,
      title: 'Sustainable Fashion Brand Partnership',
      type: 'Brand Collaboration',
      budget: '$8,000 - $12,000',
      duration: '2 months',
      skills: ['Content Creation', 'Sustainability', 'Fashion'],
      regions: ['Europe', 'North America'],
      deadline: '2025-01-25',
      applicants: 8
    },
    {
      id: 3,
      title: 'Cultural Music Documentary',
      type: 'Creative Project',
      budget: '$20,000 - $30,000',
      duration: '6 months',
      skills: ['Music Production', 'Documentary', 'Cultural Research'],
      regions: ['Africa', 'Global'],
      deadline: '2025-02-01',
      applicants: 15
    }
  ];

  const getAIRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const userProfile = {
        interests: ['Cultural Analytics', 'Brand Strategy', 'Content Creation'],
        region: selectedRegion,
        category: selectedCategory
      };
      
      const recommendations = await apiService.getCollaborationRecommendations(userProfile, collaborators);
      setAiRecommendations(recommendations);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const filteredCollaborators = collaborators.filter(collaborator => {
    const categoryMatch = selectedCategory === 'all' || collaborator.type.toLowerCase().includes(selectedCategory);
    const regionMatch = selectedRegion === 'all' || collaborator.culturalReach.some(region => 
      region.toLowerCase().includes(selectedRegion.replace('-', ' ')));
    return categoryMatch && regionMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Planning': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Collaboration Hub</h2>
          <p className="text-gray-600 mt-1">Connect with creators, brands, and cultural experts worldwide</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
            <Plus className="w-4 h-4" />
            <span>Post Project</span>
          </button>
          <button 
            onClick={getAIRecommendations}
            disabled={loadingRecommendations}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <span>🤖</span>
            <span>{loadingRecommendations ? 'Getting AI Recommendations...' : 'AI Recommendations'}</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'discover' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Discover</span>
          </button>
          <button
            onClick={() => setActiveTab('collaborations')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'collaborations' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>My Collaborations</span>
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'opportunities' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Star className="w-5 h-5" />
            <span>Opportunities</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'discover' && (
            <div className="space-y-6">
              {/* AI Recommendations Section */}
              {aiRecommendations && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-4">🤖 Gemini AI Collaboration Recommendations</h4>
                  
                  {aiRecommendations.strategicInsights && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Strategic Insights</h5>
                      <div className="space-y-1">
                        {aiRecommendations.strategicInsights.map((insight: string, index: number) => (
                          <div key={index} className="text-sm text-gray-600">• {insight}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {aiRecommendations.marketOpportunities && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Market Opportunities</h5>
                      <div className="flex flex-wrap gap-2">
                        {aiRecommendations.marketOpportunities.map((opportunity: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {opportunity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                  <select 
                    value={selectedRegion} 
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {regions.map(region => (
                      <option key={region.id} value={region.id}>{region.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search collaborators..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Collaborators Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCollaborators.map((collaborator) => (
                  <div key={collaborator.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                          {collaborator.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{collaborator.name}</h3>
                            {collaborator.verified && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{collaborator.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{collaborator.matchScore}%</div>
                        <div className="text-xs text-gray-500">Match Score</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{collaborator.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{collaborator.followers} followers</span>
                        <span>{collaborator.engagementRate} engagement</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {collaborator.specialties.map((specialty, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Cultural Reach</h4>
                      <div className="flex flex-wrap gap-2">
                        {collaborator.culturalReach.map((region, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Recent Work</h4>
                      <p className="text-sm text-gray-600">{collaborator.recentWork}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Connect
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'collaborations' && (
            <div className="space-y-4">
              {myCollaborations.map((collaboration) => (
                <div key={collaboration.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{collaboration.project}</h3>
                      <p className="text-gray-600 text-sm mb-2">{collaboration.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Started: {collaboration.startDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{collaboration.collaborators.length} collaborators</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(collaboration.status)}`}>
                      {collaboration.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Collaborators:</span>
                      <div className="flex space-x-1">
                        {collaboration.collaborators.map((collaborator, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {collaborator}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{opportunity.type}</span>
                        <span>{opportunity.budget}</span>
                        <span>{opportunity.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {opportunity.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{opportunity.regions.join(', ')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Deadline: {opportunity.deadline}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{opportunity.applicants} applicants</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationHub;