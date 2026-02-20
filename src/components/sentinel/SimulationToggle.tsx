import { motion } from 'framer-motion';

interface SimulationToggleProps {
  isSimulating: boolean;
  onToggle: () => void;
}

export default function SimulationToggle({ isSimulating, onToggle }: SimulationToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg border font-display text-xs tracking-wider uppercase transition-all duration-300 ${
        isSimulating
          ? 'border-destructive/60 bg-destructive/10 text-destructive neon-glow-red'
          : 'border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 neon-glow'
      }`}
      whileTap={{ scale: 0.97 }}
    >
      <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-destructive animate-pulse' : 'bg-primary'}`} />
      {isSimulating ? 'SIMULATION ACTIVE' : 'SIMULATE FAILURE'}
      {isSimulating && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-destructive/30"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
