import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { monthlyEarnings } from '@/lib/dummyData';

export default function EarningsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Earnings vs. Effort</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={monthlyEarnings} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 11 }} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(240, 8%, 7%)',
                border: '1px solid hsl(240, 5%, 16%)',
                borderRadius: '8px',
                fontSize: 12,
                color: 'hsl(210, 20%, 92%)',
              }}
            />
            <Bar yAxisId="left" dataKey="earnings" fill="hsl(190, 100%, 50%)" radius={[4, 4, 0, 0]} opacity={0.7} name="Earnings ($)" />
            <Line yAxisId="right" type="monotone" dataKey="hours" stroke="hsl(270, 80%, 65%)" strokeWidth={2} dot={{ fill: 'hsl(270, 80%, 65%)', r: 3 }} name="Hours" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
