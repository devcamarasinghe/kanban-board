import { Task, TaskStatus } from '@/types';

export function getTasksByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter(task => task.status === status);
}

export function getColumnTitle(status: TaskStatus): string {
  const titles: Record<TaskStatus, string> = {
    'todo': 'To Do',
    'inprogress': 'In Progress',
    'approved': 'Approved',
    'reject': 'Reject'
  };
  return titles[status];
}

export function getColumnColor(status: TaskStatus): string {
  const colors: Record<TaskStatus, string> = {
    'todo': 'bg-gray-500',
    'inprogress': 'bg-yellow-500',
    'approved': 'bg-green-500',
    'reject': 'bg-red-500'
  };
  return colors[status];
}