'use client';

import React from 'react';
import { Task, User } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icons } from '@/components/ui/Icons';

interface TaskCardProps {
  task: Task;
  users: User[];
}

const TaskCard = ({ task, users }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const taskUsers = users.filter(user => task.assignees.includes(user.id));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-orange-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityDots = (priority: string) => {
    switch (priority) {
      case 'high': return '● ● ●';
      case 'medium': return '● ●';
      case 'low': return '●';
      default: return '●';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-move hover:shadow-md transition-all duration-200 ${isDragging ? 'shadow-xl ring-2 ring-blue-400 ring-opacity-50 scale-105' : ''
        }`}
    >

      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-400 mb-1">
          Status: {task.status}
        </div>
      )}

      {/* Task Priority indicator */}
      <div className={`text-xs mb-2 ${getPriorityColor(task.priority)}`}>
        {getPriorityDots(task.priority)}
      </div>

      <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Assignees */}
      {taskUsers.length > 0 && (
        <div className="flex -space-x-2 mb-3">
          {taskUsers.slice(0, 3).map((user) => (
            <div
              key={user.id}
              className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center overflow-hidden hover:z-10 hover:scale-110 transition-transform"
              title={user.name}
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-medium text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
          ))}
          {taskUsers.length > 3 && (
            <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-xs font-medium text-gray-600">+{taskUsers.length - 3}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">

          <div className="flex items-center gap-1">
            <span className="text-gray-400">{Icons.comment}</span>
            <span>{task.comments}</span>
          </div>

          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-gray-400">{Icons.attachment}</span>
              <span>{task.attachments}</span>
            </div>
          )}
        </div>

        {task.dueDate && (
          <span className="text-gray-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" strokeWidth="2" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
            </svg>
            <span>{task.dueDate}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;