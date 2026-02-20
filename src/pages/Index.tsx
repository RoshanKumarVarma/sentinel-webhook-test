import { useState } from 'react';
import { motion } from 'framer-motion';
import AICore from '@/components/sentinel/AICore';
import CommitStream from '@/components/sentinel/CommitStream';
import HealthMetrics from '@/components/sentinel/HealthMetrics';
import BehavioralRadar from '@/components/sentinel/BehavioralRadar';
import AIIntervention from '@/components/sentinel/AIIntervention';
import SimulationToggle from '@/components/sentinel/SimulationToggle';
import ParticleBackground from '@/components/sentinel/ParticleBackground';
import DNAHelix from '@/components/sentinel/DNAHelix';
import SentinelNarrative from '@/components/sentinel/SentinelNarrative';

const Index = () => {
  const [isSimulating, setIsSimulating] = useState(false);

  return (
    <div className={`min-h-screen bg-background relative ${isSimulating ? 'glitch-effect' : ''}`}>
      <ParticleBackground />

      <div className="relative z-10 p-4 lg:p-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="font-display text-xl lg:text-2xl font-bold tracking-widest text-primary neon-text">
              PROJECT SENTINEL
            </h1>
            <p className="font-mono text-[10px] lg:text-xs text-muted-foreground tracking-wider mt-0.5">
              AUTONOMOUS AI GUARDIAN • v2.1.0 • MONITORING ACTIVE
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SimulationToggle
              isSimulating={isSimulating}
              onToggle={() => setIsSimulating(!isSimulating)}
            />
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded border border-border/50 bg-muted/30">
              <div className="w-1.5 h-1.5 rounded-full bg-sentinel-green animate-pulse" />
              <span className="font-mono text-[10px] text-muted-foreground">SYSTEMS ONLINE</span>
            </div>
          </div>
        </motion.header>

        {/* AI Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <SentinelNarrative />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column - Commit Stream */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 h-[600px]"
          >
            <CommitStream />
          </motion.div>

          {/* Center Column - AI Core + DNA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* AI Core Orb */}
            <div className={`sentinel-panel rounded-lg overflow-hidden relative ${isSimulating ? 'neon-glow-red' : 'neon-glow-strong'}`} style={{ height: '360px' }}>
              <div className="absolute inset-0 sentinel-scanline pointer-events-none z-10 opacity-20" />
              <AICore healthScore={isSimulating ? 28 : 67} isSimulating={isSimulating} />
              {/* Overlay label */}
              <div className="absolute bottom-3 left-0 right-0 text-center z-20">
                <span className={`font-display text-xs tracking-[0.3em] ${isSimulating ? 'text-destructive neon-text-red' : 'text-primary neon-text'}`}>
                  {isSimulating ? 'DESTABILIZING' : 'AI CORE ACTIVE'}
                </span>
              </div>
            </div>

            {/* DNA Helix */}
            <DNAHelix />

            {/* AI Interventions */}
            <AIIntervention isSimulating={isSimulating} />
          </motion.div>

          {/* Right Column - Health + Behavioral */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <HealthMetrics isSimulating={isSimulating} />
            <BehavioralRadar />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="font-mono text-[10px] text-muted-foreground/50 tracking-widest">
            SENTINEL AI ENGINE • REAL-TIME MONITORING • {new Date().toISOString().split('T')[0]}
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
