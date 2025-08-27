'use client';

import React from 'react';
import useTaskStore from '@/store/useTaskStore';
import { Icons } from '@/components/ui/Icons';

const Header = () => {
  const { setSearchQuery, searchQuery } = useTaskStore();

  const assignedUsers = [
    { id: 1, initial: 'JD', color: 'bg-blue-500' },
    { id: 2, initial: 'SS', color: 'bg-green-500' },
    { id: 3, initial: 'MJ', color: 'bg-purple-500' },
    { id: 4, initial: 'EC', color: 'bg-pink-500' },
  ];

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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md">
            {Icons.plus}
            <span className="text-sm font-medium">Create new board</span>
          </button>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {Icons.search}
            </span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            {Icons.bell}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 pr-3 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="flex items-center gap-6 mt-4">
        <span className="text-sm text-gray-600 font-medium">Board Production</span>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Assigned</span>
          <div className="flex -space-x-2">
            {assignedUsers.map((user) => (
              <div
                key={user.id}
                className={`w-6 h-6 ${user.color} rounded-full border-2 border-white flex items-center justify-center`}
              >
                <span className="text-xs text-white font-medium">{user.initial}</span>
              </div>
            ))}
            <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs text-gray-600">+4</span>
            </div>
          </div>
        </div>
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
          <span>Manage</span>
          <span>→</span>
        </button>
      </div>

      {/* Date */}
      <div className="text-xs text-gray-400 mt-2">
        Last updated on 04 April, 2023
      </div>
    </header>
  );
};

export default Header;