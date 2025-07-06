import React from 'react';
import { Smartphone, Download, Share2, Copy } from 'lucide-react';

const QRCodeGenerator = () => {
  const appUrl = 'https://comfy-froyo-a6e047.netlify.app';
  
  // Generate QR code using QR Server API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(appUrl)}&bgcolor=ffffff&color=3B82F6&margin=20&format=png`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(appUrl);
    alert('URL copied to clipboard!');
  };

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CulturaSphere - Cultural Analytics Platform',
        text: 'Check out this amazing cultural intelligence platform!',
        url: appUrl,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan to Access</h2>
        <p className="text-gray-600">Open CulturaSphere on your mobile device</p>
      </div>

      {/* QR Code */}
      <div className="bg-white p-4 rounded-xl border-2 border-gray-100 mb-6 inline-block">
        <img 
          src={qrCodeUrl} 
          alt="QR Code for CulturaSphere App"
          className="w-64 h-64 mx-auto"
        />
      </div>

      {/* Instructions */}
      <div className="space-y-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📱 How to Access:</h3>
          <ol className="text-sm text-blue-800 text-left space-y-1">
            <li>1. Open your phone's camera app</li>
            <li>2. Point it at the QR code above</li>
            <li>3. Tap the notification that appears</li>
            <li>4. Add to home screen for app-like experience</li>
          </ol>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-2">✨ Mobile Features:</h3>
          <ul className="text-sm text-purple-800 text-left space-y-1">
            <li>• Touch-optimized interface</li>
            <li>• Bottom navigation for easy access</li>
            <li>• Works offline as PWA</li>
            <li>• Full AI-powered analytics</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={shareApp}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Share2 className="w-5 h-5" />
          <span>Share App</span>
        </button>
        
        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Copy className="w-5 h-5" />
          <span>Copy URL</span>
        </button>
        
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Smartphone className="w-5 h-5" />
          <span>Open in Browser</span>
        </a>
      </div>

      {/* URL Display */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500 mb-1">Direct URL:</p>
        <p className="text-sm font-mono text-gray-700 break-all">{appUrl}</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;