import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', proficiency: 92, relatedProjects: ['reactflow-dashboard', 'realtime-chat'] },
  { name: 'TypeScript', category: 'Frontend', proficiency: 90, relatedProjects: ['secure-auth-framework', 'reactflow-dashboard'] },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 88, relatedProjects: ['reactflow-dashboard'] },
  { name: 'Framer Motion', category: 'Frontend', proficiency: 80, relatedProjects: ['reactflow-dashboard'] },
  { name: 'HTML / CSS', category: 'Frontend', proficiency: 95, relatedProjects: ['reactflow-dashboard', 'realtime-chat'] },
  { name: 'Next.js', category: 'Frontend', proficiency: 75, relatedProjects: [] },

  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 88, relatedProjects: ['secure-auth-framework', 'realtime-chat'] },
  { name: 'Python', category: 'Backend', proficiency: 82, relatedProjects: ['netscanner-pro', 'devops-toolkit'] },
  { name: 'Go', category: 'Backend', proficiency: 70, relatedProjects: ['clouddeploy-cli', 'api-gateway'] },
  { name: 'PostgreSQL', category: 'Backend', proficiency: 78, relatedProjects: ['api-gateway'] },
  { name: 'MongoDB', category: 'Backend', proficiency: 76, relatedProjects: ['realtime-chat'] },
  { name: 'Redis', category: 'Backend', proficiency: 72, relatedProjects: ['secure-auth-framework', 'api-gateway'] },

  // Security
  { name: 'Penetration Testing', category: 'Security', proficiency: 85, relatedProjects: ['netscanner-pro'] },
  { name: 'Cryptography', category: 'Security', proficiency: 80, relatedProjects: ['cryptovault'] },
  { name: 'Network Security', category: 'Security', proficiency: 82, relatedProjects: ['netscanner-pro'] },
  { name: 'OWASP Top 10', category: 'Security', proficiency: 90, relatedProjects: ['secure-auth-framework'] },
  { name: 'Rust / WASM', category: 'Security', proficiency: 65, relatedProjects: ['cryptovault'] },

  // DevOps
  { name: 'Docker', category: 'DevOps', proficiency: 85, relatedProjects: ['clouddeploy-cli', 'devops-toolkit'] },
  { name: 'Kubernetes', category: 'DevOps', proficiency: 70, relatedProjects: ['devops-toolkit'] },
  { name: 'CI/CD Pipelines', category: 'DevOps', proficiency: 80, relatedProjects: ['devops-toolkit', 'clouddeploy-cli'] },
  { name: 'Terraform', category: 'DevOps', proficiency: 68, relatedProjects: ['clouddeploy-cli'] },
  { name: 'Linux / Bash', category: 'DevOps', proficiency: 90, relatedProjects: ['devops-toolkit', 'netscanner-pro'] },
];

export const skillCategories: Array<{ name: string; ascii: string }> = [
  { name: 'Frontend', ascii: '╔══ FRONTEND ══╗' },
  { name: 'Backend', ascii: '╔══ BACKEND ══╗' },
  { name: 'Security', ascii: '╔══ SECURITY ══╗' },
  { name: 'DevOps', ascii: '╔══ DEVOPS ══╗' },
];
