
import React, { useState, useEffect } from 'react';
import type { Threat } from '../types';
import { ThreatLevel } from '../types';

const initialThreats: Threat[] = [
  { id: '1', timestamp: new Date().toISOString(), type: 'DDoS', sourceIp: '198.51.100.12', description: 'High volume traffic detected', severity: ThreatLevel.HIGH },
  { id: '2', timestamp: new Date().toISOString(), type: 'Phishing', sourceIp: '203.0.113.45', description: 'Malicious link detected in email', severity: ThreatLevel.MEDIUM },
  { id: '3', timestamp: new Date().toISOString(), type: 'Malware', sourceIp: '192.0.2.88', description: 'Suspicious file download', severity: ThreatLevel.HIGH },
];

const newThreatsPool: Omit<Threat, 'id' | 'timestamp'>[] = [
    { type: 'Ransomware', sourceIp: '198.18.0.24', description: 'File encryption activity detected', severity: ThreatLevel.CRITICAL },
    { type: 'SQL Injection', sourceIp: '203.0.113.101', description: 'Anomalous DB query pattern', severity: ThreatLevel.HIGH },
    { type: 'Zero-Day', sourceIp: '192.0.2.200', description: 'Unrecognized exploit signature', severity: ThreatLevel.CRITICAL },
    { type: 'Brute Force', sourceIp: '198.51.100.5', description: 'Multiple failed login attempts', severity: ThreatLevel.MEDIUM },
];

const SeverityBadge: React.FC<{ severity: ThreatLevel }> = ({ severity }) => {
    const styles = {
        [ThreatLevel.LOW]: 'bg-blue-500/20 text-blue-300',
        [ThreatLevel.MEDIUM]: 'bg-yellow-500/20 text-yellow-300',
        [ThreatLevel.HIGH]: 'bg-orange-500/20 text-orange-300',
        [ThreatLevel.CRITICAL]: 'bg-red-500/20 text-red-300',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[severity]}`}>{severity}</span>;
}

const ThreatFeed: React.FC = () => {
    const [threats, setThreats] = useState<Threat[]>(initialThreats);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomThreat = newThreatsPool[Math.floor(Math.random() * newThreatsPool.length)];
            const newThreat: Threat = {
                ...randomThreat,
                id: Math.random().toString(36).substring(2, 9),
                timestamp: new Date().toISOString(),
            };
            setThreats(prev => [newThreat, ...prev.slice(0, 19)]); // Keep list at max 20 items
        }, 4000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-96 flex flex-col">
      <h3 className="text-sm font-medium text-gray-400 mb-3 flex-shrink-0">Live Threat Feed</h3>
      <div className="overflow-y-auto pr-2 flex-grow">
        <ul className="space-y-3">
          {threats.map(threat => (
            <li key={threat.id} className="text-xs p-2 bg-gray-900/50 rounded-md">
              <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-cyan-400">{threat.type} Attack</p>
                    <p className="text-gray-400">from <span className="text-red-400">{threat.sourceIp}</span></p>
                    <p className="text-gray-500">{threat.description}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                     <SeverityBadge severity={threat.severity} />
                     <p className="text-gray-600">{new Date(threat.timestamp).toLocaleTimeString()}</p>
                  </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThreatFeed;
