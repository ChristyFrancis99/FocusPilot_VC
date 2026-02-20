import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklyHours } from '@/lib/dummyData';

export default function FocusChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Focus Hours This Week</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyHours} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(270, 80%, 65%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(270, 80%, 65%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(240, 8%, 7%)',
                border: '1px solid hsl(240, 5%, 16%)',
                borderRadius: '8px',
                fontSize: 12,
                color: 'hsl(210, 20%, 92%)',
              }}
            />
            <Area type="monotone" dataKey="hours" stroke="hsl(270, 80%, 65%)" fill="url(#hoursGrad)" strokeWidth={2} name="Total" />
            <Area type="monotone" dataKey="focus" stroke="hsl(190, 100%, 50%)" fill="url(#focusGrad)" strokeWidth={2} name="Focus" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
