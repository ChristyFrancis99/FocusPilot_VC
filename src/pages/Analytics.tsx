import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart,
} from 'recharts';
import { weeklyHours, focusTrend, completionRate, monthlyEarnings } from '@/lib/dummyData';

const tooltipStyle = {
  backgroundColor: 'hsl(240, 8%, 7%)',
  border: '1px solid hsl(240, 5%, 16%)',
  borderRadius: '8px',
  fontSize: 12,
  color: 'hsl(210, 20%, 92%)',
};

function ChartCard({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-56">{children}</div>
    </motion.div>
  );
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Deep dive into your productivity patterns</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Work Hours by Day" delay={0.1}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyHours}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,15%,50%)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,15%,50%)', fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="hours" fill="hsl(190,100%,50%)" radius={[4,4,0,0]} opacity={0.8} name="Hours" />
              <Bar dataKey="focus" fill="hsl(270,80%,65%)" radius={[4,4,0,0]} opacity={0.6} name="Focus" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Focus Trend (8 Weeks)" delay={0.15}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={focusTrend}>
              <defs>
                <linearGradient id="focusTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(190,100%,50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(190,100%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,15%,50%)', fontSize: 11 }} />
              <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,15%,50%)', fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="score" stroke="hsl(190,100%,50%)" fill="url(#focusTrendGrad)" strokeWidth={2} name="Focus Score" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Task Completion Rate" delay={0.2}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={completionRate}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,15%,50%)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,15%,50%)', fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="completed" fill="hsl(150,80%,45%)" radius={[4,4,0,0]} opacity={0.7} name="Completed" />
              <Bar dataKey="total" fill="hsl(240,5%,20%)" radius={[4,4,0,0]} opacity={0.5} name="Total" />
              <Line type="monotone" dataKey="completed" stroke="hsl(150,80%,45%)" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Earnings vs Work Hours" delay={0.25}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyEarnings}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,15%,50%)', fontSize: 11 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,15%,50%)', fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,15%,50%)', fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar yAxisId="left" dataKey="earnings" fill="hsl(190,100%,50%)" radius={[4,4,0,0]} opacity={0.7} name="Earnings ($)" />
              <Line yAxisId="right" type="monotone" dataKey="hours" stroke="hsl(40,95%,55%)" strokeWidth={2} dot={{ fill: 'hsl(40,95%,55%)', r: 3 }} name="Hours" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
