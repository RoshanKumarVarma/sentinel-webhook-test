import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Commit } from '@/lib/mockData';
import { generateCommits } from '@/lib/mockData';

const typeColors: Record<string, string> = {
  feature: 'text-sentinel-green',
  bugfix: 'text-sentinel-orange',
  refactor: 'text-sentinel-cyan',
  hotfix: 'text-destructive',
  docs: 'text-muted-foreground',
};

const typeBadgeColors: Record<string, string> = {
  feature: 'bg-sentinel-green/20 text-sentinel-green border-sentinel-green/30',
  bugfix: 'bg-sentinel-orange/20 text-sentinel-orange border-sentinel-orange/30',
  refactor: 'bg-primary/20 text-primary border-primary/30',
  hotfix: 'bg-destructive/20 text-destructive border-destructive/30',
  docs: 'bg-muted text-muted-foreground border-border',
};

export default function CommitStream() {
  const [commits, setCommits] = useState<Commit[]>(() => generateCommits(20));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCommit = generateCommits(1)[0];
      newCommit.timestamp = new Date();
      setCommits(prev => [newCommit, ...prev.slice(0, 19)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="sentinel-panel rounded-lg p-4 h-full flex flex-col neon-glow">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-sentinel-green animate-pulse" />
        <h3 className="font-display text-xs tracking-widest uppercase text-primary">
          Live Commit Stream
        </h3>
      </div>
      <div ref={containerRef} className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 sentinel-scanline pointer-events-none z-10 opacity-30" />
        <div className="space-y-1 overflow-y-auto h-full pr-1 scrollbar-thin">
          <AnimatePresence initial={false}>
            {commits.map((commit) => (
              <motion.div
                key={commit.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2 py-1.5 border-b border-border/30 group"
              >
                <div className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${commit.type === 'hotfix' ? 'bg-destructive animate-pulse' : 'bg-primary/50'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-[10px] font-mono px-1.5 py-0 rounded border ${typeBadgeColors[commit.type]}`}>
                      {commit.type}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">{commit.branch}</span>
                  </div>
                  <p className={`text-xs truncate ${typeColors[commit.type]} font-body`}>
                    {commit.message}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground font-mono">{commit.author}</span>
                    <span className="text-[10px] text-muted-foreground/50">•</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{timeAgo(commit.timestamp)}</span>
                    <span className="text-[10px] text-muted-foreground/50">•</span>
                    <span className="text-[10px] text-sentinel-green font-mono">+{commit.additions}</span>
                    <span className="text-[10px] text-destructive font-mono">-{commit.deletions}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
