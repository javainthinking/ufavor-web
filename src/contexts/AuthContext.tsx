import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Platform } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithSocial: (
    platform: Platform,
    profile?: {
      id: string;
      name: string;
      email: string;
      username: string;
      profileImage?: string;
    }
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('ufavor_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        connectedPlatforms: [],
      };
      
      setUser(mockUser);
      localStorage.setItem('ufavor_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Failed to sign in');
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const mockUser: User = {
        id: '1',
        email,
        name,
        connectedPlatforms: [],
      };
      
      setUser(mockUser);
      localStorage.setItem('ufavor_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Failed to sign up');
    }
  };

  const signInWithSocial = async (
    platform: Platform,
    profile?: {
      id: string;
      name: string;
      email: string;
      username: string;
      profileImage?: string;
    }
  ) => {
    try {
      if (!profile) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        profile = {
          id: Math.random().toString(),
          name: `${platform.charAt(0).toUpperCase() + platform.slice(1)} User`,
          email: `user_${Math.random().toString(36).slice(2)}@${platform}.com`,
          username: `${platform}user${Math.random().toString(36).slice(2)}`,
        };
      }
      
      const mockUser: User = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        avatar: profile.profileImage,
        connectedPlatforms: [platform],
      };
      
      setUser(mockUser);
      localStorage.setItem('ufavor_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error(`Failed to sign in with ${platform}`);
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('ufavor_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, signInWithSocial }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}