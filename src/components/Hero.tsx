import React from 'react';
import { Bookmark, Share2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartCollecting = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            All Your Favorites,
            <span className="text-indigo-600"> One Place</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Aggregate and manage your favorite content from multiple platforms. Never lose track of what matters to you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleStartCollecting}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors transform hover:scale-105 duration-200 shadow-lg hover:shadow-xl"
            >
              Start Collecting
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors transform hover:scale-105 duration-200">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <Bookmark className="h-8 w-8 mb-4 mx-auto text-indigo-600" />,
              title: "Unified Collection",
              description: "Save content from multiple platforms in one organized space"
            },
            {
              icon: <Search className="h-8 w-8 mb-4 mx-auto text-indigo-600" />,
              title: "Smart Search",
              description: "Find any saved content instantly with powerful search features"
            },
            {
              icon: <Share2 className="h-8 w-8 mb-4 mx-auto text-indigo-600" />,
              title: "Easy Sharing",
              description: "Share your collections with friends across any platform"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}