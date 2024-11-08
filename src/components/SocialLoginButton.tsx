import React from 'react';
import { Twitter, Instagram } from 'lucide-react';
import { XAuthService } from '../services/xAuth';
import { XiaohongshuAuthService } from '../services/xiaohongshuAuth';
import { GoogleAuthService } from '../services/googleAuth';

interface SocialLoginButtonProps {
  platform: 'x' | 'tiktok' | 'instagram' | 'xiaohongshu' | 'google';
  onClick: () => void;
  loading?: boolean;
}

export function SocialLoginButton({ platform, onClick, loading }: SocialLoginButtonProps) {
  const handleClick = () => {
    switch (platform) {
      case 'x':
        window.location.href = XAuthService.getAuthUrl();
        return;
      case 'xiaohongshu':
        window.location.href = XiaohongshuAuthService.getAuthUrl();
        return;
      case 'google':
        window.location.href = GoogleAuthService.getAuthUrl();
        return;
      default:
        onClick();
    }
  };

  const getPlatformStyles = () => {
    switch (platform) {
      case 'x':
        return {
          icon: <Twitter className="w-5 h-5" />,
          text: 'Continue with X',
          className: 'bg-black hover:bg-gray-800'
        };
      case 'tiktok':
        return {
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
            </svg>
          ),
          text: 'Continue with TikTok',
          className: 'bg-[#010101] hover:bg-gray-900'
        };
      case 'instagram':
        return {
          icon: <Instagram className="w-5 h-5" />,
          text: 'Continue with Instagram',
          className: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90'
        };
      case 'xiaohongshu':
        return {
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          ),
          text: 'Continue with Xiaohongshu',
          className: 'bg-red-600 hover:bg-red-700'
        };
      case 'google':
        return {
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          ),
          text: 'Continue with Google',
          className: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        };
    }
  };

  const styles = getPlatformStyles();

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${styles.className} w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50`}
    >
      {styles.icon}
      <span>{loading ? 'Connecting...' : styles.text}</span>
    </button>
  );
}