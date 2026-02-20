export const weeklyHours = [
  { day: 'Mon', hours: 7.5, focus: 5.2 },
  { day: 'Tue', hours: 8.2, focus: 6.1 },
  { day: 'Wed', hours: 9.1, focus: 4.8 },
  { day: 'Thu', hours: 6.5, focus: 5.5 },
  { day: 'Fri', hours: 7.8, focus: 6.3 },
  { day: 'Sat', hours: 3.2, focus: 2.1 },
  { day: 'Sun', hours: 1.5, focus: 1.0 },
];

export const monthlyEarnings = [
  { month: 'Sep', earnings: 4200, hours: 142 },
  { month: 'Oct', earnings: 5100, hours: 156 },
  { month: 'Nov', earnings: 4800, hours: 148 },
  { month: 'Dec', earnings: 3900, hours: 120 },
  { month: 'Jan', earnings: 5600, hours: 162 },
  { month: 'Feb', earnings: 4100, hours: 135 },
];

export const heatmapData = [
  [2, 4, 3, 5, 6, 1, 0],
  [3, 5, 7, 4, 5, 2, 0],
  [4, 6, 8, 6, 7, 3, 1],
  [5, 7, 9, 5, 6, 2, 0],
];

export const focusTrend = [
  { week: 'W1', score: 72 },
  { week: 'W2', score: 78 },
  { week: 'W3', score: 65 },
  { week: 'W4', score: 82 },
  { week: 'W5', score: 74 },
  { week: 'W6', score: 88 },
  { week: 'W7', score: 79 },
  { week: 'W8', score: 85 },
];

export const completionRate = [
  { week: 'W1', completed: 8, total: 12 },
  { week: 'W2', completed: 10, total: 11 },
  { week: 'W3', completed: 6, total: 10 },
  { week: 'W4', completed: 11, total: 13 },
  { week: 'W5', completed: 9, total: 12 },
  { week: 'W6', completed: 12, total: 14 },
];

export const deadlines = [
  { task: 'Fix mobile nav bug', project: 'ClientX Website', date: '2026-02-21', priority: 'high' as const },
  { task: 'Build API integration', project: 'E-commerce App', date: '2026-02-22', priority: 'urgent' as const },
  { task: 'Redesign landing page', project: 'ClientX Website', date: '2026-02-25', priority: 'high' as const },
  { task: 'User onboarding flow', project: 'E-commerce App', date: '2026-02-27', priority: 'high' as const },
  { task: 'Write documentation', project: 'DevPortal', date: '2026-02-28', priority: 'medium' as const },
];

export const kpiData = {
  productivityScore: 82,
  weeklyHours: 43.8,
  activeProjects: 4,
  monthlyEarnings: 5600,
};

export const burnoutIndicators = {
  lateNightSessions: 3,
  weeklyVariance: 22,
  efficiencyTrend: -5,
  riskLevel: 'moderate' as const,
};
