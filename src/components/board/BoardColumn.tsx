'use client';

import React from 'react';
import { Task, TaskStatus, User } from '@/types';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { getColumnTitle, getColumnColor } from '@/lib/utils';

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
    <div className="flex-1 min-w-[280px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-700">{columnTitle}</h3>
          <span className="text-sm text-gray-500">({tasks.length})</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 text-xl">
          +
        </button>
      </div>

      {/* Column Status Bar */}
      <div className={`h-1 ${columnColor} rounded-full mb-4`}></div>

      {/* Tasks Drop Zone */}
      <div
        ref={setNodeRef}
        className={`min-h-[500px] space-y-3 p-2 rounded-lg transition-colors ${
          isOver ? 'bg-blue-50 ring-2 ring-blue-200' : 'bg-gray-50'
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
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No tasks</p>
            <p className="text-xs mt-1">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;