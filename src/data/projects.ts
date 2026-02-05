import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'SecureAuth Framework',
    category: 'security',
    year: '2024',
    slug: 'secure-auth-framework',
    // Photo by Zain Creations on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1733496637708-9470e9c8cfe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjB8&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A comprehensive authentication framework with JWT tokens, OAuth2 integration, and advanced security features including rate limiting and brute force protection.',
    client: 'Open Source',
    tech: 'Node.js, TypeScript, Redis',
    location: 'Remote',
    images: [
      {
        id: '1-1',
        // Photo by Joe Dudeck on Unsplash
        src: 'https://images.unsplash.com/photo-1610142004358-e4e987e4c5af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjF8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Desert canyon at golden hour',
        aspectRatio: 'landscape'
      },
      {
        id: '1-2',
        // Photo by Giorgio Fouarge on Unsplash
        src: 'https://images.unsplash.com/photo-1705321217071-b1b6672fa23c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjF8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Sand dunes in morning light',
        aspectRatio: 'portrait'
      },
      {
        id: '1-3',
        // Photo by Astroby krishna on Unsplash
        src: 'https://images.unsplash.com/photo-1727319384541-8b96ca1526e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjF8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Rock formations under starry sky',
        aspectRatio: 'landscape'
      },
      {
        id: '1-4',
        // Photo by Ilker Ozmen on Unsplash
        src: 'https://images.unsplash.com/photo-1725986951716-75fb278ecaec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjJ8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Desert vista at sunset',
        aspectRatio: 'square'
      }
    ]
  },
  {
    id: '2',
    title: 'NetScanner Pro',
    category: 'tools',
    year: '2024',
    slug: 'netscanner-pro',
    // Photo by Bradley Andrews on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1761069234906-a7c77124f641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjJ8&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Advanced network scanning and vulnerability assessment tool with real-time monitoring, port scanning, and automated reporting capabilities.',
    client: 'Security Firms',
    tech: 'Python, Scapy, Nmap API',
    location: 'Global',
    images: [
      {
        id: '2-1',
        // Photo by ali mahmoodi on Unsplash
        src: 'https://images.unsplash.com/photo-1559123988-ebd5228736b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjJ8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Portrait of young man in urban setting',
        aspectRatio: 'portrait'
      },
      {
        id: '2-2',
        // Photo by mouad bouallayel on Unsplash
        src: 'https://images.unsplash.com/photo-1628173422874-0d18ff5bfb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjN8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Professional portrait in natural light',
        aspectRatio: 'portrait'
      },
      {
        id: '2-3',
        // Photo by Ivan Lenin on Unsplash
        src: 'https://images.unsplash.com/photo-1581329318020-a226e3713ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjN8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Candid street portrait',
        aspectRatio: 'square'
      },
      {
        id: '2-4',
        // Photo by Elric Pxl on Unsplash
        src: 'https://images.unsplash.com/photo-1651464416004-60ae4e4846d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjR8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Portrait with city backdrop',
        aspectRatio: 'portrait'
      }
    ]
  },
  {
    id: '3',
    title: 'CloudDeploy CLI',
    category: 'automation',
    year: '2023',
    slug: 'clouddeploy-cli',
    // Photo by E Vos on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1758543437543-6d61ca0fd530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjR8&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A powerful CLI tool for automating cloud deployments across AWS, GCP, and Azure with infrastructure-as-code support and rollback capabilities.',
    client: 'Enterprise',
    tech: 'Go, Terraform, Docker',
    location: 'Remote',
    images: [
      {
        id: '3-1',
        // Photo by Zulfugar Karimov on Unsplash
        src: 'https://images.unsplash.com/photo-1762344682624-176d89eb3bfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjR8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Modern glass building facade',
        aspectRatio: 'portrait'
      },
      {
        id: '3-2',
        // Photo by Jason Leung on Unsplash
        src: 'https://images.unsplash.com/photo-1690927324729-bcf7d2b3ecac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjV8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Architectural interior with natural light',
        aspectRatio: 'landscape'
      },
      {
        id: '3-3',
        // Photo by Declan Sun on Unsplash
        src: 'https://images.unsplash.com/photo-1752756351017-bbe91e0439a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjV8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Geometric concrete structure',
        aspectRatio: 'square'
      },
      {
        id: '3-4',
        // Photo by Alessandro Ricossa on Unsplash
        src: 'https://images.unsplash.com/photo-1748940644273-47564655923f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjV8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Contemporary building at dusk',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '4',
    title: 'ReactFlow Dashboard',
    category: 'web-apps',
    year: '2023',
    slug: 'reactflow-dashboard',
    // Photo by Yigit ARISOY on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1682232568244-edbb92614c2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjZ8&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A modern analytics dashboard built with React and TypeScript featuring real-time data visualization, dark mode, and responsive design.',
    client: 'SaaS Startups',
    tech: 'React, TypeScript, D3.js',
    location: 'Remote',
    images: [
      {
        id: '4-1',
        // Photo by Cord Allman on Unsplash
        src: 'https://images.unsplash.com/photo-1730724620317-2b806898bdda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjZ8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Fashion editorial portrait',
        aspectRatio: 'portrait'
      },
      {
        id: '4-2',
        // Photo by Happy Face Emoji on Unsplash
        src: 'https://images.unsplash.com/photo-1704137892949-e480ceaebe24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njd8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Model in dramatic lighting',
        aspectRatio: 'portrait'
      },
      {
        id: '4-3',
        // Photo by Lawrence Krowdeed on Unsplash
        src: 'https://images.unsplash.com/photo-1631970283992-6b57250a4a29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njd8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Fashion photography in urban setting',
        aspectRatio: 'landscape'
      },
      {
        id: '4-4',
        // Photo by Ayo Ogunseinde on Unsplash
        src: 'https://images.unsplash.com/photo-1540513325222-55b3afd3ed5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njh8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Editorial fashion portrait',
        aspectRatio: 'portrait'
      }
    ]
  },
  {
    id: '5',
    title: 'CryptoVault',
    category: 'security',
    year: '2023',
    slug: 'cryptovault',
    // Photo by Eva Šumah on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1742260765447-239ed006350a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njh8&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'End-to-end encrypted password manager with zero-knowledge architecture, biometric authentication, and secure sharing capabilities.',
    client: 'Personal Project',
    tech: 'Rust, WebAssembly, AES-256',
    location: 'Open Source',
    images: [
      {
        id: '5-1',
        // Photo by Marek Piwnicki on Unsplash
        src: 'https://images.unsplash.com/photo-1680287327539-9467451a8b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njh8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Mountain landscape at dawn',
        aspectRatio: 'landscape'
      },
      {
        id: '5-2',
        // Photo by Wang John on Unsplash
        src: 'https://images.unsplash.com/photo-1621765808360-5b2ea25d147a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njl8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Alpine village in winter',
        aspectRatio: 'landscape'
      },
      {
        id: '5-3',
        // Photo by Peter Robbins on Unsplash
        src: 'https://images.unsplash.com/photo-1721960778604-6a814f039347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njl8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Mountain peaks in fog',
        aspectRatio: 'portrait'
      },
      {
        id: '5-4',
        // Photo by FETHI BOUHAOUCHINE on Unsplash
        src: 'https://images.unsplash.com/photo-1654362248566-6804dbcc5bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njl8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Sunrise over mountain range',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '6',
    title: 'API Gateway',
    category: 'open-source',
    year: '2022',
    slug: 'api-gateway',
    // Photo by Max Kukurudziak on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1669908752972-e04c3b65e855?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1Njl8&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'High-performance API gateway with rate limiting, load balancing, and request transformation capabilities. Handles millions of requests per day.',
    location: 'Pacific Northwest',
    tech: 'Go, Redis, PostgreSQL',
    images: [
      {
        id: '6-1',
        // Photo by Stefanie Jockschat on Unsplash
        src: 'https://images.unsplash.com/photo-1619508126123-3586ee993858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzB8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Ocean waves at sunset',
        aspectRatio: 'landscape'
      },
      {
        id: '6-2',
        // Photo by Vladimir Shubarin on Unsplash
        src: 'https://images.unsplash.com/photo-1566303060899-999a74200af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzB8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Rocky coastline in morning mist',
        aspectRatio: 'landscape'
      },
      {
        id: '6-3',
        // Photo by Panchanok Juntanarach on Unsplash
        src: 'https://images.unsplash.com/photo-1762686185418-2bffbb8d8fea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzB8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Beach at golden hour',
        aspectRatio: 'landscape'
      },
      {
        id: '6-4',
        // Photo by Emma Watson on Unsplash
        src: 'https://images.unsplash.com/photo-1594927058779-aa4c1b5804a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzF8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Coastal cliffs in dramatic light',
        aspectRatio: 'portrait'
      }
    ]
  },
  {
    id: '7',
    title: 'DevOps Toolkit',
    category: 'automation',
    year: '2022',
    slug: 'devops-toolkit',
    // Photo by Kyle Loftus on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1616267624976-b45d3a7bac73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzF8&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Comprehensive DevOps automation toolkit with CI/CD pipelines, monitoring dashboards, and infrastructure management scripts.',
    client: 'Tech Startups',
    tech: 'Bash, Python, Kubernetes',
    location: 'Remote',
    images: [
      {
        id: '7-1',
        // Photo by Kyle Loftus on Unsplash
        src: 'https://images.unsplash.com/photo-1616267624976-b45d3a7bac73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzF8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Studio portrait with dramatic lighting',
        aspectRatio: 'portrait'
      },
      {
        id: '7-2',
        // Photo by Robert Piosik on Unsplash
        src: 'https://images.unsplash.com/photo-1551536548-4de53e534e3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzJ8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Classic portrait in soft light',
        aspectRatio: 'portrait'
      },
      {
        id: '7-3',
        // Photo by Bench Accounting on Unsplash
        src: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzJ8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Portrait with minimalist background',
        aspectRatio: 'square'
      },
      {
        id: '7-4',
        // Photo by Vitaly Gariev on Unsplash
        src: 'https://images.unsplash.com/photo-1758521233019-e53cb9ce77b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzJ8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Contemporary studio portrait',
        aspectRatio: 'portrait'
      }
    ]
  },
  {
    id: '8',
    title: 'Real-time Chat',
    category: 'web-apps',
    year: '2022',
    slug: 'realtime-chat',
    // Photo by Michael Wu on Unsplash
    coverImage: 'https://images.unsplash.com/photo-1582210413269-f0bf6d13f58f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzN8&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Scalable real-time chat application with WebSocket support, message encryption, file sharing, and multi-room capabilities.',
    client: 'Enterprise',
    tech: 'Node.js, Socket.io, MongoDB',
    location: 'Global',
    images: [
      {
        id: '8-1',
        // Photo by Li Zhang on Unsplash
        src: 'https://images.unsplash.com/photo-1617293134227-0ec282f3ed89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzN8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'City street at night with neon lights',
        aspectRatio: 'landscape'
      },
      {
        id: '8-2',
        // Photo by Clay LeConey on Unsplash
        src: 'https://images.unsplash.com/photo-1643124859906-b5f7ef3e210d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzN8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Urban skyline at dusk',
        aspectRatio: 'landscape'
      },
      {
        id: '8-3',
        // Photo by Lutz Stallknecht on Unsplash
        src: 'https://images.unsplash.com/photo-1761870033405-d1474ec5dae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzR8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Night photography of city architecture',
        aspectRatio: 'portrait'
      },
      {
        id: '8-4',
        // Photo by stable pattern on Unsplash
        src: 'https://images.unsplash.com/photo-1701012292510-83de4283ef1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NzR8&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Downtown at night with light trails',
        aspectRatio: 'landscape'
      }
    ]
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
