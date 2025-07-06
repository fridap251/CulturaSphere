import React, { useState } from 'react';
import { TrendingUp, Filter, Search, Calendar, Globe, BarChart3, LineChart } from 'lucide-react';
import { useTrends } from '../hooks/useApi';

const TrendExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeRange, setTimeRange] = useState('30d');

  // Use real API data
  const { trends: apiTrends, loading, error, refetch } = useTrends(
    selectedCategory === 'all' ? undefined : selectedCategory,
    selectedRegion === 'global' ? undefined : selectedRegion
  );

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'fashion', name: 'Fashion & Beauty' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'technology', name: 'Technology' },
    { id: 'wellness', name: 'Wellness & Health' }
  ];

  const regions = [
    { id: 'global', name: 'Global' },
    { id: 'north-america', name: 'North America' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia-pacific', name: 'Asia Pacific' },
    { id: 'latin-america', name: 'Latin America' },
    { id: 'middle-east', name: 'Middle East' }
  ];

  // Use API data or fallback to mock data
  const trends = apiTrends.length > 0 ? apiTrends : [
    {
      id: 1,
      name: 'Sustainable Fashion',
      category: 'Fashion & Beauty',
      score: 94,
      change: '+12%',
      region: 'Europe',
      description: 'Eco-friendly materials and ethical production gaining momentum',
      keywords: ['sustainable', 'eco-friendly', 'ethical fashion', 'circular economy'],
      predictedGrowth: '+25%'
    },
    {
      id: 2,
      name: 'Plant-Based Meat Alternatives',
      category: 'Food & Dining',
      score: 87,
      change: '+8%',
      region: 'North America',
      description: 'Growing acceptance of plant-based proteins in mainstream dining',
      keywords: ['plant-based', 'vegan', 'protein alternatives', 'sustainability'],
      predictedGrowth: '+18%'
    },
    {
      id: 3,
      name: 'Digital Wellness',
      category: 'Lifestyle',
      score: 82,
      change: '+15%',
      region: 'Global',
      description: 'Mindful technology use and digital detox practices',
      keywords: ['digital detox', 'mindfulness', 'screen time', 'wellness'],
      predictedGrowth: '+22%'
    },
    {
      id: 4,
      name: 'K-Beauty Skincare',
      category: 'Fashion & Beauty',
      score: 78,
      change: '+6%',
      region: 'Asia Pacific',
      description: 'Korean skincare routines and ingredients going global',
      keywords: ['K-beauty', 'skincare', 'glass skin', 'Korean beauty'],
      predictedGrowth: '+14%'
    },
    {
      id: 5,
      name: 'Immersive Gaming',
      category: 'Entertainment',
      score: 75,
      change: '+20%',
      region: 'Global',
      description: 'AR/VR gaming experiences becoming mainstream',
      keywords: ['AR', 'VR', 'immersive', 'gaming', 'virtual reality'],
      predictedGrowth: '+35%'
    }
  ];

  const filteredTrends = trends.filter(trend => {
    const categoryMatch = selectedCategory === 'all' || trend.category.toLowerCase().includes(selectedCategory);
    const regionMatch = selectedRegion === 'global' || trend.region.toLowerCase().includes(selectedRegion.replace('-', ' '));
    return categoryMatch && regionMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trend Explorer</h2>
          <p className="text-gray-600 mt-1">Discover emerging cultural trends and predict future movements</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm bg-transparent border-none focus:outline-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Filters</h3>
        </div>
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
                placeholder="Search trends..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trending Visualization */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Trend Velocity</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
              <LineChart className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            {loading ? (
              <p className="text-gray-600">Loading trend data...</p>
            ) : error ? (
              <div>
                <p className="text-red-600">Error loading trends</p>
                <button 
                  onClick={refetch}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">Interactive trend visualization</p>
                <p className="text-sm text-gray-500 mt-2">Showing {trends.length} trends</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trends List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Current Trends</h3>
          <p className="text-sm text-gray-600 mt-1">
            Showing {filteredTrends.length} trends
            {loading && <span className="ml-2 text-blue-600">• Loading...</span>}
            {error && <span className="ml-2 text-red-600">• Error: {error}</span>}
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTrends.map((trend) => (
            <div key={trend.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-lg font-medium text-gray-900">{trend.name}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {trend.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {trend.region}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{trend.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {trend.keywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Current Score: <strong className="text-gray-900">{trend.score}</strong></span>
                    <span>30-day Change: <strong className="text-green-600">{trend.change}</strong></span>
                    <span>Predicted Growth: <strong className="text-blue-600">{trend.predictedGrowth}</strong></span>
                    {trend.aiAnalysis && (
                      <span>AI Confidence: <strong className="text-purple-600">{Math.round((trend.aiAnalysis.confidence || 0.8) * 100)}%</strong></span>
                    )}
                    {trend.aiAnalysis?.sentiment && (
                      <span>Sentiment: <strong className={`${
                        trend.aiAnalysis.sentiment === 'POSITIVE' ? 'text-green-600' : 
                        trend.aiAnalysis.sentiment === 'NEGATIVE' ? 'text-red-600' : 'text-gray-600'
                      }`}>{trend.aiAnalysis.sentiment}</strong></span>
                    )}
                  </div>
                </div>
                
                {/* AI Analysis Section */}
                {trend.aiAnalysis?.analysis && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">🤖 Gemini AI Analysis</h5>
                    <p className="text-sm text-gray-700 mb-3">{trend.aiAnalysis.analysis}</p>
                    
                    {trend.aiAnalysis.culturalContext?.length > 0 && (
                      <div className="mb-2">
                        <span className="text-xs font-medium text-gray-600">Cultural Context: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {trend.aiAnalysis.culturalContext.map((context: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                              {context}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {trend.aiAnalysis.recommendations?.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">AI Recommendations: </span>
                        <ul className="mt-1 space-y-1">
                          {trend.aiAnalysis.recommendations.slice(0, 2).map((rec: string, index: number) => (
                            <li key={index} className="text-xs text-gray-600">• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-2xl font-bold text-gray-900">{trend.score}</div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${trend.score}%` }}
                    />
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendExplorer;