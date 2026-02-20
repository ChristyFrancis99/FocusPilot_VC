import { motion } from 'framer-motion';
import { heatmapData } from '@/lib/dummyData';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

function getHeatColor(value: number) {
  if (value === 0) return 'bg-muted/30';
  if (value <= 2) return 'bg-primary/15';
  if (value <= 4) return 'bg-primary/30';
  if (value <= 6) return 'bg-primary/50';
  if (value <= 8) return 'bg-primary/70';
  return 'bg-primary/90';
}

export default function WorkloadHeatmap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Workload Heatmap</h3>
      <div className="space-y-2">
        <div className="flex gap-1.5 ml-14">
          {days.map((d) => (
            <span key={d} className="text-[10px] text-muted-foreground w-8 text-center">{d}</span>
          ))}
        </div>
        {heatmapData.map((week, wi) => (
          <div key={wi} className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground w-12 text-right">{weeks[wi]}</span>
            {week.map((val, di) => (
              <motion.div
                key={di}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + wi * 0.05 + di * 0.03 }}
                className={`w-8 h-8 rounded-md ${getHeatColor(val)} transition-all duration-200 hover:ring-1 hover:ring-primary/50 cursor-default`}
                title={`${val}h`}
              />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-[10px] text-muted-foreground">Less</span>
          {[0, 2, 4, 6, 8, 9].map((v) => (
            <div key={v} className={`w-3 h-3 rounded-sm ${getHeatColor(v)}`} />
          ))}
          <span className="text-[10px] text-muted-foreground">More</span>
        </div>
      </div>
    </motion.div>
  );
}
