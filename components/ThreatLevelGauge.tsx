
import React, { useState, useEffect } from 'react';

const ThreatLevelGauge: React.FC = () => {
    const [level, setLevel] = useState(75); // Example level percentage
    const color = level > 85 ? 'text-red-500' : level > 60 ? 'text-yellow-400' : 'text-green-400';
    const bgColor = level > 85 ? 'bg-red-500/10' : level > 60 ? 'bg-yellow-400/10' : 'bg-green-400/10';
    const label = level > 85 ? 'CRITICAL' : level > 60 ? 'HIGH' : level > 30 ? 'MEDIUM' : 'LOW';

    useEffect(() => {
        const interval = setInterval(() => {
            setLevel(Math.floor(Math.random() * 25) + 70); // Simulate fluctuating high-threat level
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (level / 100) * circumference;

    return (
        <div className={`bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center h-full ${bgColor}`}>
            <h3 className="text-sm font-medium text-gray-400 mb-2">CURRENT THREAT LEVEL</h3>
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle
                        className="text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                    />
                    <circle
                        className={`${color} transition-all duration-1000 ease-out`}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                        transform="rotate(-90 60 60)"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${color}`}>{level}</span>
                    <span className={`text-xs font-semibold tracking-widest ${color}`}>{label}</span>
                </div>
            </div>
        </div>
    );
};

export default ThreatLevelGauge;
