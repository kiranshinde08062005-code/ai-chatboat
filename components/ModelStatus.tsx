
import React from 'react';
import type { ModelStatus as ModelStatusType } from '../types';

const models: ModelStatusType[] = [
  { name: 'Random Forest', isActive: true },
  { name: 'XGBoost', isActive: true },
  { name: 'LSTM', isActive: true },
  { name: 'CNN', isActive: true },
];

const ModelStatus: React.FC = () => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-full">
      <h3 className="text-sm font-medium text-gray-400 mb-3">AI MODEL STATUS</h3>
      <div className="space-y-2">
        {models.map(model => (
          <div key={model.name} className="flex items-center justify-between text-xs">
            <span>{model.name}</span>
            <div className="flex items-center space-x-2">
              <span className={model.isActive ? 'text-green-400' : 'text-red-400'}>
                {model.isActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
              <div className={`w-2 h-2 rounded-full ${model.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelStatus;
