import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { z } from 'zod';
import { SocialLoginButton } from './SocialLoginButton';
import { Mail } from 'lucide-react';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export function AuthForm() {
  const { signIn, signUp, signInWithSocial } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
    };

    try {
      const validated = authSchema.parse(data);
      
      if (isSignUp) {
        await signUp(validated.email, validated.password, validated.name || '');
      } else {
        await signIn(validated.email, validated.password);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An error occurred during authentication');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (platform: 'tiktok' | 'instagram') => {
    try {
      setSocialLoading(platform);
      await signInWithSocial(platform);
    } catch (err) {
      setError('Failed to connect with social platform');
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {showEmailForm 
              ? (isSignUp ? 'Create your account' : 'Sign in to your account')
              : 'Welcome to ufavor'}
          </h2>
          {!showEmailForm && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Choose your preferred way to continue
            </p>
          )}
        </div>
        
        {showEmailForm ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={isSignUp}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Your name"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Processing...' : (isSignUp ? 'Sign up' : 'Sign in')}
              </button>
            </div>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="block w-full text-sm text-gray-600 hover:text-gray-500"
              >
                Back to all sign in options
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-4">
            <SocialLoginButton
              platform="google"
              onClick={() => {}}
              loading={socialLoading === 'google'}
            />
            <SocialLoginButton
              platform="x"
              onClick={() => {}}
              loading={socialLoading === 'x'}
            />
            <SocialLoginButton
              platform="xiaohongshu"
              onClick={() => {}}
              loading={socialLoading === 'xiaohongshu'}
            />
            <SocialLoginButton
              platform="tiktok"
              onClick={() => handleSocialLogin('tiktok')}
              loading={socialLoading === 'tiktok'}
            />
            <SocialLoginButton
              platform="instagram"
              onClick={() => handleSocialLogin('instagram')}
              loading={socialLoading === 'instagram'}
            />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-gray-700 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Continue with Email</span>
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center mt-4">{error}</div>
        )}
      </div>
    </div>
  );
}