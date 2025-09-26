
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, trend }) => {
  const trendColor = trend.startsWith('+') ? 'text-green-400' : trend.startsWith('-') ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col justify-between hover:bg-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-semibold text-white">{value}</p>
        <p className={`text-xs ${trendColor}`}>{trend}</p>
      </div>
    </div>
  );
};

export default StatCard;
