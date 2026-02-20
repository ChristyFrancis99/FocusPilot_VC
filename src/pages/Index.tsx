import { motion } from 'framer-motion';
import { ArrowRight, Bot, Zap, Calendar, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)] items-center justify-center text-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl space-y-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 glow-primary">
          <SparklesIcon className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium tracking-wide">Introducing FocusPilot AI 2.0</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]">
          The Intelligent Workspace for <br className="hidden md:block" />
          <span className="gradient-text">Elite Freelancers</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Stop guessing and start optimizing. FocusPilot AI analyzes your work patterns, prevents burnout, and prioritizes what matters most—automatically.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 hover:scale-[1.02] hover-glow transition-all"
          >
            Launch Dashboard <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/assistant')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl glass-card text-foreground font-semibold hover:bg-muted/50 transition-colors"
          >
            <Bot className="w-5 h-5 text-accent" /> Meet Your AI Assistant
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          <FeatureCard 
            icon={Activity} 
            title="Productivity Scoring" 
            desc="Real-time analytics on your focus, output, and deep work efficiency." 
            delay={0.2} 
            color="primary"
          />
          <FeatureCard 
            icon={Calendar} 
            title="Smart Scheduling" 
            desc="AI-generated optimal daily schedules based on your natural energy peaks." 
            delay={0.4} 
            color="accent"
          />
          <FeatureCard 
            icon={Zap} 
            title="Burnout Prevention" 
            desc="Proactive warnings and workload rebalancing to keep you sustainable." 
            delay={0.6} 
            color="success"
          />
        </div>
      </motion.div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M13.28 11.47a.75.75 0 010 1.06l-2.72 2.72a.75.75 0 001.06 1.06l2.72-2.72a.75.75 0 011.06 0l2.72 2.72a.75.75 0 101.06-1.06l-2.72-2.72a.75.75 0 010-1.06l2.72-2.72a.75.75 0 10-1.06-1.06l-2.72 2.72a.75.75 0 01-1.06 0l-2.72-2.72a.75.75 0 00-1.06 1.06l2.72 2.72z" clipRule="evenodd" />
    </svg>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay, color }: any) {
  const glow = {
    primary: 'glow-primary',
    accent: 'glow-accent',
    success: 'glow-success',
  }[color];

  const textCol = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-6 text-left group hover:scale-[1.02] transition-transform cursor-default"
    >
      <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center mb-4 ${glow} transition-all duration-300 group-hover:scale-110`}>
        <Icon className={`w-6 h-6 ${textCol}`} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}
