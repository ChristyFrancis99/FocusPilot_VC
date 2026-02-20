import { motion } from 'framer-motion';
import { Bot, Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';
import { burnoutIndicators } from '@/lib/dummyData';

const insights = [
  { icon: Sparkles, text: 'Your focus peaks on Tuesdays & Fridays. Schedule deep work then.', type: 'tip' },
  { icon: AlertTriangle, text: `${burnoutIndicators.lateNightSessions} late-night sessions detected. Consider earlier starts.`, type: 'warning' },
  { icon: Lightbulb, text: 'API integration task overlaps with redesign. Stagger deadlines by 2 days.', type: 'tip' },
];

const riskColor = {
  low: 'text-success',
  moderate: 'text-warning',
  high: 'text-destructive',
};

export default function AIInsightsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="glass-card p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-[10px] text-muted-foreground font-mono">LIVE</span>
        </div>
      </div>

      {/* Burnout Risk */}
      <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Burnout Risk</span>
          <span className={`text-xs font-semibold uppercase ${riskColor[burnoutIndicators.riskLevel]}`}>
            {burnoutIndicators.riskLevel}
          </span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '55%' }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-full bg-warning rounded-full"
          />
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex items-start gap-2.5"
          >
            <insight.icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${insight.type === 'warning' ? 'text-warning' : 'text-primary'}`} />
            <p className="text-xs text-muted-foreground leading-relaxed">{insight.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
