import React, { useState } from 'react';
import { Users, Target, Brain, Sparkles, Download, Share2, RefreshCw } from 'lucide-react';
import { usePersonaGeneration } from '../hooks/useApi';

const PersonaGenerator = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [formData, setFormData] = useState({
    industry: '',
    targetMarket: '',
    ageRange: '',
    interests: '',
    values: '',
    region: ''
  });

  // Use real API for persona generation
  const { persona: generatedPersona, loading, error, generatePersona: apiGeneratePersona } = usePersonaGeneration();

  const industries = [
    'Fashion & Beauty',
    'Food & Beverage',
    'Technology',
    'Entertainment',
    'Healthcare',
    'Education',
    'Travel & Hospitality',
    'Automotive',
    'Finance',
    'Retail'
  ];

  const regions = [
    'North America',
    'Europe',
    'Asia Pacific',
    'Latin America',
    'Middle East',
    'Africa',
    'Global'
  ];

  const samplePersona = {
    name: 'Maya Chen',
    age: 28,
    location: 'San Francisco, CA',
    occupation: 'UX Designer',
    income: '$85,000',
    education: 'Bachelor\'s in Design',
    demographics: {
      lifestyle: 'Urban Professional',
      familyStatus: 'Single',
      techSavviness: 'High'
    },
    psychographics: {
      values: ['Sustainability', 'Innovation', 'Work-life balance', 'Social impact'],
      interests: ['Design trends', 'Eco-friendly products', 'Travel', 'Photography'],
      painPoints: ['Time management', 'Information overload', 'Authentic brands'],
      goals: ['Career advancement', 'Sustainable living', 'Creative expression']
    },
    culturalProfile: {
      influences: ['Scandinavian minimalism', 'Japanese aesthetics', 'California wellness culture'],
      mediaConsumption: ['Instagram', 'Design blogs', 'Podcasts', 'Netflix'],
      shoppingBehavior: 'Research-driven, values quality over quantity',
      brandAffinities: ['Patagonia', 'Apple', 'Muji', 'Airbnb']
    },
    engagement: {
      preferredChannels: ['Instagram', 'LinkedIn', 'Email newsletters'],
      contentTypes: ['Visual content', 'Behind-the-scenes', 'Educational content'],
      communicationStyle: 'Authentic, informative, visually appealing'
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePersona = () => {
    // Use real API
    apiGeneratePersona(formData).then((persona) => {
      if (persona) {
        setActiveTab('results');
      }
    });
  };

  const regeneratePersona = () => {
    apiGeneratePersona(formData).then((persona) => {
      if (persona) {
      setActiveTab('results');
      }
    });
  };

  const savedPersonas = [
    {
      name: 'Alex Rodriguez',
      industry: 'Fashion & Beauty',
      region: 'Latin America',
      createdAt: '2025-01-10',
      tags: ['Gen Z', 'Sustainable', 'Social Media']
    },
    {
      name: 'Emma Thompson',
      industry: 'Technology',
      region: 'Europe',
      createdAt: '2025-01-08',
      tags: ['Millennial', 'B2B', 'Innovation']
    },
    {
      name: 'Kai Nakamura',
      industry: 'Entertainment',
      region: 'Asia Pacific',
      createdAt: '2025-01-05',
      tags: ['Gaming', 'Streaming', 'Mobile-first']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Persona Generator</h2>
          <p className="text-gray-600 mt-1">Create detailed audience personas using cultural intelligence</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
            <Sparkles className="w-4 h-4" />
            <span>AI Generate</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'generate' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Brain className="w-5 h-5" />
            <span>Generate</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'saved' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Saved Personas</span>
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'results' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Target className="w-5 h-5" />
            <span>Results</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'generate' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select 
                    value={formData.industry} 
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Region</label>
                  <select 
                    value={formData.region} 
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                  <select 
                    value={formData.ageRange} 
                    onChange={(e) => handleInputChange('ageRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select age range</option>
                    <option value="18-24">18-24 (Gen Z)</option>
                    <option value="25-34">25-34 (Millennial)</option>
                    <option value="35-44">35-44 (Gen X)</option>
                    <option value="45-54">45-54 (Gen X)</option>
                    <option value="55+">55+ (Boomer)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Market</label>
                  <input
                    type="text"
                    value={formData.targetMarket}
                    onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                    placeholder="e.g., Eco-conscious consumers"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Interests</label>
                  <textarea
                    value={formData.interests}
                    onChange={(e) => handleInputChange('interests', e.target.value)}
                    placeholder="e.g., Sustainable living, technology, travel"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Core Values</label>
                  <textarea
                    value={formData.values}
                    onChange={(e) => handleInputChange('values', e.target.value)}
                    placeholder="e.g., Authenticity, innovation, community"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={generatePersona}
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{loading ? 'Generating...' : 'Generate Persona'}</span>
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">Error: {error}</p>
                  <button 
                    onClick={generatePersona}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-4">
              {savedPersonas.map((persona, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{persona.name}</h4>
                      <p className="text-sm text-gray-600">{persona.industry} • {persona.region}</p>
                      <p className="text-xs text-gray-500 mt-1">Created: {persona.createdAt}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {persona.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'results' && generatedPersona && (
            <div className="space-y-6">
              {/* Persona Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{generatedPersona.name}</h3>
                    <p className="text-gray-600">{generatedPersona.age} years old • {generatedPersona.location}</p>
                    <p className="text-gray-600">{generatedPersona.occupation} • {generatedPersona.income}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <RefreshCw 
                        className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
                        onClick={regeneratePersona}
                      />
                    </button>
                    <button className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Insights Section */}
              {generatedPersona?.aiInsights && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">🤖 Gemini AI Cultural Insights</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Cultural Context</h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedPersona.aiInsights.culturalContext?.map((context: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {context}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Marketing Recommendations</h5>
                      <div className="space-y-1">
                        {generatedPersona.aiInsights.recommendations?.map((rec: string, index: number) => (
                          <div key={index} className="text-sm text-gray-600">• {rec}</div>
                        ))}
                      </div>
                    </div>
                    
                    {generatedPersona.aiInsights.culturalNuances && (
                      <div className="lg:col-span-2 mt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Cultural Nuances</h5>
                        <p className="text-sm text-gray-600">{generatedPersona.aiInsights.culturalNuances}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Persona Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Demographics */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Demographics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Education:</span>
                      <span className="font-medium">{generatedPersona.education}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lifestyle:</span>
                      <span className="font-medium">{generatedPersona.demographics.lifestyle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Family Status:</span>
                      <span className="font-medium">{generatedPersona.demographics.familyStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tech Savviness:</span>
                      <span className="font-medium">{generatedPersona.demographics.techSavviness}</span>
                    </div>
                  </div>
                </div>

                {/* Psychographics */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Values & Interests</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Core Values</h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedPersona.psychographics.values.map((value, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Interests</h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedPersona.psychographics.interests.map((interest, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cultural Profile */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Cultural Profile</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Cultural Influences</h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedPersona.culturalProfile.influences.map((influence, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            {influence}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Brand Affinities</h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedPersona.culturalProfile.brandAffinities.map((brand, index) => (
                          <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engagement */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Engagement Strategy</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Preferred Channels</h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedPersona.engagement.preferredChannels.map((channel, index) => (
                          <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Content Types</h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedPersona.engagement.contentTypes.map((type, index) => (
                          <span key={index} className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pain Points & Goals */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Pain Points</h4>
                  <ul className="space-y-2">
                    {generatedPersona.psychographics.painPoints.map((point, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Goals</h4>
                  <ul className="space-y-2">
                    {generatedPersona.psychographics.goals.map((goal, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonaGenerator;