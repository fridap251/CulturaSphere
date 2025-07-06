import React from 'react';
import { Globe, TrendingUp, Users, Map, Lightbulb, Target, ArrowRight, Check, Star, Play } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Trend Prediction',
      description: 'AI-powered insights into emerging cultural movements and consumer behaviors.'
    },
    {
      icon: Target,
      title: 'Persona Generation',
      description: 'Create detailed audience personas for culturally resonant campaigns.'
    },
    {
      icon: Map,
      title: 'Cultural Mapping',
      description: 'Interactive visualization of global cultural networks and influences.'
    },
    {
      icon: Lightbulb,
      title: 'Actionable Insights',
      description: 'Data-driven recommendations for campaigns, content, and collaborations.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 'Contact Sales',
      description: 'Perfect for individuals and small teams',
      features: [
        'Basic trend analysis',
        'Limited persona generation',
        'Community support',
        'API access (100 calls/month)'
      ]
    },
    {
      name: 'Pro',
      price: 'Contact Sales',
      description: 'For growing agencies and SMBs',
      features: [
        'Advanced trend predictions',
        'Unlimited persona generation',
        'Priority support',
        'API access (10K calls/month)',
        'Custom reports',
        'Collaboration tools'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Contact Sales',
      description: 'For large organizations',
      features: [
        'Full platform access',
        'Custom integrations',
        'Dedicated account manager',
        'Unlimited API calls',
        'White-label options',
        'SLA guarantee'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              CulturaSphere
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock the power of cultural intelligence with AI-driven insights that predict trends, 
              generate personas, and map global cultural networks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onEnter}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center"
              >
                Explore Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cultural Intelligence Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empower your brand with deep cultural insights and predictive analytics
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-b from-blue-50 to-purple-50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Cultural Strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join leading brands, agencies, and creators who trust CulturaSphere for cultural intelligence.
          </p>
          <button 
            onClick={onEnter}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;