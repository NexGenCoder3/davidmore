/**
 * Core TypeScript interfaces for Developer Portfolio
 * Based on SPECIFICATION.md data model requirements
 */

export type ProjectCategory = 'web-apps' | 'security' | 'automation' | 'open-source' | 'tools';

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: AspectRatio;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
  client?: string;
  tech?: string;
  location?: string;
  slug: string;
}

export interface DeveloperInfo {
  name: string;
  tagline: string;
  heroIntroduction: string;
  biography: string;
  approach: string;
  awards: string[];
  clients: string[];
  education: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  portraitImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: 'web-development' | 'security' | 'consultation';
  message: string;
  timestamp: Date;
}
