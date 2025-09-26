
export enum ThreatLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface Threat {
  id: string;
  timestamp: string;
  type: string;
  sourceIp: string;
  description: string;
  severity: ThreatLevel;
}

export interface AutomatedAction {
  id: string;
  timestamp: string;
  action: string;
  target: string;
  status: 'Completed' | 'Failed';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ModelStatus {
    name: string;
    isActive: boolean;
}
