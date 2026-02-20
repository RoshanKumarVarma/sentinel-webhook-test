import { motion } from 'framer-motion';
import { generateCommits } from '@/lib/mockData';
import { useMemo } from 'react';

export default function DNAHelix() {
  const commits = useMemo(() => generateCommits(30), []);

  const typeColor: Record<string, string> = {
    feature: 'bg-sentinel-green',
    bugfix: 'bg-sentinel-orange',
    refactor: 'bg-primary',
    hotfix: 'bg-destructive',
    docs: 'bg-muted-foreground',
  };

  return (
    <div className="sentinel-panel rounded-lg p-4 neon-glow">
      <h3 className="font-display text-xs tracking-widest uppercase text-primary mb-3">
        Project DNA
      </h3>
      <div className="flex items-center gap-1 h-16 overflow-hidden">
        {commits.map((commit, i) => {
          const height = 10 + (commit.additions / 500) * 50;
          const yOffset = Math.sin(i * 0.5) * 15;
          return (
            <motion.div
              key={commit.id}
              className="flex flex-col items-center gap-0.5 relative"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <motion.div
                className={`w-1 rounded-full ${typeColor[commit.type]}`}
                style={{ height: `${height}%`, opacity: 0.8 }}
                animate={{ y: yOffset }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-2">
        {Object.entries(typeColor).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
            <span className="text-[9px] font-mono text-muted-foreground">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
