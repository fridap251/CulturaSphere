import React, { useState } from 'react';
import { Lightbulb, Download, Share2, Filter, Calendar, TrendingUp, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { useCulturalInsights } from '../hooks/useApi';

const InsightsPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  // Use real API for cultural insights
  const { insights: apiInsights, loading, error, refetch } = useCulturalInsights({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    region: 'global',
    timeRange
  });

  const categories = [
    { id: 'all', name: 'All Insights' },
    { id: 'trends', name: 'Trend Analysis' },
    { id: 'audience', name: 'Audience Insights' },
    { id: 'content', name: 'Content Strategy' },
    { id: 'campaigns', name: 'Campaign Optimization' },
    { id: 'competitive', name: 'Competitive Analysis' }
  ];

  // Use API data or fallback to mock data
  const mockInsights = [
    {
      id: 1,
      title: 'Southeast Asian Beauty Market Expansion',
      category: 'Trend Analysis',
      priority: 'High',
      impact: 'Revenue Growth',
      description: 'K-beauty influence is driving 40% growth in skincare adoption across Malaysia, Thailand, and Singapore markets.',
      actionItems: [
        'Partner with local K-beauty influencers',
        'Localize product descriptions for SEA markets',
        'Launch targeted campaigns in Q2 2025'
      ],
      metrics: {
        opportunitySize: '$2.3M',
        confidence: '87%',
        timeline: '3-6 months'
      },
      generatedDate: '2025-01-10',
      tags: ['Beauty', 'Asia Pacific', 'K-beauty', 'Market Expansion']
    },
    {
      id: 2,
      title: 'Gen Z Sustainable Fashion Preferences',
      category: 'Audience Insights',
      priority: 'Medium',
      impact: 'Brand Positioning',
      description: 'Gen Z consumers show 65% preference for brands with transparent sustainability practices and circular economy initiatives.',
      actionItems: [
        'Develop sustainability reporting dashboard',
        'Create content series on circular fashion',
        'Partner with eco-conscious micro-influencers'
      ],
      metrics: {
        opportunitySize: '$1.8M',
        confidence: '92%',
        timeline: '2-4 months'
      },
      generatedDate: '2025-01-09',
      tags: ['Gen Z', 'Sustainability', 'Fashion', 'Brand Values']
    },
    {
      id: 3,
      title: 'Latin Music Cultural Crossover',
      category: 'Content Strategy',
      priority: 'High',
      impact: 'Audience Engagement',
      description: 'Reggaeton and Latin trap are influencing mainstream pop culture, creating opportunities for cross-cultural content.',
      actionItems: [
        'Collaborate with Latin music artists',
        'Create bilingual content campaigns',
        'Target Hispanic diaspora communities'
      ],
      metrics: {
        opportunitySize: '$3.1M',
        confidence: '78%',
        timeline: '1-3 months'
      },
      generatedDate: '2025-01-08',
      tags: ['Latin Music', 'Cultural Fusion', 'Content', 'Engagement']
    },
    {
      id: 4,
      title: 'Nordic Minimalism in Home Decor',
      category: 'Campaign Optimization',
      priority: 'Medium',
      impact: 'Market Share',
      description: 'Scandinavian design principles are trending in urban markets, with 35% increase in related searches.',
      actionItems: [
        'Optimize product photography with minimalist styling',
        'Create Nordic-inspired room design guides',
        'Target urban millennial demographics'
      ],
      metrics: {
        opportunitySize: '$1.5M',
        confidence: '84%',
        timeline: '2-5 months'
      },
      generatedDate: '2025-01-07',
      tags: ['Nordic Design', 'Minimalism', 'Home Decor', 'Urban']
    },
    {
      id: 5,
      title: 'AI Ethics Consumer Awareness',
      category: 'Competitive Analysis',
      priority: 'Low',
      impact: 'Brand Trust',
      description: 'Growing consumer awareness of AI ethics creates opportunity for transparent AI communication strategies.',
      actionItems: [
        'Develop AI transparency guidelines',
        'Create educational content about AI use',
        'Highlight ethical AI practices in marketing'
      ],
      metrics: {
        opportunitySize: '$900K',
        confidence: '71%',
        timeline: '4-6 months'
      },
      generatedDate: '2025-01-06',
      tags: ['AI Ethics', 'Transparency', 'Consumer Trust', 'Technology']
    }
  ];

  const insights = apiInsights.length > 0 ? apiInsights : mockInsights;

  const filteredInsights = insights.filter(insight => {
    const categoryMatch = selectedCategory === 'all' || insight.category.toLowerCase().includes(selectedCategory);
    const priorityMatch = selectedPriority === 'all' || insight.priority.toLowerCase() === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'Revenue Growth': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Brand Positioning': return <Target className="w-4 h-4 text-blue-600" />;
      case 'Audience Engagement': return <CheckCircle className="w-4 h-4 text-purple-600" />;
      case 'Market Share': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'Brand Trust': return <CheckCircle className="w-4 h-4 text-indigo-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cultural Insights</h2>
          <p className="text-gray-600 mt-1">AI-powered actionable insights for your cultural strategy</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
            <Lightbulb className="w-4 h-4" />
            <span>Generate Insights</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Filter Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select 
              value={selectedPriority} 
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Apply Filters
              onClick={refetch}
              {loading && <span className="ml-1 text-xs">Loading...</span>}
            </button>
            {error && (
              <div className="ml-2 text-sm text-red-600">
                Error loading insights
                <button onClick={refetch} className="ml-1 underline">Retry</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Lightbulb className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Insights</p>
              <p className="text-2xl font-bold text-gray-900">{filteredInsights.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredInsights.filter(i => i.priority === 'High').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Potential Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$9.6M</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Confidence</p>
              <p className="text-2xl font-bold text-gray-900">82%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => (
          <div key={insight.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(insight.priority)}`}>
                    {insight.priority} Priority
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {insight.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{insight.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {insight.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Metrics */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-3">
                  {getImpactIcon(insight.impact)}
                  <span className="font-medium text-gray-900">{insight.impact}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Opportunity Size</p>
                    <p className="text-lg font-bold text-gray-900">{insight.metrics.opportunitySize}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Confidence</p>
                    <p className="text-lg font-bold text-gray-900">{insight.metrics.confidence}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="text-lg font-bold text-gray-900">{insight.metrics.timeline}</p>
                    {insight.sentiment && (
                      <span>AI Sentiment: <strong className={`${
                        insight.sentiment === 'POSITIVE' ? 'text-green-600' : 
                        insight.sentiment === 'NEGATIVE' ? 'text-red-600' : 'text-gray-600'
                      }`}>{insight.sentiment}</strong></span>
                    )}
                  </div>
                </div>
                
                {/* AI Analysis Section */}
                {insight.culturalSignificance && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">🤖 Gemini AI Cultural Analysis</h5>
                    <p className="text-sm text-gray-700">{insight.culturalSignificance}</p>
                  </div>
                )}
              </div>

              {/* Action Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recommended Actions</h4>
                <ul className="space-y-2">
                  {insight.actionItems.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Implement Actions
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
              <span>Generated: {insight.generatedDate}</span>
              <div className="flex items-center space-x-4">
                <span>Confidence: {insight.metrics.confidence}</span>
                <span>Timeline: {insight.metrics.timeline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;