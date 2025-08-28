'use client';

import React from 'react';
import { Task, TaskStatus, User } from '@/types';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { getColumnTitle, getColumnColor } from '@/lib/utils';
import { Icons } from '@/components/ui/Icons';

interface BoardColumnProps {
  status: TaskStatus;
  tasks: Task[];
  users: User[];
}

const BoardColumn = ({ status, tasks, users }: BoardColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const columnColor = getColumnColor(status);
  const columnTitle = getColumnTitle(status);

  return (
    <div className="flex-1 min-w-[250px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${columnColor} rounded-full`}></div>
          <h3 className="font-medium text-gray-700">{columnTitle}</h3>
          <span className="text-sm text-gray-500">({tasks.length})</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-colors">
          <span className="text-xl">+</span>
        </button>
      </div>

      {/* Tasks Drop Zone */}
      <div
        ref={setNodeRef}
        className={`min-h-[500px] space-y-3 p-3 rounded-lg transition-all duration-200 ${
          isOver ? 'bg-blue-50 ring-2 ring-blue-300' : 'bg-gray-50'
        }`}
      >
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} users={users} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-sm font-medium">No tasks yet</p>
            <p className="text-xs mt-1">Drag tasks here or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;