import React, { useState } from 'react';
import { Map, Globe, Filter, ZoomIn, ZoomOut, Layers, Info } from 'lucide-react';

const CulturalMap = () => {
  const [selectedLayer, setSelectedLayer] = useState('trends');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const layers = [
    { id: 'trends', name: 'Cultural Trends', color: 'text-blue-600' },
    { id: 'influences', name: 'Cultural Influences', color: 'text-purple-600' },
    { id: 'movements', name: 'Social Movements', color: 'text-green-600' },
    { id: 'networks', name: 'Creator Networks', color: 'text-orange-600' }
  ];

  const regions = [
    {
      id: 'north-america',
      name: 'North America',
      trends: ['Sustainable Living', 'Remote Work Culture', 'Plant-Based Eating'],
      influences: ['Silicon Valley Innovation', 'Hollywood Entertainment', 'Hip-Hop Culture'],
      connections: ['Europe', 'Asia Pacific'],
      strength: 94
    },
    {
      id: 'europe',
      name: 'Europe',
      trends: ['Minimalist Design', 'Circular Economy', 'Digital Privacy'],
      influences: ['Nordic Sustainability', 'Italian Fashion', 'British Music'],
      connections: ['North America', 'Middle East'],
      strength: 87
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      trends: ['K-Beauty', 'Mobile Gaming', 'Sustainable Fashion'],
      influences: ['K-Pop Culture', 'Japanese Aesthetics', 'Tech Innovation'],
      connections: ['North America', 'Europe'],
      strength: 91
    },
    {
      id: 'latin-america',
      name: 'Latin America',
      trends: ['Latin Music Fusion', 'Urban Art', 'Social Activism'],
      influences: ['Reggaeton', 'Street Art', 'Indigenous Culture'],
      connections: ['North America', 'Europe'],
      strength: 78
    },
    {
      id: 'middle-east',
      name: 'Middle East',
      trends: ['Digital Entrepreneurship', 'Cultural Preservation', 'Luxury Lifestyle'],
      influences: ['Traditional Arts', 'Modern Architecture', 'Religious Values'],
      connections: ['Europe', 'Asia Pacific'],
      strength: 72
    },
    {
      id: 'africa',
      name: 'Africa',
      trends: ['Afrobeats', 'Mobile Banking', 'Youth Entrepreneurship'],
      influences: ['Traditional Music', 'Fashion Innovation', 'Community Values'],
      connections: ['Europe', 'Middle East'],
      strength: 83
    }
  ];

  const culturalConnections = [
    { from: 'North America', to: 'Europe', strength: 95, trend: 'Sustainable Living' },
    { from: 'Asia Pacific', to: 'North America', strength: 92, trend: 'Tech Innovation' },
    { from: 'Europe', to: 'Asia Pacific', strength: 87, trend: 'Minimalist Design' },
    { from: 'Latin America', to: 'North America', strength: 89, trend: 'Music Fusion' },
    { from: 'Africa', to: 'Europe', strength: 74, trend: 'Fashion Innovation' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cultural Map</h2>
          <p className="text-gray-600 mt-1">Explore global cultural networks and influences</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ZoomOut className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Layers className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Layers:</span>
            </div>
            <div className="flex space-x-2">
              {layers.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedLayer === layer.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {layer.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>High Influence</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Medium Influence</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Emerging</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">Interactive Cultural Network Map</p>
                <p className="text-sm text-gray-500">Global cultural connections and influence flows</p>
              </div>
            </div>
            
            {/* Simulated Network Nodes */}
            <div className="absolute inset-0 p-8">
              <div className="relative h-full w-full">
                {/* North America */}
                <div 
                  className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-blue-600 transition-colors"
                  onClick={() => setSelectedRegion('north-america')}
                >
                  NA
                </div>
                
                {/* Europe */}
                <div 
                  className="absolute top-1/3 left-1/2 w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-purple-600 transition-colors"
                  onClick={() => setSelectedRegion('europe')}
                >
                  EU
                </div>
                
                {/* Asia Pacific */}
                <div 
                  className="absolute top-1/4 right-1/4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-green-600 transition-colors"
                  onClick={() => setSelectedRegion('asia-pacific')}
                >
                  AP
                </div>
                
                {/* Latin America */}
                <div 
                  className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-orange-600 transition-colors"
                  onClick={() => setSelectedRegion('latin-america')}
                >
                  LA
                </div>
                
                {/* Middle East */}
                <div 
                  className="absolute top-1/2 right-1/3 w-11 h-11 bg-red-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-red-600 transition-colors"
                  onClick={() => setSelectedRegion('middle-east')}
                >
                  ME
                </div>
                
                {/* Africa */}
                <div 
                  className="absolute bottom-1/4 left-1/2 w-13 h-13 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-teal-600 transition-colors"
                  onClick={() => setSelectedRegion('africa')}
                >
                  AF
                </div>
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 0.6}} />
                      <stop offset="100%" style={{stopColor: '#8B5CF6', stopOpacity: 0.3}} />
                    </linearGradient>
                  </defs>
                  <line x1="25%" y1="25%" x2="50%" y2="33%" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="75%" y1="25%" x2="50%" y2="33%" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Region Details Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Region Details</h3>
          </div>
          
          {selectedRegion ? (
            <div className="space-y-4">
              {(() => {
                const region = regions.find(r => r.id === selectedRegion);
                return (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{region.name}</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Trending Topics</h5>
                        <div className="space-y-1">
                          {region.trends.map((trend, index) => (
                            <div key={index} className="text-sm text-gray-600">• {trend}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Cultural Influences</h5>
                        <div className="space-y-1">
                          {region.influences.map((influence, index) => (
                            <div key={index} className="text-sm text-gray-600">• {influence}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Influence Strength</h5>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              style={{ width: `${region.strength}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{region.strength}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Click on a region to view details</p>
          )}
        </div>
      </div>

      {/* Cultural Connections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Cultural Connections</h3>
        <div className="space-y-3">
          {culturalConnections.map((connection, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {connection.from} → {connection.to}
                  </div>
                  <div className="text-sm text-gray-600">{connection.trend}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                    style={{ width: `${connection.strength}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{connection.strength}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalMap;