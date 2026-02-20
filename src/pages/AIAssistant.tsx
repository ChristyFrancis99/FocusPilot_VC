import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, ChatMessage } from '@/stores/appStore';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

const suggestions = [
  'Analyze my productivity patterns this week',
  'Create an optimized schedule for tomorrow',
  "What's my burnout risk level?",
  'Recommend focus session timing',
];

// Mock AI responses
const mockResponses: Record<string, string> = {
  default: "Based on your current workload data, I can see you have **4 active projects** with **8 tasks** in your pipeline. Your focus hours peak on **Tuesdays and Fridays** — I'd recommend scheduling deep work during those windows.\n\nYour current burnout risk is **moderate** due to 3 late-night sessions this week. Consider:\n- Taking a 15-minute break every 90 minutes\n- Moving the API integration deadline by 2 days\n- Starting your workday 30 minutes earlier to avoid evening crunch",
  burnout: "🔍 **Burnout Risk Analysis**\n\nYour risk level is currently **moderate (55/100)**.\n\n**Warning signals detected:**\n- 3 late-night work sessions (after 10 PM)\n- 22% workload variance week-over-week\n- 5% decline in task completion efficiency\n\n**Recommendations:**\n1. 🛌 Take tomorrow morning off — your Thursday focus scores are historically low\n2. 📋 Redistribute 2 non-urgent tasks to next week\n3. 🧘 Try a 25-min focus sprint followed by 10-min rest (Pomodoro)",
  schedule: "📅 **Optimized Schedule for Tomorrow (Feb 21)**\n\n**Morning Block (9:00 - 12:00)**\n- 9:00-10:30 → Fix mobile nav bug *(high priority, 2h est.)*\n- 10:45-12:00 → API integration planning\n\n**Afternoon Block (1:00 - 5:00)**\n- 1:00-3:00 → Deep work: Landing page redesign\n- 3:15-4:00 → Documentation draft\n- 4:00-5:00 → Email & admin tasks\n\n*Estimated focus time: 5.5h | Buffer: 1.5h*",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('burnout') || lower.includes('risk')) return mockResponses.burnout;
  if (lower.includes('schedule') || lower.includes('tomorrow') || lower.includes('plan')) return mockResponses.schedule;
  return mockResponses.default;
}

export default function AIAssistant() {
  const { chatMessages, addChatMessage } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatMessages]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setInput('');
    addChatMessage({ role: 'user', content: text });
    setIsTyping(true);

    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    addChatMessage({ role: 'assistant', content: getResponse(text) });
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
        <p className="text-sm text-muted-foreground mt-1">Your AI-powered productivity coach</p>
      </motion.div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pb-4">
        {chatMessages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 glow-primary">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">How can I help?</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              I analyze your work patterns, predict burnout risks, and create optimized schedules.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
              {suggestions.map((s, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  onClick={() => send(s)}
                  className="text-left px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {chatMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-primary" />
            </div>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs">Analyzing...</span>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder="Ask about your productivity, schedule, or burnout risk..."
            className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5 text-primary" />
        </div>
      )}
      <div className={`max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
        isUser
          ? 'bg-primary text-primary-foreground rounded-br-md'
          : 'glass-card text-foreground rounded-bl-md'
      }`}>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5 text-accent" />
        </div>
      )}
    </motion.div>
  );
}
