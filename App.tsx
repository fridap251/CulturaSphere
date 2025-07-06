import React, { useState } from 'react';
import { Globe, TrendingUp, Users, Map, Lightbulb, Target, Menu, X } from 'lucide-react';
import LandingPage from './components/LandingPage';
import MobileNavigation from './components/MobileNavigation';
import QRCodePage from './components/QRCodePage';
import Dashboard from './components/Dashboard';
import TrendExplorer from './components/TrendExplorer';
import PersonaGenerator from './components/PersonaGenerator';
import CulturalMap from './components/CulturalMap';
import InsightsPanel from './components/InsightsPanel';
import CollaborationHub from './components/CollaborationHub';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Globe },
    { id: 'trends', name: 'Trend Explorer', icon: TrendingUp },
    { id: 'personas', name: 'Persona Generator', icon: Target },
    { id: 'cultural-map', name: 'Cultural Map', icon: Map },
    { id: 'insights', name: 'Insights', icon: Lightbulb },
    { id: 'collaboration', name: 'Collaboration', icon: Users },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onEnter={() => setCurrentPage('dashboard')} />;
      case 'qr-code':
        return <QRCodePage onBack={() => setShowQRCode(false)} />;
      case 'dashboard':
        return <Dashboard />;
      case 'trends':
        return <TrendExplorer />;
      case 'personas':
        return <PersonaGenerator />;
      case 'cultural-map':
        return <CulturalMap />;
      case 'insights':
        return <InsightsPanel />;
      case 'collaboration':
        return <CollaborationHub />;
      default:
        return <Dashboard />;
    }
  };

  if (currentPage === 'landing') {
    return renderPage();
  }

  if (showQRCode) {
    return <QRCodePage onBack={() => setShowQRCode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-16 md:pb-0">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 hidden md:block`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CulturaSphere
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 md:block hidden">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <h1 className="ml-2 text-xl font-semibold text-gray-900">
                  {navigation.find(item => item.id === currentPage)?.name || 'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  <Users className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setShowQRCode(true)}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>📱</span>
                  <span>Mobile QR</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 md:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CulturaSphere
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowQRCode(true)}
                  className="p-2 rounded-lg bg-blue-100 text-blue-600"
                >
                  <span>📱</span>
                </button>
                <button className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="hidden md:block"
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;