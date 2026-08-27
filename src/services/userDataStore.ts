import { Case, Document, ActivityItem } from '@/types';

export interface ConsultationItem {
  id: string;
  title: string;
  advocateName: string;
  advocatePhone: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'online' | 'physical';
  caseId?: string;
}

export interface SavedFormItem {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'submitted';
  lastModified: string;
  data?: any;
}

const getKey = (type: string, userId: string) => `justicedesk_user_${type}_${userId || 'default'}`;

export const userDataStore = {
  // Cases
  getCases(userId: string): Case[] {
    try {
      const raw = localStorage.getItem(getKey('cases', userId));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveCases(userId: string, cases: Case[]) {
    try {
      localStorage.setItem(getKey('cases', userId), JSON.stringify(cases));
    } catch {}
  },

  addCase(userId: string, caseData: Partial<Case>): Case {
    const cases = this.getCases(userId);
    const newCase: Case = {
      id: caseData.id || Math.random().toString(36).substring(2, 9),
      title: caseData.title || 'Untitled Case',
      type: caseData.type || 'General',
      status: (caseData.status as any) || 'active',
      description: caseData.description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newCase, ...cases];
    this.saveCases(userId, updated);

    // Add activity
    this.addActivity(userId, {
      type: 'case_update',
      title: 'New Case Created',
      description: `Case "${newCase.title}" was opened.`,
      timestamp: new Date().toISOString(),
      caseId: newCase.id,
    });

    return newCase;
  },

  // Documents
  getDocuments(userId: string): Document[] {
    try {
      const raw = localStorage.getItem(getKey('documents', userId));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveDocuments(userId: string, docs: Document[]) {
    try {
      localStorage.setItem(getKey('documents', userId), JSON.stringify(docs));
    } catch {}
  },

  addDocument(userId: string, docData: Partial<Document>): Document {
    const docs = this.getDocuments(userId);
    const newDoc: Document = {
      id: docData.id || Math.random().toString(36).substring(2, 9),
      name: docData.name || 'Document.pdf',
      type: docData.type || 'Legal Document',
      analyzedAt: docData.analyzedAt || '',
      status: docData.status || 'pending',
      summary: docData.summary || '',
    };
    const updated = [newDoc, ...docs];
    this.saveDocuments(userId, updated);

    // Add activity
    this.addActivity(userId, {
      type: 'document_analysis',
      title: 'Document Uploaded',
      description: `Uploaded "${newDoc.name}" for analysis.`,
      timestamp: new Date().toISOString(),
      documentId: newDoc.id,
    });

    return newDoc;
  },

  // Consultations
  getConsultations(userId: string): ConsultationItem[] {
    try {
      const raw = localStorage.getItem(getKey('consultations', userId));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveConsultations(userId: string, consultations: ConsultationItem[]) {
    try {
      localStorage.setItem(getKey('consultations', userId), JSON.stringify(consultations));
    } catch {}
  },

  addConsultation(userId: string, item: Partial<ConsultationItem>): ConsultationItem {
    const consultations = this.getConsultations(userId);
    const newConsultation: ConsultationItem = {
      id: item.id || Math.random().toString(36).substring(2, 9),
      title: item.title || 'Legal Consultation',
      advocateName: item.advocateName || 'Advocate',
      advocatePhone: item.advocatePhone || '',
      date: item.date || new Date().toISOString().slice(0, 10),
      time: item.time || '10:00 AM',
      status: item.status || 'scheduled',
      type: item.type || 'online',
    };
    const updated = [newConsultation, ...consultations];
    this.saveConsultations(userId, updated);
    return newConsultation;
  },

  // Saved Forms
  getForms(userId: string): SavedFormItem[] {
    try {
      const raw = localStorage.getItem(getKey('forms', userId));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveForms(userId: string, forms: SavedFormItem[]) {
    try {
      localStorage.setItem(getKey('forms', userId), JSON.stringify(forms));
    } catch {}
  },

  addForm(userId: string, item: Partial<SavedFormItem>): SavedFormItem {
    const forms = this.getForms(userId);
    const newForm: SavedFormItem = {
      id: item.id || Math.random().toString(36).substring(2, 9),
      title: item.title || 'New Form',
      type: item.type || 'Legal Form',
      status: item.status || 'draft',
      lastModified: new Date().toISOString(),
      data: item.data || '',
    };
    const updated = [newForm, ...forms];
    this.saveForms(userId, updated);
    return newForm;
  },

  // Activities
  getActivities(userId: string): ActivityItem[] {
    try {
      const raw = localStorage.getItem(getKey('activities', userId));
      return raw ? JSON.parse(raw) : [
        {
          id: 'welcome',
          type: 'system',
          title: 'Welcome to JusticeDesk',
          description: 'Your account is active and secure.',
          timestamp: new Date().toISOString(),
        }
      ];
    } catch {
      return [];
    }
  },

  addActivity(userId: string, activity: Partial<ActivityItem>) {
    const list = this.getActivities(userId);
    const newAct: ActivityItem = {
      id: activity.id || Math.random().toString(36).substring(2, 9),
      type: activity.type || 'system',
      title: activity.title || 'Activity',
      description: activity.description || '',
      timestamp: activity.timestamp || new Date().toISOString(),
      caseId: activity.caseId,
      documentId: activity.documentId,
    };
    const updated = [newAct, ...list];
    try {
      localStorage.setItem(getKey('activities', userId), JSON.stringify(updated));
    } catch {}
    return newAct;
  },
};
