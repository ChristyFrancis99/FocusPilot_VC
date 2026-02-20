import { motion } from 'framer-motion';
import KPICard from '@/components/dashboard/KPICard';
import WorkloadHeatmap from '@/components/dashboard/WorkloadHeatmap';
import FocusChart from '@/components/dashboard/FocusChart';
import DeadlinesPanel from '@/components/dashboard/DeadlinesPanel';
import EarningsChart from '@/components/dashboard/EarningsChart';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import { kpiData } from '@/lib/dummyData';
import { Activity, Clock, Briefcase, DollarSign } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground">
          Good morning, <span className="gradient-text">Alex</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here's your productivity overview for today
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Productivity Score"
          value={`${kpiData.productivityScore}%`}
          change="+6% vs last week"
          changeType="positive"
          icon={Activity}
          delay={0.1}
        />
        <KPICard
          title="Weekly Hours"
          value={kpiData.weeklyHours}
          change="-2.1h vs target"
          changeType="neutral"
          icon={Clock}
          delay={0.15}
        />
        <KPICard
          title="Active Projects"
          value={kpiData.activeProjects}
          change="+1 new"
          changeType="positive"
          icon={Briefcase}
          delay={0.2}
        />
        <KPICard
          title="Monthly Earnings"
          value={`$${kpiData.monthlyEarnings.toLocaleString()}`}
          change="+12% vs last month"
          changeType="positive"
          icon={DollarSign}
          delay={0.25}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FocusChart />
        <EarningsChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <WorkloadHeatmap />
        <DeadlinesPanel />
        <AIInsightsPanel />
      </div>
    </div>
  );
}
