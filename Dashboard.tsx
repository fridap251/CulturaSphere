import React from 'react';
import { TrendingUp, Users, Globe, Target, Activity, ArrowUp, ArrowDown, BarChart3, PieChart } from 'lucide-react';
import { useTrends, useCulturalInsights } from '../hooks/useApi';

const Dashboard = () => {
  // Use real API data for dashboard
  const { trends, loading: trendsLoading } = useTrends();
  const { insights, loading: insightsLoading } = useCulturalInsights({ category: 'all', region: 'global' });

  const stats = [
    { name: 'Active Trends', value: '2,847', change: '+12%', icon: TrendingUp, color: 'text-blue-600' },
    { name: 'Generated Personas', value: '1,234', change: '+8%', icon: Users, color: 'text-purple-600' },
    { name: 'Cultural Insights', value: '5,678', change: '+24%', icon: Globe, color: 'text-green-600' },
    { name: 'Collaborations', value: '892', change: '+16%', icon: Target, color: 'text-orange-600' },
  ];

  // Update stats with real data
  if (trends.length > 0) {
    stats[0].value = trends.length.toString();
  }
  if (insights.length > 0) {
    stats[2].value = insights.length.toString();
  }

  const mockTrendingTopics = [
    { topic: 'Sustainable Fashion', score: 94, change: '+5.2%' },
    { topic: 'Digital Wellness', score: 87, change: '+3.8%' },
    { topic: 'Cultural Fusion Food', score: 82, change: '+7.1%' },
    { topic: 'Gen Z Entrepreneurship', score: 78, change: '+2.9%' },
    { topic: 'AI Ethics', score: 73, change: '+9.4%' },
  ];

  // Use real trends data or fallback to mock
  const trendingTopics = trends.length > 0 
    ? trends.slice(0, 5).map((trend, index) => ({
        topic: trend.name,
        score: trend.score,
        change: trend.change
      }))
    : mockTrendingTopics;

  const mockRecentInsights = [
    {
      title: 'Southeast Asian Beauty Trends',
      description: 'Emerging K-beauty influence in Malaysia and Thailand markets',
      impact: 'High',
      category: 'Beauty & Wellness'
    },
    {
      title: 'Nordic Minimalism in Home Decor',
      description: 'Scandinavian design principles gaining traction in urban markets',
      impact: 'Medium',
      category: 'Lifestyle'
    },
    {
      title: 'Latin Music Global Expansion',
      description: 'Reggaeton and Latin trap crossing cultural boundaries',
      impact: 'High',
      category: 'Entertainment'
    }
  ];

  // Use real insights data or fallback to mock
  const recentInsights = insights.length > 0 
    ? insights.slice(0, 3).map(insight => ({
        title: insight.title,
        description: insight.description,
        impact: insight.priority || 'Medium',
        category: insight.category
      }))
    : mockRecentInsights;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-r ${
                  stat.color === 'text-blue-600' ? 'from-blue-50 to-blue-100' :
                  stat.color === 'text-purple-600' ? 'from-purple-50 to-purple-100' :
                  stat.color === 'text-green-600' ? 'from-green-50 to-green-100' :
                  'from-orange-50 to-orange-100'
                }`}>
                  <Icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-2 md:mt-4 flex items-center">
                <ArrowUp className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1" />
                <span className="text-xs md:text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-xs md:text-sm text-gray-500 ml-1 md:ml-2 hidden md:inline">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Trending Topics */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Trending Cultural Topics</h3>
            {trendsLoading && <span className="text-sm text-blue-600">Loading...</span>}
            <button className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-3 md:space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">{topic.topic}</h4>
                    <p className="text-xs md:text-sm text-gray-600">Score: {topic.score}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                  <ArrowUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                  <span className="text-xs md:text-sm text-green-600 font-medium">{topic.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Quick Actions</h3>
          <div className="space-y-3 md:space-y-4">
            <button className="w-full p-3 md:p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center text-sm md:text-base">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Explore Trends
            </button>
            <button className="w-full p-3 md:p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center text-sm md:text-base">
              <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Generate Persona
            </button>
            <button className="w-full p-3 md:p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center text-sm md:text-base">
              <Globe className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              View Cultural Map
            </button>
            <button className="w-full p-3 md:p-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center justify-center text-sm md:text-base">
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Get Insights
            </button>
          </div>
        </div>
      </div>

      {/* Recent Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Recent Cultural Insights</h3>
          {insightsLoading && <span className="text-sm text-blue-600">Loading...</span>}
          <button className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {recentInsights.map((insight, index) => (
            <div key={index} className="p-3 md:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  insight.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {insight.impact} Impact
                </span>
                <span className="text-xs text-gray-500 hidden md:inline">{insight.category}</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2 text-sm md:text-base">{insight.title}</h4>
              <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">{insight.description}</p>
              <button className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;