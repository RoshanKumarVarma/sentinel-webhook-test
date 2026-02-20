export interface Commit {
  id: string;
  author: string;
  message: string;
  timestamp: Date;
  filesChanged: number;
  additions: number;
  deletions: number;
  branch: string;
  type: 'feature' | 'bugfix' | 'refactor' | 'hotfix' | 'docs';
  module: string;
}

export interface TeamMember {
  name: string;
  avatar: string;
  role: string;
  commitCount: number;
  linesChanged: number;
  riskScore: number;
  pattern: string;
  patternIcon: string;
  lastActive: Date;
  modulesTouched: string[];
}

export interface RiskMetric {
  label: string;
  value: number;
  threshold: number;
  trend: 'up' | 'down' | 'stable';
}

const modules = ['auth', 'api', 'ui-core', 'database', 'payments', 'notifications', 'analytics', 'chat'];
const branches = ['main', 'feat/auth-flow', 'fix/db-migration', 'feat/payments', 'refactor/api'];
const authors = ['Alex Chen', 'Sarah Kim', 'Jordan Lee', 'Maya Patel', 'Dev Sharma'];
const types: Commit['type'][] = ['feature', 'bugfix', 'refactor', 'hotfix', 'docs'];

const commitMessages: Record<Commit['type'], string[]> = {
  feature: ['Add OAuth2 login flow', 'Implement payment gateway', 'Create notification system', 'Add real-time chat', 'Build analytics dashboard'],
  bugfix: ['Fix auth token refresh', 'Resolve DB connection leak', 'Patch XSS vulnerability', 'Fix race condition in API', 'Correct timezone handling'],
  refactor: ['Restructure API routes', 'Optimize database queries', 'Clean up auth middleware', 'Modularize UI components', 'Simplify state management'],
  hotfix: ['Emergency auth patch', 'Critical DB rollback', 'Hotfix payment timeout', 'Fix prod memory leak', 'Patch security vuln'],
  docs: ['Update API docs', 'Add setup guide', 'Document auth flow', 'Write deployment guide', 'Update README'],
};

export function generateCommits(count: number): Commit[] {
  const commits: Commit[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const msgs = commitMessages[type];
    commits.push({
      id: Math.random().toString(36).slice(2, 10),
      author: authors[Math.floor(Math.random() * authors.length)],
      message: msgs[Math.floor(Math.random() * msgs.length)],
      timestamp: new Date(now - Math.random() * 7 * 24 * 60 * 60 * 1000),
      filesChanged: Math.floor(Math.random() * 20) + 1,
      additions: Math.floor(Math.random() * 500),
      deletions: Math.floor(Math.random() * 200),
      branch: branches[Math.floor(Math.random() * branches.length)],
      type,
      module: modules[Math.floor(Math.random() * modules.length)],
    });
  }
  return commits.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Alex Chen', avatar: 'AC', role: 'Lead Engineer',
    commitCount: 147, linesChanged: 12400, riskScore: 0.3,
    pattern: 'Consistent Contributor', patternIcon: '🔄',
    lastActive: new Date(Date.now() - 1800000),
    modulesTouched: ['auth', 'api', 'database'],
  },
  {
    name: 'Sarah Kim', avatar: 'SK', role: 'Frontend Dev',
    commitCount: 89, linesChanged: 8200, riskScore: 0.15,
    pattern: 'Night Owl Coder', patternIcon: '🦉',
    lastActive: new Date(Date.now() - 3600000),
    modulesTouched: ['ui-core', 'analytics'],
  },
  {
    name: 'Jordan Lee', avatar: 'JL', role: 'Backend Dev',
    commitCount: 34, linesChanged: 15600, riskScore: 0.65,
    pattern: 'Silent Critical', patternIcon: '🎯',
    lastActive: new Date(Date.now() - 86400000),
    modulesTouched: ['database', 'api', 'payments', 'auth'],
  },
  {
    name: 'Maya Patel', avatar: 'MP', role: 'Full Stack',
    commitCount: 112, linesChanged: 9800, riskScore: 0.45,
    pattern: 'Last-Minute Surger', patternIcon: '⚡',
    lastActive: new Date(Date.now() - 7200000),
    modulesTouched: ['notifications', 'chat', 'ui-core'],
  },
  {
    name: 'Dev Sharma', avatar: 'DS', role: 'DevOps',
    commitCount: 56, linesChanged: 4300, riskScore: 0.7,
    pattern: 'Risk Amplifier', patternIcon: '🔥',
    lastActive: new Date(Date.now() - 14400000),
    modulesTouched: ['api', 'database', 'auth', 'payments', 'notifications'],
  },
];

export const riskMetrics: RiskMetric[] = [
  { label: 'Deadline Failure', value: 23, threshold: 40, trend: 'up' },
  { label: 'Merge Conflict', value: 45, threshold: 50, trend: 'up' },
  { label: 'Team Stress', value: 31, threshold: 60, trend: 'stable' },
  { label: 'Code Debt', value: 58, threshold: 70, trend: 'up' },
  { label: 'Integration Risk', value: 37, threshold: 45, trend: 'down' },
];

export const aiInterventions = [
  { id: 1, severity: 'critical' as const, message: 'Merge branches now — feat/auth-flow diverged 47 commits from main', module: 'auth', timestamp: new Date() },
  { id: 2, severity: 'warning' as const, message: 'Auth module ownership unclear — 3 contributors, no primary owner', module: 'auth', timestamp: new Date(Date.now() - 3600000) },
  { id: 3, severity: 'warning' as const, message: 'Backend schema unstable — 12 migration files in 48 hours', module: 'database', timestamp: new Date(Date.now() - 7200000) },
  { id: 4, severity: 'info' as const, message: 'Recommend code review: payments module has 0 tests', module: 'payments', timestamp: new Date(Date.now() - 10800000) },
];

export const moduleHealth: { name: string; stability: number; commits: number; contributors: number; risk: 'low' | 'medium' | 'high' }[] = [
  { name: 'auth', stability: 45, commits: 67, contributors: 3, risk: 'high' },
  { name: 'api', stability: 72, commits: 89, contributors: 4, risk: 'medium' },
  { name: 'ui-core', stability: 88, commits: 112, contributors: 2, risk: 'low' },
  { name: 'database', stability: 38, commits: 45, contributors: 2, risk: 'high' },
  { name: 'payments', stability: 65, commits: 23, contributors: 1, risk: 'medium' },
  { name: 'notifications', stability: 91, commits: 34, contributors: 2, risk: 'low' },
  { name: 'analytics', stability: 78, commits: 28, contributors: 1, risk: 'low' },
  { name: 'chat', stability: 55, commits: 19, contributors: 1, risk: 'medium' },
];
