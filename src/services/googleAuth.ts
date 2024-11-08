import { Platform } from '../types';

const GOOGLE_CLIENT_ID = 'your-google-client-id';
const REDIRECT_URI = `${window.location.origin}/auth/callback/google`;

export class GoogleAuthService {
  static generateState() {
    return Math.random().toString(36).substring(7);
  }

  static getAuthUrl() {
    const state = this.generateState();
    localStorage.setItem('google_auth_state', state);
    
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      state,
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  static async handleCallback(code: string, state: string): Promise<{ 
    accessToken: string;
    profile: { 
      id: string;
      name: string;
      email: string;
      username: string;
      profileImage?: string;
    };
  }> {
    const savedState = localStorage.getItem('google_auth_state');
    if (!state || state !== savedState) {
      throw new Error('Invalid state parameter');
    }
    
    // Mock implementation for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      accessToken: 'mock_google_access_token',
      profile: {
        id: 'google_123456',
        name: 'Google User',
        email: 'user@gmail.com',
        username: 'googleuser',
        profileImage: 'https://images.unsplash.com/photo-1683009427666-340595e57e43?w=500&auto=format&fit=crop&q=60',
      }
    };
  }
}