import { create } from 'zustand';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline: string;
  estimatedHours: number;
  project: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AppState {
  tasks: Task[];
  chatMessages: ChatMessage[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
}

const dummyTasks: Task[] = [
  { id: '1', title: 'Redesign landing page', description: 'Complete redesign with new brand guidelines', priority: 'high', status: 'in-progress', deadline: '2026-02-25', estimatedHours: 12, project: 'ClientX Website', createdAt: '2026-02-15' },
  { id: '2', title: 'Build API integration', description: 'Connect payment gateway endpoints', priority: 'urgent', status: 'todo', deadline: '2026-02-22', estimatedHours: 8, project: 'E-commerce App', createdAt: '2026-02-14' },
  { id: '3', title: 'Write documentation', description: 'API docs for developer portal', priority: 'medium', status: 'todo', deadline: '2026-02-28', estimatedHours: 5, project: 'DevPortal', createdAt: '2026-02-16' },
  { id: '4', title: 'Fix mobile nav bug', description: 'Navigation drawer not closing on route change', priority: 'high', status: 'in-progress', deadline: '2026-02-21', estimatedHours: 2, project: 'ClientX Website', createdAt: '2026-02-17' },
  { id: '5', title: 'Design system audit', description: 'Review and update component library', priority: 'low', status: 'completed', deadline: '2026-02-18', estimatedHours: 6, project: 'Internal Tools', createdAt: '2026-02-10' },
  { id: '6', title: 'User onboarding flow', description: 'Create onboarding wizard for new users', priority: 'high', status: 'todo', deadline: '2026-02-27', estimatedHours: 15, project: 'E-commerce App', createdAt: '2026-02-13' },
  { id: '7', title: 'Performance optimization', description: 'Reduce bundle size and improve LCP', priority: 'medium', status: 'completed', deadline: '2026-02-19', estimatedHours: 4, project: 'ClientX Website', createdAt: '2026-02-12' },
  { id: '8', title: 'Email template design', description: 'Transactional email templates', priority: 'low', status: 'todo', deadline: '2026-03-05', estimatedHours: 3, project: 'E-commerce App', createdAt: '2026-02-18' },
];

export const useAppStore = create<AppState>((set) => ({
  tasks: dummyTasks,
  chatMessages: [],
  addTask: (task) => set((s) => ({
    tasks: [...s.tasks, { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString().split('T')[0] }],
  })),
  updateTask: (id, updates) => set((s) => ({
    tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
  })),
  deleteTask: (id) => set((s) => ({
    tasks: s.tasks.filter((t) => t.id !== id),
  })),
  addChatMessage: (msg) => set((s) => ({
    chatMessages: [...s.chatMessages, { ...msg, id: crypto.randomUUID(), timestamp: new Date().toISOString() }],
  })),
}));
