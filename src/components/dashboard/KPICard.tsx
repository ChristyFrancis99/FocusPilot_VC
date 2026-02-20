import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  glowClass?: string;
  delay?: number;
}

export default function KPICard({ title, value, change, changeType = 'neutral', icon: Icon, glowClass = 'glow-primary', delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card p-5 hover-glow group cursor-default`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        <div className={`w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center ${glowClass} transition-all duration-300 group-hover:scale-110`}>
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-foreground tracking-tight">{value}</span>
        {change && (
          <span className={`text-xs font-medium mb-1 ${
            changeType === 'positive' ? 'text-success' : changeType === 'negative' ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            {change}
          </span>
        )}
      </div>
    </motion.div>
  );
}
