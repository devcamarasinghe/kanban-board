export type TaskStatus = 'todo' | 'inprogress' | 'approved' | 'reject';

export type Priority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignees: string[]; // Array of user IDs
  priority: Priority;
  comments: number;
  attachments: number;
  dueDate?: string;
  createdAt: string;
}

export interface Board {
  id: string;
  title: string;
  tasks: Task[];
}