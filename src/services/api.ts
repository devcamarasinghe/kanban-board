import { Task, User } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  // Fetch all tasks (simulating GET /api/tasks)
  async fetchTasks(): Promise<Task[]> {
    try {
      // Simulate network delay (300-800ms)
      await delay(Math.random() * 500 + 300);
      
      // Dynamic import to simulate fetching from server
      const response = await import('@/data/mockData.json');
      
      // Simulate potential API errors (commented out for stability)
      // if (Math.random() > 0.95) {
      //   throw new Error('Network error');
      // }
      
      return response.tasks as Task[];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Fetch all users (simulating GET /api/users)
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

  // Update task status (simulating PUT /api/tasks/:id)
  async updateTaskStatus(taskId: string, status: string): Promise<void> {
    try {
      await delay(Math.random() * 200 + 100);
      // In a real API, this would make a PUT request
      console.log(`API: Updated task ${taskId} status to ${status}`);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Reorder tasks (simulating PUT /api/tasks/reorder)
  async reorderTasks(tasks: Task[]): Promise<void> {
    try {
      await delay(Math.random() * 200 + 100);
      // In a real API, this would update the order
      console.log('API: Tasks reordered');
    } catch (error) {
      console.error('Error reordering tasks:', error);
      throw error;
    }
  }
};

export { api };