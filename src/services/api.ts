import { Task, User } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  async fetchTasks(): Promise<Task[]> {
    try {
      await delay(Math.random() * 500 + 300);
      const response = await import('@/data/mockData.json');
      return response.tasks as Task[];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Fetch all users
  async fetchUsers(): Promise<User[]> {
    try {
      await delay(Math.random() * 300 + 200);
      const response = await import('@/data/mockData.json');
      return response.users as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Update task status
  async updateTaskStatus(taskId: string, status: string): Promise<void> {
    try {
      await delay(Math.random() * 200 + 100);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Reorder tasks
  async reorderTasks(tasks: Task[]): Promise<void> {
    try {
      await delay(Math.random() * 200 + 100);
    } catch (error) {
      console.error('Error reordering tasks:', error);
      throw error;
    }
  }
};

export { api };