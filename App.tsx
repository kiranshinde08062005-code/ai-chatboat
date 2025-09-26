
import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { ShieldAlert, Bot } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-mono">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard />
      </main>
      <footer className="text-center p-4 text-xs text-gray-500 border-t border-gray-800">
        <p>CSTP - Cybersecurity Threat Predictor. All systems operational.</p>
        <p>&copy; 2024 AI Systems Inc. Not for production use.</p>
      </footer>
    </div>
  );
};

export default App;
