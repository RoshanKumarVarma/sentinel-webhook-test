import { motion, AnimatePresence } from 'framer-motion';
import { aiInterventions } from '@/lib/mockData';
import { useState, useEffect } from 'react';

interface AIInterventionProps {
  isSimulating: boolean;
}

const severityStyles = {
  critical: {
    border: 'border-destructive/60',
    bg: 'bg-destructive/10',
    icon: '🚨',
    label: 'CRITICAL',
    labelClass: 'text-destructive',
    glow: 'neon-glow-red',
  },
  warning: {
    border: 'border-sentinel-orange/60',
    bg: 'bg-sentinel-orange/10',
    icon: '⚠️',
    label: 'WARNING',
    labelClass: 'text-sentinel-orange',
    glow: '',
  },
  info: {
    border: 'border-primary/40',
    bg: 'bg-primary/5',
    icon: 'ℹ️',
    label: 'INFO',
    labelClass: 'text-primary',
    glow: '',
  },
};

export default function AIIntervention({ isSimulating }: AIInterventionProps) {
  const [alerts, setAlerts] = useState(aiInterventions);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (isSimulating) {
      setAlerts([
        { id: 99, severity: 'critical', message: 'SYSTEM DESTABILIZATION DETECTED — Multiple modules at risk of cascade failure', module: 'system', timestamp: new Date() },
        { id: 98, severity: 'critical', message: 'Deadline failure probability exceeds 80% — Immediate intervention required', module: 'timeline', timestamp: new Date() },
        ...aiInterventions,
      ]);
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 1000);
      return () => clearTimeout(t);
    } else {
      setAlerts(aiInterventions);
    }
  }, [isSimulating]);

  return (
    <div className={`sentinel-panel rounded-lg p-4 neon-glow h-full transition-all duration-300 ${flash ? 'glitch-effect' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-destructive animate-pulse' : 'bg-primary animate-pulse-glow'}`} />
        <h3 className="font-display text-xs tracking-widest uppercase text-primary">
          AI Interventions
        </h3>
        <span className="text-[10px] font-mono text-muted-foreground ml-auto">
          {alerts.filter(a => a.severity === 'critical').length} critical
        </span>
      </div>
      <div className="space-y-2 overflow-y-auto max-h-64">
        <AnimatePresence>
          {alerts.map((alert, i) => {
            const style = severityStyles[alert.severity];
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded p-2.5 border ${style.border} ${style.bg} ${
                  alert.severity === 'critical' ? style.glow : ''
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm">{style.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-display font-bold ${style.labelClass}`}>
                        {style.label}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        [{alert.module}]
                      </span>
                    </div>
                    <p className="text-xs font-body text-foreground/80 leading-relaxed">
                      {alert.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
