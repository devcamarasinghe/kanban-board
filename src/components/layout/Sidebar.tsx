'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  hasNotification?: boolean;
}

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('boards');

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard },
    { id: 'boards', label: 'Boards', icon: Icons.boards, isActive: true },
    { id: 'messages', label: 'Messages', icon: Icons.messages, hasNotification: true },
    { id: 'calendar', label: 'Calendar', icon: Icons.calendar },
    { id: 'team', label: 'Team members', icon: Icons.team },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">B</span>
          </div>
          <span className="font-semibold text-gray-800">Board App</span>
        </div>
      </div>


      <div className="px-4 py-3 border-b border-gray-200">
        <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">RF</span>
            </div>
            <span className="text-sm font-medium">Root folder</span>
          </div>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>


      <nav className="flex-1 px-4 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${item.id === activeItem
                  ? 'bg-gray-100 text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={item.id === activeItem ? 'text-blue-500' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.hasNotification && (
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </nav>


      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <span className="text-gray-500">{Icons.support}</span>
          <span className="text-sm font-medium">Support</span>
        </button>
      </div>


      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 p-3 text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          <span className="text-gray-700">{Icons.logout}</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;