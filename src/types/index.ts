export type UserRole = 'citizen' | 'lawyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Case {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'resolved' | 'closed';
  type: string;
  createdAt: string;
  updatedAt: string;
  lawyerId?: string;
  description?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  analyzedAt: string;
  summary?: string;
  status: 'pending' | 'analyzed' | 'error';
}

export interface RightsCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  rights: Right[];
}

export interface Right {
  id: string;
  title: string;
  explanation: string;
  relatedActs?: string[];
  category: string;
}

export interface ActivityItem {
  id: string;
  type: 'case_update' | 'document_analysis' | 'message' | 'system';
  title: string;
  description: string;
  timestamp: string;
  caseId?: string;
  documentId?: string;
}

export interface SituationStep {
  id: string;
  question: string;
  options: SituationOption[];
}

export interface SituationOption {
  id: string;
  label: string;
  nextStepId?: string;
  advice?: string;
}
