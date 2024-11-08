import React from 'react';
import { Menu, X, BookMarked } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookMarked className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">ufavor</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {isLandingPage ? (
              <>
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                <a href="#platforms" className="text-gray-600 hover:text-gray-900">Platforms</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
                {user ? (
                  <>
                    <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Get Started
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3">
            <div className="flex flex-col space-y-4">
              {isLandingPage ? (
                <>
                  <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                  <a href="#platforms" className="text-gray-600 hover:text-gray-900">Platforms</a>
                  <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
                  {user ? (
                    <>
                      <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                        Dashboard
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                    >
                      Get Started
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}