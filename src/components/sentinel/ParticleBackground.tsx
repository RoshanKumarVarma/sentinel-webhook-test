import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--sentinel-cyan) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--sentinel-cyan) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Scanline */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ y: ['-10vh', '110vh'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Corner decorations */}
      <svg className="absolute top-4 left-4 w-16 h-16 opacity-20" viewBox="0 0 64 64">
        <path d="M0 16 L0 0 L16 0" fill="none" stroke="hsl(var(--sentinel-cyan))" strokeWidth="1" />
      </svg>
      <svg className="absolute top-4 right-4 w-16 h-16 opacity-20" viewBox="0 0 64 64">
        <path d="M48 0 L64 0 L64 16" fill="none" stroke="hsl(var(--sentinel-cyan))" strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-4 left-4 w-16 h-16 opacity-20" viewBox="0 0 64 64">
        <path d="M0 48 L0 64 L16 64" fill="none" stroke="hsl(var(--sentinel-cyan))" strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-4 right-4 w-16 h-16 opacity-20" viewBox="0 0 64 64">
        <path d="M48 64 L64 64 L64 48" fill="none" stroke="hsl(var(--sentinel-cyan))" strokeWidth="1" />
      </svg>
    </div>
  );
}
