import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { XiaohongshuAuthService } from '../../services/xiaohongshuAuth';

export function XiaohongshuCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInWithSocial } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code || !state) {
          throw new Error('Missing required parameters');
        }

        const { profile } = await XiaohongshuAuthService.handleCallback(code, state);
        await signInWithSocial('xiaohongshu', profile);
        navigate('/dashboard');
      } catch (err) {
        setError('Failed to complete authentication with Xiaohongshu');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, signInWithSocial]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <p className="text-gray-600">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication with Xiaohongshu...</p>
      </div>
    </div>
  );
}