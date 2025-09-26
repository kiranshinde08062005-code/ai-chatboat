
import React from 'react';
import StatCard from './StatCard';
import ThreatLevelGauge from './ThreatLevelGauge';
import ThreatFeed from './ThreatFeed';
import Chatbot from './Chatbot';
import AutomatedActions from './AutomatedActions';
import ModelStatus from './ModelStatus';
import ThreatChart from './ThreatChart';
import { ShieldCheck, AlertTriangle, Blocks, Cpu } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 xl:col-span-3 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={<AlertTriangle className="w-8 h-8 text-yellow-400" />} title="Threats Detected" value="1,283" trend="+5.2%" />
          <StatCard icon={<Blocks className="w-8 h-8 text-red-500" />} title="IPs Blocked" value="412" trend="+1.8%" />
          <StatCard icon={<ShieldCheck className="w-8 h-8 text-green-500" />} title="Patches Applied" value="98" trend="Stable" />
          <StatCard icon={<Cpu className="w-8 h-8 text-blue-400" />} title="System Health" value="99.8%" trend="Normal" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <ThreatChart />
            </div>
            <div className="flex flex-col space-y-6">
                 <ThreatLevelGauge />
                 <ModelStatus />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ThreatFeed />
            <AutomatedActions />
        </div>
      </div>

      {/* Right Column (Chatbot) */}
      <div className="lg:col-span-1 xl:col-span-1">
        <Chatbot />
      </div>
    </div>
  );
};

export default Dashboard;
