'use client';

import Link from 'next/link';
import { Users, Send, Globe, MapPin, Building2, Target, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboard() {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Members': true,
    'National Level': true,
    'State Level': true,
    'District Level': true,
    'Communications': true
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  const navigationItems = [
    {
      href: '/admin/national-committee',
      title: 'Top National Members',
      description: 'Manage national committee members and their details.',
      icon: Users,
      color: 'blue',
      category: 'National Level'
    },
    {
      href: '/admin/rashtriya-parishad',
      title: 'National Council',
      description: 'Manage National Council (राष्ट्रीय परिषद्) members',
      subtitle: 'Total: 545',
      icon: Globe,
      color: 'purple',
      category: 'National Level'
    },
    {
      href: '/admin/rashtriya-kaaryasamiti',
      title: 'National Executive Committee',
      description: 'Manage National Executive Committee (राष्ट्रीय कार्यसमिति) members',
      subtitle: 'Total: 74',
      icon: Building2,
      color: 'orange',
      category: 'National Level'
    },
    {
      href: '/admin/state-committee',
      title: 'State Committee',
      description: 'Manage state presidents and committee members.',
      icon: MapPin,
      color: 'green',
      category: 'State Level'
    },
    {
      href: '/admin/district-committee',
      title: 'District Committee',
      description: 'Manage district committees and their representatives.',
      icon: Target,
      color: 'cyan',
      category: 'District Level'
    },
    {
      href: '/admin/emailing',
      title: 'Email Center',
      description: 'Send targeted emails to members and committees.',
      icon: Send,
      color: 'red',
      category: 'Communications'
    }
  ];

  const colorMap = {
    blue: { bg: 'bg-blue-50', icon: 'bg-blue-100 text-blue-600', hover: 'hover:text-blue-600' },
    purple: { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-600', hover: 'hover:text-purple-600' },
    orange: { bg: 'bg-orange-50', icon: 'bg-orange-100 text-orange-600', hover: 'hover:text-orange-600' },
    green: { bg: 'bg-green-50', icon: 'bg-green-100 text-green-600', hover: 'hover:text-green-600' },
    cyan: { bg: 'bg-cyan-50', icon: 'bg-cyan-100 text-cyan-600', hover: 'hover:text-cyan-600' },
    red: { bg: 'bg-red-50', icon: 'bg-red-100 text-red-600', hover: 'hover:text-red-600' }
  };

  const categories = ['National Level', 'State Level', 'District Level', 'Communications'];

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage committees and communications across all organizational levels</p>
      </div>

      <div className="mb-10">
        <button 
          onClick={() => toggleCategory('Members')}
          className="w-full flex items-center gap-3 mb-4 hover:opacity-70 transition-opacity"
        >
          <div className="h-1 w-6 bg-blue-600 rounded"></div>
          <h2 className="text-lg font-bold text-gray-800">
            Members
          </h2>
          <ChevronDown 
            className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${expandedCategories['Members'] ? 'rotate-0' : '-rotate-90'}`}
          />
        </button>

        {expandedCategories['Members'] && (
          <div className="space-y-8 ml-2">
            {['National Level', 'State Level', 'District Level'].map((category) => {
              const categoryItems = navigationItems.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;

              const isExpanded = expandedCategories[category];

              return (
                <div key={category}>
                  <button 
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center gap-3 mb-3 hover:opacity-70 transition-opacity"
                  >
                    <div className="h-0.5 w-4 bg-gray-400 rounded"></div>
                    <h3 className="text-base font-semibold text-gray-700">
                      {category}
                    </h3>
                    <ChevronDown 
                      className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {categoryItems.map((item) => {
                        const Icon = item.icon;
                        const colors = colorMap[item.color as keyof typeof colorMap];

                        return (
                          <Link key={item.href} href={item.href} className="block group">
                            <div className={`${colors.bg} p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full hover:border-gray-300`}>
                              <div className="flex items-start justify-between mb-4">
                                <div className={`${colors.icon} p-3 rounded-lg transition-transform group-hover:scale-110`}>
                                  <Icon className="h-6 w-6" />
                                </div>
                              </div>
                              <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                              {item.subtitle && (
                                <div className="inline-block bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                                  {item.subtitle}
                                </div>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mb-10">
        <button 
          onClick={() => toggleCategory('Communications')}
          className="w-full flex items-center gap-3 mb-4 hover:opacity-70 transition-opacity"
        >
          <div className="h-1 w-6 bg-blue-600 rounded"></div>
          <h2 className="text-lg font-bold text-gray-800">
            Communications
          </h2>
          <ChevronDown 
            className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${expandedCategories['Communications'] ? 'rotate-0' : '-rotate-90'}`}
          />
        </button>

        {expandedCategories['Communications'] && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {navigationItems.filter(item => item.category === 'Communications').map((item) => {
              const Icon = item.icon;
              const colors = colorMap[item.color as keyof typeof colorMap];

              return (
                <Link key={item.href} href={item.href} className="block group">
                  <div className={`${colors.bg} p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full hover:border-gray-300`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${colors.icon} p-3 rounded-lg transition-transform group-hover:scale-110`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    {item.subtitle && (
                      <div className="inline-block bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
