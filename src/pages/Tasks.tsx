import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, Task, TaskStatus, TaskPriority } from '@/stores/appStore';
import { Plus, Trash2, Calendar, Clock, GripVertical } from 'lucide-react';

const statusColumns: { key: TaskStatus; label: string; color: string }[] = [
  { key: 'todo', label: 'To Do', color: 'text-muted-foreground' },
  { key: 'in-progress', label: 'In Progress', color: 'text-primary' },
  { key: 'completed', label: 'Completed', color: 'text-success' },
];

const priorityBadge: Record<TaskPriority, string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-primary/10 text-primary',
  high: 'bg-warning/10 text-warning',
  urgent: 'bg-destructive/10 text-destructive',
};

export default function Tasks() {
  const { tasks, addTask, updateTask, deleteTask } = useAppStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as TaskPriority, deadline: '', estimatedHours: 4, project: '' });

  const handleAdd = () => {
    if (!newTask.title) return;
    addTask({ ...newTask, status: 'todo' });
    setNewTask({ title: '', description: '', priority: 'medium', deadline: '', estimatedHours: 4, project: '' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">{tasks.length} tasks across {new Set(tasks.map(t => t.project)).size} projects</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </motion.div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setShowAdd(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card p-6 w-full max-w-md space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-foreground">New Task</h2>
              <input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary h-20 resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Project name"
                  value={newTask.project}
                  onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                  className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="Est. hours"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask({ ...newTask, estimatedHours: +e.target.value })}
                  className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Create</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {statusColumns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <div className={`w-2 h-2 rounded-full ${col.key === 'todo' ? 'bg-muted-foreground' : col.key === 'in-progress' ? 'bg-primary' : 'bg-success'}`} />
                <span className={`text-sm font-semibold ${col.color}`}>{col.label}</span>
                <span className="text-xs text-muted-foreground ml-auto">{colTasks.length}</span>
              </div>
              <div className="space-y-2 min-h-[200px]">
                <AnimatePresence>
                  {colTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({ task, onUpdate, onDelete }: { task: Task; onUpdate: (id: string, u: Partial<Task>) => void; onDelete: (id: string) => void }) {
  const nextStatus: Record<TaskStatus, TaskStatus> = { 'todo': 'in-progress', 'in-progress': 'completed', 'completed': 'todo' };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card p-4 hover-glow group"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-foreground leading-tight">{task.title}</h4>
        <button onClick={() => onDelete(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive transition-colors" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityBadge[task.priority]}`}>
          {task.priority}
        </span>
        {task.deadline && (
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {task.deadline}
          </span>
        )}
        {task.estimatedHours > 0 && (
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {task.estimatedHours}h
          </span>
        )}
      </div>
      {task.project && (
        <p className="text-[10px] text-primary/70 mt-2 font-medium">{task.project}</p>
      )}
      <button
        onClick={() => onUpdate(task.id, { status: nextStatus[task.status] })}
        className="mt-3 text-[10px] text-primary hover:text-primary/80 font-medium transition-colors"
      >
        Move to {nextStatus[task.status].replace('-', ' ')} →
      </button>
    </motion.div>
  );
}
