import { Platform } from '../types';

const XHS_CLIENT_ID = 'your-xiaohongshu-client-id';
const REDIRECT_URI = `${window.location.origin}/auth/callback/xiaohongshu`;

export class XiaohongshuAuthService {
  static generateState() {
    return Math.random().toString(36).substring(7);
  }

  static getAuthUrl() {
    const state = this.generateState();
    localStorage.setItem('xhs_auth_state', state);
    
    const params = new URLSearchParams({
      client_id: XHS_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      state,
      response_type: 'code',
      scope: 'user_info notes.read',
    });

    return `https://oauth.xiaohongshu.com/authorize?${params.toString()}`;
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
    const savedState = localStorage.getItem('xhs_auth_state');
    if (!state || state !== savedState) {
      throw new Error('Invalid state parameter');
    }
    
    // Mock implementation for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      accessToken: 'mock_xhs_access_token',
      profile: {
        id: 'xhs_123456',
        name: 'XHS User',
        email: 'user@xiaohongshu.com',
        username: 'xhsuser',
        profileImage: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format&fit=crop&q=60',
      }
    };
  }
}