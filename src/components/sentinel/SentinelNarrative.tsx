import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SentinelNarrative() {
  const narratives = [
    "Analyzing commit velocity across 5 active branches...",
    "Auth module shows 47-commit divergence from main. Merge conflict probability: 45%.",
    "Jordan Lee: 34 commits, 15.6k lines — silent critical contributor detected.",
    "Night-owl pattern detected for Sarah Kim — 78% of commits between 11PM-3AM.",
    "Database schema received 12 migrations in 48 hours. Stability declining.",
    "Payment module has zero test coverage. Recommend immediate review.",
    "Dev Sharma touched 5 modules today — risk amplification warning.",
    "System health nominal. Monitoring 8 modules across 5 contributors.",
    "Branch feat/auth-flow stale for 18 hours. Blocker suspected.",
    "Integration risk between auth and payments modules increasing.",
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const target = narratives[currentIdx];
    let charIdx = 0;
    setDisplayText('');

    const typeInterval = setInterval(() => {
      if (charIdx < target.length) {
        setDisplayText(target.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentIdx(prev => (prev + 1) % narratives.length);
        }, 3000);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentIdx]);

  return (
    <div className="sentinel-panel rounded-lg p-4 neon-glow">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
        <h3 className="font-display text-xs tracking-widest uppercase text-primary">
          Sentinel Narrative
        </h3>
      </div>
      <motion.div
        key={currentIdx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[2.5rem]"
      >
        <p className="text-sm font-mono text-foreground/80 leading-relaxed">
          {displayText}
          <span className="inline-block w-2 h-4 bg-primary/80 ml-0.5 animate-pulse" />
        </p>
      </motion.div>
    </div>
  );
}
