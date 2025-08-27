'use client';

import React from 'react';
import useTaskStore from '@/store/useTaskStore';

const Header = () => {
  const { setSearchQuery, searchQuery } = useTaskStore();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Project Info */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Sport XI Project</h1>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
            In progress
          </span>
        </div>

        {/* Right side - Search and Actions */}
        <div className="flex items-center gap-4">
          {/* Create new board button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <span className="text-lg">+</span>
            <span className="text-sm font-medium">Create new board</span>
          </button>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <span className="text-xl">🔔</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="flex items-center gap-6 mt-4">
        <span className="text-sm text-gray-600">Board Production</span>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <span>Assigned</span>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"
              />
            ))}
            <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs">+4</span>
            </div>
          </div>
        </div>
        <button className="text-sm text-gray-400 hover:text-gray-600">Manage →</button>
      </div>

      {/* Date */}
      <div className="text-xs text-gray-400 mt-2">
        Last updated on 04 April, 2023
      </div>
    </header>
  );
};

export default Header;