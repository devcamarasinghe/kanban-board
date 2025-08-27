'use client';

import React from 'react';
import { Task, User } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
      case 'medium': return 'text-yellow-500';
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
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
      }`}
    >
      {/* Priority indicator */}
      <div className={`text-xs mb-2 ${getPriorityColor(task.priority)}`}>
        {getPriorityDots(task.priority)}
      </div>

      {/* Task Title */}
      <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
      
      {/* Task Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}

      {/* Assignees */}
      <div className="flex -space-x-2 mb-3">
        {taskUsers.slice(0, 3).map((user) => (
          <div
            key={user.id}
            className="w-7 h-7 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden"
            title={user.name}
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-medium text-gray-700">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
        ))}
        {taskUsers.length > 3 && (
          <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
            <span className="text-xs">+{taskUsers.length - 3}</span>
          </div>
        )}
      </div>

      {/* Task Meta */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          {/* Comments */}
          <div className="flex items-center gap-1">
            <span>💬</span>
            <span>{task.comments}</span>
          </div>
          
          {/* Attachments */}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <span>📎</span>
              <span>{task.attachments}</span>
            </div>
          )}
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <span className="text-gray-400">📅 {task.dueDate}</span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;