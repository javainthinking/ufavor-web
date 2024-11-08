import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bookmark, 
  Settings, 
  PlusCircle,
  Instagram,
  Twitter,
  History,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Bookmark, label: 'Collections', path: '/dashboard/collections' },
  { icon: History, label: 'Recent', path: '/dashboard/recent' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
];

export function Sidebar() {
  const { user, signOut } = useAuth();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-semibold">{user?.name?.[0]?.toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-medium text-gray-900 truncate">{user?.name}</h2>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mb-6">
          <PlusCircle className="w-4 h-4" />
          <span>Add Content</span>
        </button>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Connected Accounts
          </h3>
          <div className="space-y-2">
            {user?.connectedPlatforms.includes('instagram') ? (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Instagram className="w-4 h-4" />
                <span>Instagram Connected</span>
              </div>
            ) : null}
            {user?.connectedPlatforms.includes('x') ? (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Twitter className="w-4 h-4" />
                <span>X Connected</span>
              </div>
            ) : null}
          </div>
        </div>

        <button
          onClick={signOut}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}