import { create } from 'zustand';
import { Task, User, TaskStatus } from '@/types';
import { api } from '@/services';

interface TaskStore {
  tasks: Task[];
  users: User[];
  searchQuery: string;
  filteredTasks: Task[];
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;

  initializeTasks: () => Promise<void>;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  setSearchQuery: (query: string) => void;
  filterTasks: () => void;
  reorderTasks: (tasks: Task[]) => Promise<void>;
}

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  users: [],
  searchQuery: '',
  filteredTasks: [],
  isLoading: false,
  error: null,
  isInitialized: false,

  initializeTasks: async () => {
    if (get().isInitialized) return;

    set({ isLoading: true, error: null });

    try {
      const cachedTasks = typeof window !== 'undefined'
        ? localStorage.getItem('kanban-tasks')
        : null;

      if (cachedTasks) {
        const parsed = JSON.parse(cachedTasks);
        set({
          tasks: parsed,
          filteredTasks: parsed,
          isInitialized: true
        });
      }

      const [fetchedTasks, fetchedUsers] = await Promise.all([
        api.fetchTasks(),
        api.fetchUsers()
      ]);

      const tasksToUse = cachedTasks ? JSON.parse(cachedTasks) : fetchedTasks;

      set({
        tasks: tasksToUse,
        users: fetchedUsers,
        filteredTasks: tasksToUse,
        isLoading: false,
        isInitialized: true
      });

      if (typeof window !== 'undefined' && !cachedTasks) {
        localStorage.setItem('kanban-tasks', JSON.stringify(fetchedTasks));
      }
    } catch (error) {
      set({
        error: 'Failed to load tasks. Please refresh the page.',
        isLoading: false
      });
      console.error('Failed to initialize tasks:', error);
    }
  },

  updateTaskStatus: async (taskId: string, newStatus: TaskStatus) => {
    const previousTasks = get().tasks;

    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );

      const filtered = state.searchQuery
        ? updatedTasks.filter(task =>
          task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
        : updatedTasks;

      if (typeof window !== 'undefined') {
        localStorage.setItem('kanban-tasks', JSON.stringify(updatedTasks));
      }

      return {
        tasks: updatedTasks,
        filteredTasks: filtered
      };
    });

    try {
      await api.updateTaskStatus(taskId, newStatus);
    } catch (error) {
      set((state) => ({
        tasks: previousTasks,
        filteredTasks: state.searchQuery
          ? previousTasks.filter(task =>
            task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
          : previousTasks,
        error: 'Failed to update task status'
      }));
      console.error('Failed to update task status:', error);
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().filterTasks();
  },

  filterTasks: () => {
    set((state) => {
      if (!state.searchQuery) {
        return { filteredTasks: state.tasks };
      }

      const filtered = state.tasks.filter((task) =>
        task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(state.searchQuery.toLowerCase())
      );

      return { filteredTasks: filtered };
    });
  },

  reorderTasks: async (tasks: Task[]) => {
    const previousTasks = get().tasks;

    set({ tasks, filteredTasks: tasks });

    if (typeof window !== 'undefined') {
      localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
    }

    try {
      await api.reorderTasks(tasks);
    } catch (error) {
      set({
        tasks: previousTasks,
        filteredTasks: previousTasks,
        error: 'Failed to reorder tasks'
      });
      console.error('Failed to reorder tasks:', error);
    }
  },
}));

export default useTaskStore;