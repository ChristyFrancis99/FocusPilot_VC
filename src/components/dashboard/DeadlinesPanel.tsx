import { motion } from 'framer-motion';
import { deadlines } from '@/lib/dummyData';
import { Clock, AlertTriangle } from 'lucide-react';

const priorityColors: Record<string, string> = {
  urgent: 'text-destructive',
  high: 'text-warning',
  medium: 'text-primary',
  low: 'text-muted-foreground',
};

export default function DeadlinesPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Upcoming Deadlines</h3>
        <Clock className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {deadlines.map((d, i) => {
          const daysLeft = Math.ceil((new Date(d.date).getTime() - new Date('2026-02-20').getTime()) / 86400000);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
            >
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">{d.task}</p>
                <p className="text-xs text-muted-foreground">{d.project}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {daysLeft <= 2 && <AlertTriangle className="w-3 h-3 text-destructive" />}
                <span className={`text-xs font-mono font-medium ${daysLeft <= 2 ? 'text-destructive' : daysLeft <= 5 ? 'text-warning' : 'text-muted-foreground'}`}>
                  {daysLeft}d
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
