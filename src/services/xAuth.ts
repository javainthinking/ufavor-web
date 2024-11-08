import { Platform } from '../types';

const X_CLIENT_ID = 'your-x-client-id';
const REDIRECT_URI = `${window.location.origin}/auth/callback/x`;

export class XAuthService {
  static generateState() {
    return Math.random().toString(36).substring(7);
  }

  static getAuthUrl() {
    const state = this.generateState();
    localStorage.setItem('x_auth_state', state);
    
    const params = new URLSearchParams({
      client_id: X_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      state,
      response_type: 'code',
      scope: 'tweet.read users.read bookmark.read',
    });

    return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
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
    const savedState = localStorage.getItem('x_auth_state');
    if (!state || state !== savedState) {
      throw new Error('Invalid state parameter');
    }
    
    // In a real implementation, exchange the code for tokens
    // This is a mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      accessToken: 'mock_access_token',
      profile: {
        id: '123456',
        name: 'X User',
        email: 'user@x.com',
        username: 'xuser',
        profileImage: 'https://images.unsplash.com/photo-1683009427666-340595e57e43?w=500&auto=format&fit=crop&q=60',
      }
    };
  }
}