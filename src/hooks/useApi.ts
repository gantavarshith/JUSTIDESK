import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import { documentApi, caseApi, consultationApi, formApi } from '@/services/api';

/**
 * Hook for managing document operations
 */
export const useDocuments = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const uploadDocument = useCallback(async (file: File, caseId?: string) => {
    setLoading(true);
    try {
      const response = await documentApi.uploadDocument(file, caseId);
      if (response.success && response.data) {
        setDocuments((prev) => [response.data, ...prev]);
        toast({
          title: 'Success',
          description: `Document "${file.name}" uploaded successfully`,
        });
        return response.data;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to upload document',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const deleteDocument = useCallback(async (documentId: string, documentName: string) => {
    setLoading(true);
    try {
      const response = await documentApi.deleteDocument(documentId);
      if (response.success) {
        setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
        toast({
          title: 'Success',
          description: `Document "${documentName}" deleted successfully`,
        });
        return true;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete document',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const downloadDocument = useCallback(async (documentId: string, documentName: string) => {
    setLoading(true);
    try {
      const response = await documentApi.downloadDocument(documentId);
      if (response.success && response.data) {
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement('a');
        a.href = url;
        a.download = documentName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: 'Success',
          description: `Document downloaded successfully`,
        });
        return true;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to download document',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const analyzeDocument = useCallback(async (documentId: string) => {
    setLoading(true);
    try {
      const response = await documentApi.analyzeDocument(documentId);
      if (response.success && response.data) {
        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === documentId
              ? { ...doc, status: 'analyzed', analyzedAt: response.data.analyzedAt }
              : doc
          )
        );
        toast({
          title: 'Success',
          description: 'Document analyzed successfully',
        });
        return response.data;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to analyze document',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    documents,
    setDocuments,
    loading,
    uploadDocument,
    deleteDocument,
    downloadDocument,
    analyzeDocument,
  };
};

/**
 * Hook for managing cases
 */
export const useCases = () => {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createCase = useCallback(async (caseData: any) => {
    setLoading(true);
    try {
      const response = await caseApi.createCase(caseData);
      if (response.success && response.data) {
        setCases((prev) => [response.data, ...prev]);
        toast({
          title: 'Success',
          description: 'Case created successfully',
        });
        return response.data;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to create case',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateCase = useCallback(async (caseId: string, caseData: any) => {
    setLoading(true);
    try {
      const response = await caseApi.updateCase(caseId, caseData);
      if (response.success && response.data) {
        setCases((prev) =>
          prev.map((c) => (c.id === caseId ? response.data : c))
        );
        toast({
          title: 'Success',
          description: 'Case updated successfully',
        });
        return response.data;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to update case',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    cases,
    setCases,
    loading,
    createCase,
    updateCase,
  };
};

/**
 * Hook for managing consultations
 */
export const useConsultations = () => {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const bookConsultation = useCallback(async (consultationData: any) => {
    setLoading(true);
    try {
      const response = await consultationApi.bookConsultation(consultationData);
      if (response.success && response.data) {
        setConsultations((prev) => [response.data, ...prev]);
        toast({
          title: 'Success',
          description: 'Consultation booked successfully',
        });
        return response.data;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to book consultation',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const cancelConsultation = useCallback(async (consultationId: string) => {
    setLoading(true);
    try {
      const response = await consultationApi.cancelConsultation(consultationId);
      if (response.success) {
        setConsultations((prev) =>
          prev.filter((c) => c.id !== consultationId)
        );
        toast({
          title: 'Success',
          description: 'Consultation cancelled successfully',
        });
        return true;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to cancel consultation',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    consultations,
    setConsultations,
    loading,
    bookConsultation,
    cancelConsultation,
  };
};

/**
 * Hook for managing form drafts and submissions
 */
export const useFormDraft = (formId: string) => {
  const [draft, setDraft] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const loadDraft = useCallback(async () => {
    setLoading(true);
    try {
      const response = await formApi.getDraft(formId);
      if (response.success && response.data) {
        setDraft(response.data);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    } finally {
      setLoading(false);
    }
  }, [formId]);

  const saveDraft = useCallback(async (formData: any) => {
    setLoading(true);
    try {
      const response = await formApi.saveDraft(formId, formData);
      if (response.success) {
        setDraft(formData);
        setIsSaved(true);
        toast({
          title: 'Draft Saved',
          description: 'Your form has been saved automatically',
        });
        return true;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to save draft',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [formId, toast]);

  const submitForm = useCallback(async (formData: any) => {
    setLoading(true);
    try {
      const response = await formApi.submitForm(formId, formData);
      if (response.success) {
        setDraft(null);
        setIsSaved(false);
        toast({
          title: 'Success',
          description: 'Form submitted successfully',
        });
        return response.data;
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to submit form',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [formId, toast]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(`form_draft_${formId}`);
    setDraft(null);
    setIsSaved(false);
  }, [formId]);

  return {
    draft,
    loading,
    isSaved,
    loadDraft,
    saveDraft,
    submitForm,
    clearDraft,
  };
};
