import React from 'react';
import { 
  BookmarkPlus, 
  Share2, 
  TrendingUp,
  Instagram,
  Twitter,
  History
} from 'lucide-react';

const stats = [
  { label: 'Total Saved', value: '128', icon: BookmarkPlus, change: '+12.5%' },
  { label: 'Shared Items', value: '38', icon: Share2, change: '+8.2%' },
  { label: 'Views', value: '1,439', icon: TrendingUp, change: '+23.1%' },
];

const recentActivity = [
  {
    id: 1,
    platform: 'instagram',
    action: 'Saved post from @traveler',
    time: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    platform: 'x',
    action: 'Bookmarked thread by @techie',
    time: '5 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1682687220063-4742bd7c8f1b?w=500&auto=format&fit=crop&q=60'
  },
];

export function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your saved content and activity across platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.label}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-900">
              <History className="h-4 w-4 mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="h-10 w-10 rounded-lg overflow-hidden">
                  <img
                    src={activity.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center">
                    {activity.platform === 'instagram' ? (
                      <Instagram className="h-4 w-4 text-pink-500 mr-1" />
                    ) : (
                      <Twitter className="h-4 w-4 text-blue-400 mr-1" />
                    )}
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}