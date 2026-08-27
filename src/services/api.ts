/**
 * API Service Layer
 * Handles all backend communication and data management
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Document API
export const documentApi = {
  async uploadDocument(file: File, caseId?: string): Promise<ApiResponse<any>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (caseId) formData.append('caseId', caseId);

      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id: Math.random().toString(36).substr(2, 9),
              name: file.name,
              type: file.type,
              size: file.size,
              uploadedAt: new Date().toISOString(),
              status: 'pending',
            },
          });
        }, 1500);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to upload document',
      };
    }
  },

  async deleteDocument(documentId: string): Promise<ApiResponse<void>> {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 800);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete document',
      };
    }
  },

  async downloadDocument(documentId: string): Promise<ApiResponse<Blob>> {
    try {
      // Simulate API call and download
      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = new Blob(['Document content'], { type: 'application/pdf' });
          resolve({
            success: true,
            data: blob,
          });
        }, 1000);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to download document',
      };
    }
  },

  async analyzeDocument(documentId: string): Promise<ApiResponse<any>> {
    try {
      // Simulate API call for document analysis
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              documentId,
              status: 'analyzed',
              summary: 'Document analysis completed successfully',
              analyzedAt: new Date().toISOString(),
            },
          });
        }, 2000);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to analyze document',
      };
    }
  },
};

// Cases API
export const caseApi = {
  async getCases(): Promise<ApiResponse<any[]>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: [],
          });
        }, 500);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch cases',
      };
    }
  },

  async getCaseById(caseId: string): Promise<ApiResponse<any>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id: caseId,
              title: 'Sample Case',
              description: 'Case details...',
              status: 'active',
            },
          });
        }, 500);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch case',
      };
    }
  },

  async createCase(caseData: any): Promise<ApiResponse<any>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id: Math.random().toString(36).substr(2, 9),
              ...caseData,
              createdAt: new Date().toISOString(),
            },
          });
        }, 800);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create case',
      };
    }
  },

  async updateCase(caseId: string, caseData: any): Promise<ApiResponse<any>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id: caseId,
              ...caseData,
              updatedAt: new Date().toISOString(),
            },
          });
        }, 800);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update case',
      };
    }
  },
};

// Consultation API
export const consultationApi = {
  async bookConsultation(consultationData: any): Promise<ApiResponse<any>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id: Math.random().toString(36).substr(2, 9),
              ...consultationData,
              status: 'scheduled',
              bookedAt: new Date().toISOString(),
            },
          });
        }, 1000);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to book consultation',
      };
    }
  },

  async getConsultations(): Promise<ApiResponse<any[]>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: [],
          });
        }, 500);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch consultations',
      };
    }
  },

  async cancelConsultation(consultationId: string): Promise<ApiResponse<void>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 800);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to cancel consultation',
      };
    }
  },
};

// Form API - for saved forms
export const formApi = {
  async saveDraft(formId: string, formData: any): Promise<ApiResponse<any>> {
    try {
      localStorage.setItem(`form_draft_${formId}`, JSON.stringify(formData));
      return {
        success: true,
        data: {
          id: formId,
          savedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save form draft',
      };
    }
  },

  async getDraft(formId: string): Promise<ApiResponse<any>> {
    try {
      const draft = localStorage.getItem(`form_draft_${formId}`);
      if (draft) {
        return {
          success: true,
          data: JSON.parse(draft),
        };
      }
      return {
        success: true,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to retrieve form draft',
      };
    }
  },

  async submitForm(formId: string, formData: any): Promise<ApiResponse<any>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.removeItem(`form_draft_${formId}`);
          resolve({
            success: true,
            data: {
              id: formId,
              submittedAt: new Date().toISOString(),
              status: 'submitted',
            },
          });
        }, 1000);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to submit form',
      };
    }
  },
};

// Auth API
export const authApi = {
  async login(email: string, password: string, role: string): Promise<ApiResponse<any>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              token: `token_${Math.random().toString(36).substr(2, 9)}`,
              user: {
                id: '1',
                email,
                role,
                name: email.split('@')[0],
              },
            },
          });
        }, 1200);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to login',
      };
    }
  },

  async register(userData: any): Promise<ApiResponse<any>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              user: {
                id: Math.random().toString(36).substr(2, 9),
                ...userData,
              },
            },
          });
        }, 1500);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to register',
      };
    }
  },
  
  async updateProfile(userId: string, payload: { name?: string; email?: string; avatar?: string; }): Promise<ApiResponse<any>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          // If avatar is a data URL, simulate storing it on server by saving to localStorage
          if (payload.avatar && payload.avatar.startsWith('data:')) {
            try {
              const storeRaw = localStorage.getItem('mock_uploaded_avatars');
              const store = storeRaw ? JSON.parse(storeRaw) : {};
              const id = Math.random().toString(36).substr(2, 9);
              store[id] = payload.avatar;
              localStorage.setItem('mock_uploaded_avatars', JSON.stringify(store));
              // replace avatar with a pseudo-server URL
              payload.avatar = `mock://avatar/${id}`;
            } catch (e) {
              // ignore storage errors
            }
          }

          resolve({
            success: true,
            data: {
              user: {
                id: userId,
                ...payload,
              },
            },
          });
        }, 1000);
      });
    } catch (error) {
      return { success: false, error: 'Failed to update profile' };
    }
  },

  async uploadAvatar(dataUrl: string): Promise<ApiResponse<{ url: string }>> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          try {
            const storeRaw = localStorage.getItem('mock_uploaded_avatars');
            const store = storeRaw ? JSON.parse(storeRaw) : {};
            const id = Math.random().toString(36).substr(2, 9);
            store[id] = dataUrl;
            localStorage.setItem('mock_uploaded_avatars', JSON.stringify(store));
            resolve({ success: true, data: { url: `mock://avatar/${id}` } });
          } catch (e) {
            resolve({ success: false, error: 'Failed to store avatar' });
          }
        }, 800);
      });
    } catch (error) {
      return { success: false, error: 'Failed to upload avatar' };
    }
  },
};
