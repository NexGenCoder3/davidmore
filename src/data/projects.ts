import type { Project } from '@/types';

import secureAuthImg from '@/assets/projects/secure-auth-screenshot.jpg';
import netscannerImg from '@/assets/projects/netscanner-screenshot.jpg';
import clouddeployImg from '@/assets/projects/clouddeploy-screenshot.jpg';
import reactflowImg from '@/assets/projects/reactflow-screenshot.jpg';
import cryptovaultImg from '@/assets/projects/cryptovault-screenshot.jpg';
import apiGatewayImg from '@/assets/projects/api-gateway-screenshot.jpg';
import devopsImg from '@/assets/projects/devops-screenshot.jpg';
import realtimeChatImg from '@/assets/projects/realtime-chat-screenshot.jpg';

export const projects: Project[] = [
  {
    id: '1',
    title: 'SecureAuth Framework',
    category: 'security',
    year: '2024',
    slug: 'secure-auth-framework',
    coverImage: secureAuthImg,
    description: 'A comprehensive authentication framework with JWT tokens, OAuth2 integration, and advanced security features including rate limiting and brute force protection.',
    client: 'Open Source',
    tech: 'Node.js, TypeScript, Redis',
    location: 'Remote',
    images: []
  },
  {
    id: '2',
    title: 'NetScanner Pro',
    category: 'tools',
    year: '2024',
    slug: 'netscanner-pro',
    coverImage: netscannerImg,
    description: 'Advanced network scanning and vulnerability assessment tool with real-time monitoring, port scanning, and automated reporting capabilities.',
    client: 'Security Firms',
    tech: 'Python, Scapy, Nmap API',
    location: 'Global',
    images: []
  },
  {
    id: '3',
    title: 'CloudDeploy CLI',
    category: 'automation',
    year: '2023',
    slug: 'clouddeploy-cli',
    coverImage: clouddeployImg,
    description: 'A powerful CLI tool for automating cloud deployments across AWS, GCP, and Azure with infrastructure-as-code support and rollback capabilities.',
    client: 'Enterprise',
    tech: 'Go, Terraform, Docker',
    location: 'Remote',
    images: []
  },
  {
    id: '4',
    title: 'ReactFlow Dashboard',
    category: 'web-apps',
    year: '2023',
    slug: 'reactflow-dashboard',
    coverImage: reactflowImg,
    description: 'A modern analytics dashboard built with React and TypeScript featuring real-time data visualization, dark mode, and responsive design.',
    client: 'SaaS Startups',
    tech: 'React, TypeScript, D3.js',
    location: 'Remote',
    images: []
  },
  {
    id: '5',
    title: 'CryptoVault',
    category: 'security',
    year: '2023',
    slug: 'cryptovault',
    coverImage: cryptovaultImg,
    description: 'End-to-end encrypted password manager with zero-knowledge architecture, biometric authentication, and secure sharing capabilities.',
    client: 'Personal Project',
    tech: 'Rust, WebAssembly, AES-256',
    location: 'Open Source',
    images: []
  },
  {
    id: '6',
    title: 'API Gateway',
    category: 'open-source',
    year: '2022',
    slug: 'api-gateway',
    coverImage: apiGatewayImg,
    description: 'High-performance API gateway with rate limiting, load balancing, and request transformation capabilities. Handles millions of requests per day.',
    location: 'Pacific Northwest',
    tech: 'Go, Redis, PostgreSQL',
    images: []
  },
  {
    id: '7',
    title: 'DevOps Toolkit',
    category: 'automation',
    year: '2022',
    slug: 'devops-toolkit',
    coverImage: devopsImg,
    description: 'Comprehensive DevOps automation toolkit with CI/CD pipelines, monitoring dashboards, and infrastructure management scripts.',
    client: 'Tech Startups',
    tech: 'Bash, Python, Kubernetes',
    location: 'Remote',
    images: []
  },
  {
    id: '8',
    title: 'Real-time Chat',
    category: 'web-apps',
    year: '2022',
    slug: 'realtime-chat',
    coverImage: realtimeChatImg,
    description: 'Scalable real-time chat application with WebSocket support, message encryption, file sharing, and multi-room capabilities.',
    client: 'Enterprise',
    tech: 'Node.js, Socket.io, MongoDB',
    location: 'Global',
    images: []
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};