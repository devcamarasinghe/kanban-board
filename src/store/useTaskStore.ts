import { create } from 'zustand';
import { Task, User, TaskStatus } from '@/types';
import mockData from '@/data/mockData.json';

interface TaskStore {
  tasks: Task[];
  users: User[];
  searchQuery: string;
  filteredTasks: Task[];
  
  // Actions
  initializeTasks: () => void;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  setSearchQuery: (query: string) => void;
  filterTasks: () => void;
  reorderTasks: (tasks: Task[]) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  users: mockData.users as User[],
  searchQuery: '',
  filteredTasks: [],

  initializeTasks: () => {
    // First try to load from localStorage
    const stored = localStorage.getItem('kanban-tasks');
    if (stored) {
      const parsedTasks = JSON.parse(stored);
      set({ 
        tasks: parsedTasks, 
        filteredTasks: parsedTasks 
      });
    } else {
      // If no localStorage data, use mock data
      const initialTasks = mockData.tasks as Task[];
      set({ 
        tasks: initialTasks, 
        filteredTasks: initialTasks 
      });
      // Save to localStorage
      localStorage.setItem('kanban-tasks', JSON.stringify(initialTasks));
    }
  },

  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      
      // Save to localStorage
      localStorage.setItem('kanban-tasks', JSON.stringify(updatedTasks));
      
      // If there's a search query, filter the updated tasks
      const filtered = state.searchQuery 
        ? updatedTasks.filter(task => 
            task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        : updatedTasks;
      
      return { 
        tasks: updatedTasks,
        filteredTasks: filtered 
      };
    });
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

  reorderTasks: (tasks: Task[]) => {
    set({ tasks, filteredTasks: tasks });
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  },

  saveToLocalStorage: () => {
    const { tasks } = get();
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  },

  loadFromLocalStorage: () => {
    const stored = localStorage.getItem('kanban-tasks');
    if (stored) {
      const tasks = JSON.parse(stored);
      set({ tasks, filteredTasks: tasks });
    }
  },
}));

export default useTaskStore;