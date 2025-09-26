
import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Header: React.FC = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-cyan-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="h-8 w-8 text-cyan-400" />
            <h1 className="text-xl font-bold tracking-wider text-cyan-400">
              C S T P
            </h1>
            <span className="hidden sm:inline-block text-sm text-gray-500">/ Cybersecurity Threat Predictor</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
             <span className="text-green-400 animate-pulse">● LIVE</span>
             <span className="text-gray-400">{time.toLocaleDateString()}</span>
             <span className="text-gray-400 font-semibold">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
