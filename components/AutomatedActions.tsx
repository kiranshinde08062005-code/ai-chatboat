
import React, { useState, useEffect } from 'react';
import type { AutomatedAction } from '../types';
import { ShieldCheck, ShieldOff } from 'lucide-react';

const initialActions: AutomatedAction[] = [
  { id: '1', timestamp: new Date().toISOString(), action: 'BLOCK_IP', target: '198.51.100.12', status: 'Completed' },
  { id: '2', timestamp: new Date().toISOString(), action: 'ISOLATE_DEVICE', target: 'workstation-05', status: 'Completed' },
];

const newActionsPool: Omit<AutomatedAction, 'id' | 'timestamp'>[] = [
    { action: 'BLOCK_IP', target: '203.0.113.101', status: 'Completed' },
    { action: 'UPDATE_FIREWALL', target: 'Rule #4815', status: 'Completed' },
    { action: 'SCAN_ENDPOINT', target: 'server-db-01', status: 'Completed' },
    { action: 'QUARANTINE_FILE', target: 'e4a2...b8f1.dll', status: 'Completed' },
];


const AutomatedActions: React.FC = () => {
    const [actions, setActions] = useState<AutomatedAction[]>(initialActions);

     useEffect(() => {
        const interval = setInterval(() => {
            const randomAction = newActionsPool[Math.floor(Math.random() * newActionsPool.length)];
            const newAction: AutomatedAction = {
                ...randomAction,
                id: Math.random().toString(36).substring(2, 9),
                timestamp: new Date().toISOString(),
            };
            setActions(prev => [newAction, ...prev.slice(0, 19)]); // Keep list at max 20 items
        }, 7000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-96 flex flex-col">
      <h3 className="text-sm font-medium text-gray-400 mb-3 flex-shrink-0">Automated Response Log</h3>
      <div className="overflow-y-auto pr-2 flex-grow">
        <ul className="space-y-2">
          {actions.map(action => (
            <li key={action.id} className="flex items-center space-x-3 text-xs">
                {action.status === 'Completed' ? <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" /> : <ShieldOff className="w-4 h-4 text-red-500 flex-shrink-0" />}
                <span className="text-gray-500">{new Date(action.timestamp).toLocaleTimeString()}</span>
                <span className="font-semibold text-gray-300">{action.action}</span>
                <span className="text-yellow-400 truncate">{action.target}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AutomatedActions;
