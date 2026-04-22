import type { Skill } from './types'

export const skills: Skill[] = [
  {
    title: 'Développement Frontend',
    sub: 'Html, TypeScript, Tailwind CSS',
    icon: '<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
  },
  {
    title: 'Backend & Bases de données',
    sub: 'Node.js, Python, C#, SQL',
    icon: '<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="7" rx="9" ry="3" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10c0 1.66 3.58 3 9 3s9-1.34 9-3V7"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12c0 1.66 3.58 3 9 3s9-1.34 9-3"/></svg>',
  },
  {
    title: 'DevOps',
    sub: 'Docker, Kubernetes, CI/CD, Monitoring, déploiement',
    icon: '<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>',
  },
]
