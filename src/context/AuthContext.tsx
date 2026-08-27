import React, { createContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { authApi } from '@/services/api';

export interface UserProfile extends User {
  phone?: string;
  barNumber?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: { name: string; email: string; phone?: string; password?: string; role: 'citizen' | 'lawyer'; barNumber?: string }) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (payload: { name?: string; email?: string; phone?: string; avatar?: string; barNumber?: string }) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  uploadAvatar: (dataUrl: string) => Promise<{ success: boolean; url?: string; error?: string }>;
  signOut: () => void;
}

const STORAGE_KEY_SESSION = 'justicedesk_session';
const STORAGE_KEY_USERS = 'justicedesk_users';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem(STORAGE_KEY_SESSION);
      if (storedSession) {
        const parsedUser = JSON.parse(storedSession);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save changes to active session
  const saveSession = (userData: UserProfile | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(userData));
      
      // Update in user database list as well
      try {
        const usersRaw = localStorage.getItem(STORAGE_KEY_USERS);
        const usersList: UserProfile[] = usersRaw ? JSON.parse(usersRaw) : [];
        const existingIdx = usersList.findIndex(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (existingIdx >= 0) {
          usersList[existingIdx] = userData;
        } else {
          usersList.push(userData);
        }
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(usersList));
      } catch (e) {}
    } else {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
  };

  const login = async (email: string, password?: string, role: string = 'citizen') => {
    setIsLoading(true);
    try {
      // Check local user database
      const usersRaw = localStorage.getItem(STORAGE_KEY_USERS);
      const usersList: UserProfile[] = usersRaw ? JSON.parse(usersRaw) : [];
      const found = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (found) {
        const updatedUser = { ...found, role: role as any };
        saveSession(updatedUser);
        setIsLoading(false);
        return { success: true };
      }

      // Fallback API call
      const res = await authApi.login(email, password || '', role);
      if (res.success && res.data && res.data.user) {
        const newUser: UserProfile = {
          id: res.data.user.id || Math.random().toString(36).substring(2, 9),
          name: res.data.user.name || email.split('@')[0],
          email: email,
          role: role as any,
        };
        saveSession(newUser);
        setIsLoading(false);
        return { success: true };
      }
      
      setIsLoading(false);
      return { success: false, error: res.error || 'Invalid credentials' };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData: { name: string; email: string; phone?: string; password?: string; role: 'citizen' | 'lawyer'; barNumber?: string }) => {
    setIsLoading(true);
    try {
      const newUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        barNumber: userData.barNumber,
      };

      saveSession(newUser);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'Registration failed' };
    }
  };

  const updateProfile = async (payload: { name?: string; email?: string; phone?: string; avatar?: string; barNumber?: string }) => {
    if (!user) return { success: false, error: 'No active session' };

    const updated: UserProfile = {
      ...user,
      ...payload,
    };

    saveSession(updated);

    // Call API as well
    await authApi.updateProfile(user.id, payload);

    return { success: true, user: updated };
  };

  const uploadAvatar = async (dataUrl: string) => {
    const res = await authApi.uploadAvatar(dataUrl);
    if (res.success && res.data) {
      if (user) {
        updateProfile({ avatar: res.data.url });
      }
      return { success: true, url: res.data.url };
    }
    return { success: false, error: res.error || 'Failed to upload avatar' };
  };

  const signOut = () => {
    saveSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        updateProfile,
        uploadAvatar,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
