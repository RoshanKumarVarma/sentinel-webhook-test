import { motion } from 'framer-motion';
import { teamMembers } from '@/lib/mockData';

export default function BehavioralRadar() {
  return (
    <div className="sentinel-panel rounded-lg p-4 neon-glow h-full">
      <h3 className="font-display text-xs tracking-widest uppercase text-primary mb-3">
        Behavioral Intelligence
      </h3>
      <div className="space-y-3">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-display font-bold border ${
                member.riskScore > 0.6 ? 'border-destructive/60 bg-destructive/10 text-destructive' :
                member.riskScore > 0.3 ? 'border-sentinel-orange/60 bg-sentinel-orange/10 text-sentinel-orange' :
                'border-primary/60 bg-primary/10 text-primary'
              }`}>
                {member.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-body text-foreground font-semibold">{member.name}</span>
                  <span className="text-[10px]">{member.patternIcon}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">{member.pattern}</span>
                </div>

                {/* Risk bar */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        member.riskScore > 0.6 ? 'bg-destructive' :
                        member.riskScore > 0.3 ? 'bg-sentinel-orange' : 'bg-sentinel-green'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${member.riskScore * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">
                    {Math.round(member.riskScore * 100)}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex gap-3 mt-1">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {member.commitCount} commits
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {(member.linesChanged / 1000).toFixed(1)}k lines
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {member.modulesTouched.length} modules
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
