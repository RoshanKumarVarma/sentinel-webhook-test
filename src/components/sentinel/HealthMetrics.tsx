import { motion } from 'framer-motion';
import { riskMetrics, moduleHealth } from '@/lib/mockData';
import { useState, useEffect } from 'react';

interface HealthMetricsProps {
  isSimulating: boolean;
}

export default function HealthMetrics({ isSimulating }: HealthMetricsProps) {
  const [metrics, setMetrics] = useState(riskMetrics);
  const [overallHealth, setOverallHealth] = useState(67);

  useEffect(() => {
    if (isSimulating) {
      setMetrics(riskMetrics.map(m => ({
        ...m,
        value: Math.min(95, m.value + 20 + Math.floor(Math.random() * 20)),
        trend: 'up' as const,
      })));
      setOverallHealth(28);
    } else {
      setMetrics(riskMetrics);
      setOverallHealth(67);
    }
  }, [isSimulating]);

  return (
    <div className="space-y-4">
      {/* Overall Health */}
      <div className={`sentinel-panel rounded-lg p-4 ${isSimulating ? 'neon-glow-red' : 'neon-glow'}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-xs tracking-widest uppercase text-primary">
            System Health
          </h3>
          <span className={`font-display text-2xl font-bold ${
            overallHealth > 60 ? 'text-sentinel-green neon-text' : 
            overallHealth > 30 ? 'text-sentinel-orange' : 'text-destructive neon-text-red'
          }`}>
            {overallHealth}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              overallHealth > 60 ? 'bg-sentinel-green' : 
              overallHealth > 30 ? 'bg-sentinel-orange' : 'bg-destructive'
            }`}
            initial={false}
            animate={{ width: `${overallHealth}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Risk Meters */}
      <div className={`sentinel-panel rounded-lg p-4 ${isSimulating ? 'neon-glow-red' : 'neon-glow'}`}>
        <h3 className="font-display text-xs tracking-widest uppercase text-primary mb-3">
          Risk Analysis
        </h3>
        <div className="space-y-3">
          {metrics.map((metric) => {
            const isOverThreshold = metric.value >= metric.threshold;
            return (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-body text-foreground/80">{metric.label}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-mono font-bold ${
                      isOverThreshold ? 'text-destructive' : 'text-sentinel-green'
                    }`}>
                      {metric.value}%
                    </span>
                    <span className={`text-[10px] ${
                      metric.trend === 'up' ? 'text-destructive' : 
                      metric.trend === 'down' ? 'text-sentinel-green' : 'text-muted-foreground'
                    }`}>
                      {metric.trend === 'up' ? '▲' : metric.trend === 'down' ? '▼' : '—'}
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden relative">
                  <motion.div
                    className={`h-full rounded-full ${
                      isOverThreshold ? 'bg-destructive' : 
                      metric.value > metric.threshold * 0.7 ? 'bg-sentinel-orange' : 'bg-sentinel-green'
                    }`}
                    initial={false}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 0.8 }}
                  />
                  {/* Threshold marker */}
                  <div
                    className="absolute top-0 h-full w-px bg-foreground/30"
                    style={{ left: `${metric.threshold}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Module Health Grid */}
      <div className="sentinel-panel rounded-lg p-4 neon-glow">
        <h3 className="font-display text-xs tracking-widest uppercase text-primary mb-3">
          Module Stability
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {moduleHealth.map((mod) => (
            <div
              key={mod.name}
              className={`rounded p-2 border ${
                mod.risk === 'high' ? 'border-destructive/40 bg-destructive/5' :
                mod.risk === 'medium' ? 'border-sentinel-orange/40 bg-sentinel-orange/5' :
                'border-sentinel-green/40 bg-sentinel-green/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-foreground/80">{mod.name}</span>
                <span className={`text-[10px] font-display font-bold ${
                  mod.risk === 'high' ? 'text-destructive' :
                  mod.risk === 'medium' ? 'text-sentinel-orange' : 'text-sentinel-green'
                }`}>
                  {mod.stability}%
                </span>
              </div>
              <div className="w-full h-1 rounded-full bg-muted mt-1 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    mod.risk === 'high' ? 'bg-destructive' :
                    mod.risk === 'medium' ? 'bg-sentinel-orange' : 'bg-sentinel-green'
                  }`}
                  style={{ width: `${mod.stability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
